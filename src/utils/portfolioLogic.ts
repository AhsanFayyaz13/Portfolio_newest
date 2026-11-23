import type { NavLinkItem, Project, ProjectCategory } from '../data/portfolio';

export const CONTACT_LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 120,
  EMAIL_MIN: 5,
  EMAIL_MAX: 254,
  MESSAGE_MIN: 10,
  MESSAGE_MAX: 2000,
  SOURCE: 'portfolio-web',
} as const;

export const CONTACT_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
  /** Hidden honeypot field to trap basic spam bots. Must remain empty for humans. */
  website?: string;
}

export interface ContactDocumentFields {
  name: string;
  email: string;
  message: string;
  source: typeof CONTACT_LIMITS.SOURCE;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<'name' | 'email' | 'message', string>>;
}

export interface ContactSubmissionResult {
  ok: boolean;
  id?: string;
  submittedAt?: string;
  blockedByHoneypot?: boolean;
  error?: string;
}

export interface SectionOffset {
  id: NavLinkItem['id'];
  top: number;
}

export function filterProjects(
  projects: readonly Project[],
  category: ProjectCategory
): Project[] {
  if (category === 'All') {
    return [...projects];
  }
  return projects.filter((project) => project.category === category);
}

export function getProjectCategoryCounts(
  projects: readonly Project[],
  categories: readonly ProjectCategory[]
): Record<ProjectCategory, number> {
  const counts = {} as Record<ProjectCategory, number>;
  for (const category of categories) {
    counts[category] =
      category === 'All'
        ? projects.length
        : projects.filter((project) => project.category === category).length;
  }
  return counts;
}

export function isHoneypotTriggered(values: ContactFormValues): boolean {
  return Boolean(values.website && values.website.trim().length > 0);
}

export function validateContactForm(
  values: ContactFormValues
): ContactValidationResult {
  const errors: Partial<Record<'name' | 'email' | 'message', string>> = {};
  const trimmedName = values.name.trim();
  const trimmedEmail = values.email.trim();
  const trimmedMessage = values.message.trim();

  if (!trimmedName) {
    errors.name = 'Please enter your name.';
  } else if (trimmedName.length < CONTACT_LIMITS.NAME_MIN) {
    errors.name = `Name must be at least ${CONTACT_LIMITS.NAME_MIN} characters.`;
  } else if (trimmedName.length > CONTACT_LIMITS.NAME_MAX) {
    errors.name = `Name must be ${CONTACT_LIMITS.NAME_MAX} characters or fewer.`;
  }

  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (
    trimmedEmail.length > CONTACT_LIMITS.EMAIL_MAX ||
    !CONTACT_EMAIL_PATTERN.test(trimmedEmail)
  ) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!trimmedMessage) {
    errors.message = 'Please share a few details about your project or inquiry.';
  } else if (trimmedMessage.length < CONTACT_LIMITS.MESSAGE_MIN) {
    errors.message = `Message must be at least ${CONTACT_LIMITS.MESSAGE_MIN} characters.`;
  } else if (trimmedMessage.length > CONTACT_LIMITS.MESSAGE_MAX) {
    errors.message = `Message must be ${CONTACT_LIMITS.MESSAGE_MAX.toLocaleString()} characters or fewer.`;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildContactDocumentFields(
  values: ContactFormValues
): ContactDocumentFields {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    message: values.message.trim(),
    source: CONTACT_LIMITS.SOURCE,
  };
}

export async function submitContactMessage(
  values: ContactFormValues,
  persist: (doc: ContactDocumentFields) => Promise<string>
): Promise<ContactSubmissionResult> {
  if (isHoneypotTriggered(values)) {
    return {
      ok: true,
      blockedByHoneypot: true,
      submittedAt: new Date().toISOString(),
    };
  }

  const validation = validateContactForm(values);
  if (!validation.valid) {
    return {
      ok: false,
      error: 'Please correct the highlighted form fields before submitting.',
    };
  }

  const docData = buildContactDocumentFields(values);
  const id = await persist(docData);

  return {
    ok: true,
    id,
    submittedAt: new Date().toISOString(),
  };
}

export function getActiveSectionId(
  sections: readonly SectionOffset[],
  scrollY: number,
  activationOffset = 140
): NavLinkItem['id'] | null {
  if (sections.length === 0) {
    return null;
  }

  const sorted = [...sections].sort((a, b) => a.top - b.top);
  const threshold = scrollY + activationOffset;

  if (threshold < sorted[0].top) {
    return null;
  }

  let active: NavLinkItem['id'] = sorted[0].id;
  for (const section of sorted) {
    if (threshold >= section.top) {
      active = section.id;
    } else {
      break;
    }
  }
  return active;
}
