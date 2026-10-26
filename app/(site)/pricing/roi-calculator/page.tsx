import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { RoiCalculator } from "@/components/home/roi-calculator";
import { Container, Section } from "@/components/ui/section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "ROI calculator: what could faster follow-up be worth?",
  description:
    "Estimate the extra revenue from calling every lead within seconds. Enter your leads per month, response time and average deal value. Every assumption is visible and editable.",
  path: "/pricing/roi-calculator",
});

export default function RoiCalculatorPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Pricing", href: "/pricing" },
          { name: "ROI calculator", href: "/pricing/roi-calculator" },
        ]}
        eyebrow="ROI calculator"
        title={
          <>
            What could <span className="text-gradient">faster follow-up</span> be worth?
          </>
        }
        description="Enter three numbers to see an estimate of the revenue recovered when every lead is called within seconds. It is an estimate, not a promise, and every assumption can be changed."
      />

      <Section aria-label="ROI calculator">
        <Container className="max-w-4xl">
          <RoiCalculator variant="full" />
          <div className="mt-8 rounded-2xl border border-border bg-surface p-6 text-sm leading-relaxed text-muted-foreground">
            <p className="font-bold text-foreground">Make it your own</p>
            <p className="mt-2">
              The starting assumptions are illustrative, so please replace them with your own figures under
              &ldquo;Assumptions behind this estimate&rdquo;. As pilot results come in we will publish measured numbers here, never
              invented ones. Want help building a realistic baseline? Book a demo and we will do it together.
            </p>
          </div>
        </Container>
      </Section>

      <CtaBand source="roi-calculator" />
    </>
  );
}
