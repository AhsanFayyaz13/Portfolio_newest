import test from 'node:test';
import assert from 'node:assert/strict';
import { PROJECTS, PROJECT_CATEGORIES } from '../data/portfolio';
import {
  CONTACT_LIMITS,
  buildContactDocumentFields,
  filterProjects,
  getActiveSectionId,
  getProjectCategoryCounts,
  isHoneypotTriggered,
  submitContactMessage,
  validateContactForm,
} from './portfolioLogic';

test('filterProjects returns all 5 projects for All category', () => {
  const result = filterProjects(PROJECTS, 'All');
  assert.equal(result.length, 5);
});

test('filterProjects isolates exact project categories', () => {
  const aiProjects = filterProjects(PROJECTS, 'AI & Multi-Agent Systems');
  assert.equal(aiProjects.length, 2);
  assert.deepEqual(
    aiProjects.map((p) => p.id),
    ['multi-agent-flight-management', 'nasa-artemis-rag']
  );

  const webProjects = filterProjects(PROJECTS, 'Full-Stack Web');
  assert.equal(webProjects.length, 2);
  assert.deepEqual(
    webProjects.map((p) => p.id),
    ['medeasy', 'nishtar-pharmacy']
  );

  const toolsProjects = filterProjects(PROJECTS, 'Automation & Tools');
  assert.equal(toolsProjects.length, 1);
  assert.equal(toolsProjects[0].id, 'ai-cover-letter-generator');
});

test('getProjectCategoryCounts accurately sums each filter bucket', () => {
  const counts = getProjectCategoryCounts(PROJECTS, PROJECT_CATEGORIES);
  assert.deepEqual(counts, {
    All: 5,
    'AI & Multi-Agent Systems': 2,
    'Full-Stack Web': 2,
    'Automation & Tools': 1,
  });
});

test('validateContactForm rejects empty, malformed, and over-limit inputs', () => {
  const emptyResult = validateContactForm({ name: '', email: '', message: '' });
  assert.equal(emptyResult.valid, false);
  assert.ok(emptyResult.errors.name);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.message);

  const invalidEmail = validateContactForm({
    name: 'Ahsan',
    email: 'not-an-email',
    message: 'Short',
  });
  assert.equal(invalidEmail.valid, false);
  assert.equal(invalidEmail.errors.name, undefined);
  assert.ok(invalidEmail.errors.email);
  assert.ok(invalidEmail.errors.message);

  const overLimit = validateContactForm({
    name: 'A'.repeat(CONTACT_LIMITS.NAME_MAX + 1),
    email: 'valid@example.com',
    message: 'M'.repeat(CONTACT_LIMITS.MESSAGE_MAX + 1),
  });
  assert.equal(overLimit.valid, false);
  assert.ok(overLimit.errors.name);
  assert.equal(overLimit.errors.email, undefined);
  assert.ok(overLimit.errors.message);

  const exactLimit = validateContactForm({
    name: 'A'.repeat(CONTACT_LIMITS.NAME_MAX),
    email: 'valid@example.com',
    message: 'M'.repeat(CONTACT_LIMITS.MESSAGE_MAX),
  });
  assert.equal(exactLimit.valid, true);
});

test('buildContactDocumentFields trims strings and sets source to portfolio-web', () => {
  const doc = buildContactDocumentFields({
    name: '  Zainab Tariq  ',
    email: '  zainab@example.com  ',
    message: '  We need a LangGraph multi-agent pipeline for internal ops.  ',
  });
  assert.deepEqual(doc, {
    name: 'Zainab Tariq',
    email: 'zainab@example.com',
    message: 'We need a LangGraph multi-agent pipeline for internal ops.',
    source: 'portfolio-web',
  });
});

test('submitContactMessage persists valid payloads and blocks honeypot bots without persisting', async () => {
  let persistCalls = 0;
  const payload = {
    name: 'Zainab Tariq',
    email: 'zainab@example.com',
    message: 'We need a LangGraph multi-agent pipeline for internal ops.',
    website: '',
  };

  const result = await submitContactMessage(payload, async (doc) => {
    persistCalls += 1;
    assert.equal(doc.source, 'portfolio-web');
    return 'doc_123';
  });
  assert.equal(result.ok, true);
  assert.equal(result.id, 'doc_123');
  assert.equal(persistCalls, 1);

  assert.equal(isHoneypotTriggered({ ...payload, website: 'https://spam.bot' }), true);
  const botResult = await submitContactMessage(
    { ...payload, website: 'https://spam.bot' },
    async () => {
      persistCalls += 1;
      return 'should_not_run';
    }
  );
  assert.equal(botResult.ok, true);
  assert.equal(botResult.blockedByHoneypot, true);
  assert.equal(persistCalls, 1);
});

test('submitContactMessage refuses invalid payloads without calling persist', async () => {
  let called = false;
  const result = await submitContactMessage(
    { name: '', email: 'bad', message: '' },
    async () => {
      called = true;
      return 'never';
    }
  );
  assert.equal(result.ok, false);
  assert.equal(called, false);
  assert.ok(result.error);
});

test('getActiveSectionId resolves current scroll-spy section deterministically', () => {
  const offsets = [
    { id: 'work' as const, top: 820 },
    { id: 'about' as const, top: 1900 },
    { id: 'experience' as const, top: 2700 },
    { id: 'contact' as const, top: 3600 },
  ];

  assert.equal(getActiveSectionId(offsets, 0, 140), null);
  assert.equal(getActiveSectionId(offsets, 700, 140), 'work');
  assert.equal(getActiveSectionId(offsets, 1800, 140), 'about');
  assert.equal(getActiveSectionId(offsets, 2600, 140), 'experience');
  assert.equal(getActiveSectionId(offsets, 3500, 140), 'contact');
});
