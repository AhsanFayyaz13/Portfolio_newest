import { useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Globe,
  Loader2,
  Mail,
  MapPin,
  Send,
  X,
} from 'lucide-react';
import { CONTACT_DATA, type SocialLink } from '../data/portfolio';
import { submitContactToFirestore } from '../services/contactService';
import {
  CONTACT_LIMITS,
  isHoneypotTriggered,
  validateContactForm,
  type ContactFormValues,
} from '../utils/portfolioLogic';

function SocialIcon({ icon }: { icon: SocialLink['icon'] }) {
  switch (icon) {
    case 'github':
      return <Github className="h-4 w-4 shrink-0" aria-hidden="true" />;
    case 'globe':
      return <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />;
    default:
      return <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />;
  }
}

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formValues, setFormValues] = useState<ContactFormValues>({
    name: '',
    email: '',
    message: '',
    website: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<'name' | 'email' | 'message', string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [inlineSuccess, setInlineSuccess] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 5000);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  async function handleCopyEmail() {
    const email = CONTACT_DATA.email;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = email;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
  }

  function handleFieldChange(field: keyof ContactFormValues, value: string) {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (field !== 'website' && errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (submitError) {
      setSubmitError(null);
    }
    if (inlineSuccess) {
      setInlineSuccess(null);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);
    setInlineSuccess(null);

    if (isHoneypotTriggered(formValues)) {
      setFormValues({ name: '', email: '', message: '', website: '' });
      setInlineSuccess('Message sent. Thank you for reaching out—I will reply shortly.');
      return;
    }

    const validation = validateContactForm(formValues);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await submitContactToFirestore(formValues);
      if (!result.ok) {
        setSubmitError(
          result.error ?? 'Unable to send your message right now. Please try email.'
        );
        return;
      }

      const confirmation =
        'Message received and saved. Thank you for reaching out—I will reply shortly.';
      setFormValues({ name: '', email: '', message: '', website: '' });
      setInlineSuccess(confirmation);
      setToastMessage(confirmation);
    } catch (error) {
      const errorText = error instanceof Error ? error.message : '';
      if (errorText.includes('Quota exceeded')) {
        setSubmitError(
          'Daily inbox capacity was temporarily reached and resets tomorrow. Please email me directly at ' +
            CONTACT_DATA.email +
            '.'
        );
      } else {
        setSubmitError(
          'We could not save your message right now. Please try again or email me directly at ' +
            CONTACT_DATA.email +
            '.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative border-b border-white/10 bg-[#0A0F1C] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Direct Email + Copy + Social Profiles */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <p className="font-mono text-xs text-[#94A3B8]">
                04. Contact
              </p>
              <h2
                id="contact-heading"
                className="mt-3 font-display text-3xl font-extrabold tracking-[-0.03em] text-[#F8FAFC] sm:text-4xl"
              >
                {CONTACT_DATA.heading}
              </h2>
              <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-[#94A3B8]">
                {CONTACT_DATA.subheadline}
              </p>

              {/* Direct Email Card */}
              <div className="mt-8 border border-white/10 bg-[#111827] p-5 sm:p-6">
                <p className="font-mono text-xs text-[#94A3B8]">
                  Direct Email
                </p>
                <a
                  href={`mailto:${CONTACT_DATA.email}`}
                  className="mt-2 block break-all font-mono text-sm font-medium text-[#F8FAFC] transition-colors hover:text-[#60A5FA] sm:text-[15px]"
                >
                  {CONTACT_DATA.email}
                </a>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-live="polite"
                    className={`inline-flex min-h-[44px] items-center gap-2 border px-4 py-2 text-xs font-medium transition-colors duration-150 ${
                      copied
                        ? 'border-[#2563EB] bg-[#2563EB] text-white'
                        : 'border-white/15 bg-[#0A0F1C] text-[#F8FAFC] hover:border-white/30'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" aria-hidden="true" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 text-[#94A3B8]" aria-hidden="true" />
                        Copy Email
                      </>
                    )}
                  </button>

                  <span className="font-mono text-xs text-[#94A3B8]">
                    {CONTACT_DATA.responseExpectation}
                  </span>
                </div>
              </div>

              {/* Active Social Links */}
              <div className="mt-6 space-y-3">
                <p className="font-mono text-xs text-[#94A3B8]">
                  Profiles &amp; Live Work
                </p>
                <div className="divide-y divide-white/10 border border-white/10 bg-[#111827]">
                  {CONTACT_DATA.socialLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-[52px] items-center justify-between gap-4 px-4 py-3 text-sm text-[#F8FAFC] transition-colors hover:bg-[#161F33]"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="text-[#94A3B8] transition-colors group-hover:text-[#F8FAFC]">
                          <SocialIcon icon={link.icon} />
                        </span>
                        <span className="truncate font-medium">{link.label}</span>
                      </span>
                      <span className="flex shrink-0 items-center gap-1.5 font-mono text-xs text-[#94A3B8] transition-colors group-hover:text-[#F8FAFC]">
                        <span className="hidden sm:inline">{link.displayValue}</span>
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 border-t border-white/10 pt-5 font-mono text-xs text-[#94A3B8]">
              <MapPin className="h-4 w-4 text-[#EA580C]" aria-hidden="true" />
              <span>Based in {CONTACT_DATA.location}</span>
            </div>
          </div>

          {/* Right Column: Clean 3-Field Contact Form */}
          <div className="lg:col-span-7">
            <div className="border border-white/10 bg-[#111827] p-6 sm:p-8">
              <div className="border-b border-white/10 pb-5">
                <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-[#F8FAFC]">
                  Send a Message
                </h3>
                <p className="mt-1.5 text-sm text-[#94A3B8]">
                  Share project scope, timeline, or role details below.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                {/* Hidden honeypot field to block automated spam submissions */}
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formValues.website ?? ''}
                    onChange={(event) => handleFieldChange('website', event.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-mono text-xs text-[#F8FAFC]"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength={CONTACT_LIMITS.NAME_MAX}
                    required
                    value={formValues.name}
                    onChange={(event) => handleFieldChange('name', event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    placeholder="Your full name"
                    className={`mt-2 block min-h-[48px] w-full border bg-[#0A0F1C] px-4 py-3 text-sm text-[#F8FAFC] placeholder:text-[#94A3B8]/60 transition-colors focus:border-[#2563EB] focus:outline-none ${
                      errors.name ? 'border-[#EA580C]' : 'border-white/10'
                    }`}
                  />
                  {errors.name ? (
                    <p
                      id="contact-name-error"
                      role="alert"
                      className="mt-1.5 font-mono text-xs text-[#FB923C]"
                    >
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-mono text-xs text-[#F8FAFC]"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formValues.email}
                    onChange={(event) => handleFieldChange('email', event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    placeholder="you@company.com"
                    className={`mt-2 block min-h-[48px] w-full border bg-[#0A0F1C] px-4 py-3 text-sm text-[#F8FAFC] placeholder:text-[#94A3B8]/60 transition-colors focus:border-[#2563EB] focus:outline-none ${
                      errors.email ? 'border-[#EA580C]' : 'border-white/10'
                    }`}
                  />
                  {errors.email ? (
                    <p
                      id="contact-email-error"
                      role="alert"
                      className="mt-1.5 font-mono text-xs text-[#FB923C]"
                    >
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-xs text-[#F8FAFC]"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={formValues.message}
                    onChange={(event) => handleFieldChange('message', event.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? 'contact-message-error' : undefined
                    }
                    placeholder="Tell me about the system, automation pipeline, or product you want to build..."
                    className={`mt-2 block w-full resize-y border bg-[#0A0F1C] px-4 py-3 text-sm leading-relaxed text-[#F8FAFC] placeholder:text-[#94A3B8]/60 transition-colors focus:border-[#2563EB] focus:outline-none ${
                      errors.message ? 'border-[#EA580C]' : 'border-white/10'
                    }`}
                  />
                  {errors.message ? (
                    <p
                      id="contact-message-error"
                      role="alert"
                      className="mt-1.5 font-mono text-xs text-[#FB923C]"
                    >
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                {inlineSuccess ? (
                  <div
                    role="status"
                    aria-live="polite"
                    data-testid="contact-inline-success"
                    className="flex items-start gap-2.5 border border-[#2563EB] bg-[#2563EB]/10 px-4 py-3 text-xs text-[#F8FAFC]"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#60A5FA]"
                      aria-hidden="true"
                    />
                    <span>{inlineSuccess}</span>
                  </div>
                ) : null}

                {submitError ? (
                  <p
                    role="alert"
                    data-testid="contact-submit-error"
                    className="border border-[#EA580C]/50 bg-[#EA580C]/10 px-4 py-3 text-xs text-[#FB923C]"
                  >
                    {submitError}
                  </p>
                ) : null}

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 bg-[#2563EB] px-6 py-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Accessible Success Toast */}
      <AnimatePresence>
        {toastMessage ? (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            className="fixed right-4 bottom-4 z-50 flex max-w-md items-start gap-3 border border-[#2563EB] bg-[#111827] p-4 text-sm text-[#F8FAFC] shadow-2xl sm:right-6 sm:bottom-6"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-[#2563EB] text-white">
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <p className="flex-1 leading-snug">{toastMessage}</p>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              aria-label="Dismiss notification"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center text-[#94A3B8] transition-colors hover:text-[#F8FAFC]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
