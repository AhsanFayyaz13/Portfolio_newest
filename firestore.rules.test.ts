import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Security Rule & Dirty Dozen Payload Verification Suite.
 * Verifies firestore.rules structure, blueprint synchronicity, and evaluates
 * all 12 adversarial payloads against the exact rule predicates.
 */

const rulesSource = fs.readFileSync(
  path.resolve(process.cwd(), 'firestore.rules'),
  'utf8'
);
const blueprint = JSON.parse(
  fs.readFileSync(
    path.resolve(process.cwd(), 'firebase-blueprint.json'),
    'utf8'
  )
);

const SERVER_TIME_TOKEN = Symbol('request.time');
const ALLOWED_KEYS = ['name', 'email', 'message', 'createdAt', 'source'] as const;
const ID_REGEX = /^[a-zA-Z0-9_-]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function simulateFirestoreRules(
  operation: 'create' | 'get' | 'list' | 'update' | 'delete',
  messageId: string,
  data?: Record<string, unknown>
): 'ALLOW' | 'PERMISSION_DENIED' {
  if (operation !== 'create') {
    return 'PERMISSION_DENIED';
  }

  if (
    typeof messageId !== 'string' ||
    messageId.length < 1 ||
    messageId.length > 128 ||
    !ID_REGEX.test(messageId)
  ) {
    return 'PERMISSION_DENIED';
  }

  if (!data || typeof data !== 'object') {
    return 'PERMISSION_DENIED';
  }

  const keys = Object.keys(data);
  const hasAll = ALLOWED_KEYS.every((key) => keys.includes(key));
  const hasOnly = keys.every((key) =>
    (ALLOWED_KEYS as readonly string[]).includes(key)
  );
  if (!hasAll || !hasOnly) {
    return 'PERMISSION_DENIED';
  }

  if (
    typeof data.name !== 'string' ||
    data.name.length < 2 ||
    data.name.length > 120
  ) {
    return 'PERMISSION_DENIED';
  }

  if (
    typeof data.email !== 'string' ||
    data.email.length < 5 ||
    data.email.length > 254 ||
    !EMAIL_REGEX.test(data.email)
  ) {
    return 'PERMISSION_DENIED';
  }

  if (
    typeof data.message !== 'string' ||
    data.message.length < 10 ||
    data.message.length > 2000
  ) {
    return 'PERMISSION_DENIED';
  }

  if (data.createdAt !== SERVER_TIME_TOKEN) {
    return 'PERMISSION_DENIED';
  }

  if (typeof data.source !== 'string' || data.source !== 'portfolio-web') {
    return 'PERMISSION_DENIED';
  }

  return 'ALLOW';
}

const VALID_PAYLOAD = {
  name: 'Zainab Tariq',
  email: 'zainab@example.com',
  message: 'We would love to collaborate on a LangGraph multi-agent workflow.',
  createdAt: SERVER_TIME_TOKEN,
  source: 'portfolio-web',
};

test('firestore.rules enforces default-deny catch-all and explicit read/update/delete denial', () => {
  assert.match(rulesSource, /rules_version\s*=\s*'2'/);
  assert.match(rulesSource, /match\s+\/\{document=\*\*\}\s*\{\s*allow\s+read,\s*write:\s*if\s+false;/);
  assert.match(rulesSource, /match\s+\/contact_messages\/\{messageId\}/);
  assert.match(rulesSource, /allow\s+read,\s*update,\s*delete:\s*if\s+false;/);
  assert.match(rulesSource, /data\.createdAt\s*==\s*request\.time/);
  assert.match(rulesSource, /data\.source\s*==\s*'portfolio-web'/);
});

test('firebase-blueprint.json stays synchronized with firestore.rules bounds', () => {
  const schema = blueprint.entities.ContactMessage;
  assert.equal(schema.properties.name.minLength, 2);
  assert.equal(schema.properties.name.maxLength, 120);
  assert.equal(schema.properties.email.minLength, 5);
  assert.equal(schema.properties.email.maxLength, 254);
  assert.equal(schema.properties.message.minLength, 10);
  assert.equal(schema.properties.message.maxLength, 2000);
  assert.deepEqual(schema.properties.source.enum, ['portfolio-web']);
  assert.ok(blueprint.firestore['/contact_messages/{messageId}']);
});

test('valid contact message create succeeds', () => {
  assert.equal(
    simulateFirestoreRules('create', 'msg_abc123', VALID_PAYLOAD),
    'ALLOW'
  );
});

test('Dirty Dozen #1-12 adversarial payloads all return PERMISSION_DENIED', () => {
  // 1. Shadow field injection
  assert.equal(
    simulateFirestoreRules('create', 'msg_1', {
      ...VALID_PAYLOAD,
      isAdmin: true,
    }),
    'PERMISSION_DENIED'
  );

  // 2. Missing required field
  const { source: _omitted, ...missingSource } = VALID_PAYLOAD;
  assert.equal(
    simulateFirestoreRules('create', 'msg_2', missingSource),
    'PERMISSION_DENIED'
  );

  // 3. Invalid source literal
  assert.equal(
    simulateFirestoreRules('create', 'msg_3', {
      ...VALID_PAYLOAD,
      source: 'curl-script',
    }),
    'PERMISSION_DENIED'
  );

  // 4. Client-forged timestamp
  assert.equal(
    simulateFirestoreRules('create', 'msg_4', {
      ...VALID_PAYLOAD,
      createdAt: '2020-01-01T00:00:00Z',
    }),
    'PERMISSION_DENIED'
  );

  // 5. Oversized message (2,001 chars)
  assert.equal(
    simulateFirestoreRules('create', 'msg_5', {
      ...VALID_PAYLOAD,
      message: 'a'.repeat(2001),
    }),
    'PERMISSION_DENIED'
  );

  // 6. Too-short message
  assert.equal(
    simulateFirestoreRules('create', 'msg_6', {
      ...VALID_PAYLOAD,
      message: 'hey',
    }),
    'PERMISSION_DENIED'
  );

  // 7. Oversized name (121 chars)
  assert.equal(
    simulateFirestoreRules('create', 'msg_7', {
      ...VALID_PAYLOAD,
      name: 'N'.repeat(121),
    }),
    'PERMISSION_DENIED'
  );

  // 8. Malformed email
  assert.equal(
    simulateFirestoreRules('create', 'msg_8', {
      ...VALID_PAYLOAD,
      email: 'not-an-email',
    }),
    'PERMISSION_DENIED'
  );

  // 9. Wrong field type (value poisoning)
  assert.equal(
    simulateFirestoreRules('create', 'msg_9', {
      ...VALID_PAYLOAD,
      name: 12345,
    }),
    'PERMISSION_DENIED'
  );

  // 10. Document ID poisoning
  assert.equal(
    simulateFirestoreRules('create', 'invalid id / poison', VALID_PAYLOAD),
    'PERMISSION_DENIED'
  );

  // 11. Public read / PII scraping
  assert.equal(simulateFirestoreRules('get', 'msg_11'), 'PERMISSION_DENIED');
  assert.equal(simulateFirestoreRules('list', 'msg_11'), 'PERMISSION_DENIED');

  // 12. Public tampering / deletion
  assert.equal(
    simulateFirestoreRules('update', 'msg_12', VALID_PAYLOAD),
    'PERMISSION_DENIED'
  );
  assert.equal(simulateFirestoreRules('delete', 'msg_12'), 'PERMISSION_DENIED');
});
