import Link from "next/link";
import type { ReactNode } from "react";

const link = "font-semibold text-primary-text underline underline-offset-2 hover:no-underline";

/** Consent wording per form. Kept in one place so legal review has a single file to read. */
export const consentLabels: Record<"call" | "contact" | "booking" | "pilot" | "email", ReactNode> = {
  call: (
    <>
      I agree that Reseny&apos;s AI agent may call me on this number about my request, and send follow-ups by WhatsApp,
      SMS or email. I understand I will be speaking with an AI and that the call may be recorded where the law permits.
      See the{" "}
      <Link href="/legal/privacy" className={link}>
        Privacy Policy
      </Link>
      .
    </>
  ),
  booking: (
    <>
      I agree that Reseny Business Mercantech may contact me by phone (including an AI voice call), WhatsApp, SMS and
      email about my enquiry. See the{" "}
      <Link href="/legal/privacy" className={link}>
        Privacy Policy
      </Link>
      .
    </>
  ),
  pilot: (
    <>
      I agree that Reseny Business Mercantech may contact me by phone (including an AI voice call), WhatsApp, SMS and
      email about my pilot request. See the{" "}
      <Link href="/legal/privacy" className={link}>
        Privacy Policy
      </Link>
      .
    </>
  ),
  contact: (
    <>
      I agree that Reseny Business Mercantech may contact me about this message. See the{" "}
      <Link href="/legal/privacy" className={link}>
        Privacy Policy
      </Link>
      .
    </>
  ),
  email: (
    <>
      Send me occasional product updates and guides. I can unsubscribe at any time. See the{" "}
      <Link href="/legal/privacy" className={link}>
        Privacy Policy
      </Link>
      .
    </>
  ),
};
