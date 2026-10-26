import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container, Eyebrow } from "@/components/ui/section";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact us: sales, support and partnerships",
  description:
    "Talk to Reseny Business Mercantech about sales, support or partnerships. Send a message, or reach us by phone, email or WhatsApp.",
  path: "/company/contact",
});

interface ContactMethod {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}

/** Only contact details that are configured are shown: the site never invents any. */
function contactMethods(): ContactMethod[] {
  const { contact } = siteConfig;
  const methods: ContactMethod[] = [];
  if (contact.salesEmail) methods.push({ icon: Mail, label: "Sales", value: contact.salesEmail, href: `mailto:${contact.salesEmail}` });
  if (contact.supportEmail) methods.push({ icon: Mail, label: "Support", value: contact.supportEmail, href: `mailto:${contact.supportEmail}` });
  if (contact.partnersEmail) methods.push({ icon: Mail, label: "Partnerships", value: contact.partnersEmail, href: `mailto:${contact.partnersEmail}` });
  if (contact.phone) methods.push({ icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` });
  if (contact.whatsappUrl) methods.push({ icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: contact.whatsappUrl });
  if (contact.address) methods.push({ icon: MapPin, label: "Address", value: contact.address });
  return methods;
}

export default function ContactPage() {
  const methods = contactMethods();
  const mapUrl = siteConfig.contact.mapEmbedUrl;

  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-hero-glow" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-50" />
      <Container className="grid items-start gap-10 py-12 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-20">
        <div>
          <Breadcrumbs
            className="mb-6"
            items={[
              { name: "Home", href: "/" },
              { name: "Company", href: "/company" },
              { name: "Contact us", href: "/company/contact" },
            ]}
          />
          <Eyebrow>Contact us</Eyebrow>
          <h1 className="mt-3 text-4xl leading-[1.08] font-extrabold tracking-tight text-foreground sm:text-5xl">
            Let&apos;s talk about your <span className="text-gradient">leads</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Sales, support or partnerships: send a message and it will reach the right person.
          </p>

          {methods.length > 0 ? (
            <ul className="mt-8 space-y-4">
              {methods.map(({ icon: MethodIcon, label, value, href }) => (
                <li key={`${label}-${value}`} className="flex items-start gap-3.5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-text">
                    <MethodIcon aria-hidden className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold tracking-wider text-subtle-foreground uppercase">{label}</span>
                    {href ? (
                      <a
                        href={href}
                        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="font-semibold break-all text-foreground hover:text-primary-text"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="font-semibold text-foreground">{value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          {mapUrl ? (
            <div className="mt-8 overflow-hidden rounded-2xl border border-border shadow-card">
              <iframe
                src={mapUrl}
                title="Map showing our office"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-64 w-full border-0"
              />
            </div>
          ) : null}
        </div>

        <ContactForm />
      </Container>
    </section>
  );
}
