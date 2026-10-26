import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { EmailCaptureForm } from "@/components/forms/email-capture-form";
import { AstransysLogo, Logo } from "@/components/ui/logo";
import { footerColumns } from "@/lib/navigation";
import { siteConfig } from "@/lib/site";

/**
 * `new Date()` is not allowed while prerendering under Cache Components unless the
 * result is cached, so the year is computed in a cached component (refreshes daily).
 */
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

const footerLink =
  "text-sm text-muted-foreground transition-colors hover:text-primary-text focus-visible:text-primary-text";

/** Footer per SOP §7.2 #16: key links, contact details, social, legal, newsletter and the initiative line. */
export function SiteFooter() {
  const { contact, social } = siteConfig;
  const hasContact = Boolean(contact.phone || contact.salesEmail || contact.whatsappUrl || contact.address);

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2.85fr)]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-base font-semibold text-foreground">{siteConfig.tagline}</p>
            <p className="mt-1.5 text-sm text-muted-foreground">{siteConfig.heritageLine}</p>

            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              {contact.phone ? (
                <li className="flex items-center gap-2.5">
                  <Phone aria-hidden className="size-4 shrink-0 text-primary-text" />
                  <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-primary-text">
                    {contact.phone}
                  </a>
                </li>
              ) : null}
              {contact.salesEmail ? (
                <li className="flex items-center gap-2.5">
                  <Mail aria-hidden className="size-4 shrink-0 text-primary-text" />
                  <a href={`mailto:${contact.salesEmail}`} className="hover:text-primary-text">
                    {contact.salesEmail}
                  </a>
                </li>
              ) : null}
              {contact.whatsappUrl ? (
                <li className="flex items-center gap-2.5">
                  <MessageCircle aria-hidden className="size-4 shrink-0 text-primary-text" />
                  <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary-text">
                    Chat on WhatsApp
                  </a>
                </li>
              ) : null}
              {contact.address ? (
                <li className="flex items-start gap-2.5">
                  <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-primary-text" />
                  <span>{contact.address}</span>
                </li>
              ) : null}
              {!hasContact ? (
                <li>
                  <Link href="/company/contact" className="font-semibold text-primary-text hover:underline">
                    Contact sales, support or partnerships →
                  </Link>
                </li>
              ) : null}
            </ul>

            <div className="mt-7">
              <h2 className="text-sm font-bold text-foreground">Product updates and playbooks</h2>
              <EmailCaptureForm intent="newsletter" source="footer" className="mt-3" buttonLabel="Subscribe" />
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="text-sm font-bold text-foreground">{column.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.href}`}>
                      <Link href={link.href} className={footerLink}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-border pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1.5 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">{siteConfig.initiativeLine}</p>
            <p>
              © <CopyrightYear /> {siteConfig.company}. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            {social.length > 0 ? (
              <ul className="flex flex-wrap items-center gap-2">
                {social.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-border px-3.5 py-1.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary-text"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
            <AstransysLogo width={92} />
          </div>
        </div>
      </div>
    </footer>
  );
}
