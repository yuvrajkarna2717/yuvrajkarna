/**
 * Single source of truth for contact details and social links.
 * Import from here instead of hard-coding emails/phones/URLs so the
 * information never drifts out of sync across components.
 */

export const CONTACT = {
  email: "yuvrajkarna.code@gmail.com",
  phone: "+91 7700833277",
  /** E.164-ish form used for `tel:` links (no spaces). */
  phoneHref: "+917700833277",
  location: "India — Remote-ready",
  resume: "/resume/YuvrajKarna.pdf",
} as const;

export const mailto = `mailto:${CONTACT.email}`;
export const telHref = `tel:${CONTACT.phoneHref}`;

export interface SocialLink {
  /** Human-readable platform name — also used as the accessible label. */
  label: string;
  href: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/yuvrajkarna2717" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yuvrajkarna" },
  { label: "Facebook", href: "https://www.facebook.com/iamyuvrajkarna" },
  { label: "Instagram", href: "https://instagram.com/iamyuvrajkarna" },
  { label: "Twitter / X", href: "https://x.com/yuvrajkarna" },
];
