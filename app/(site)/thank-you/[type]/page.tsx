import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ThankYouView, type ThankYouType } from "@/components/forms/thank-you-view";
import { pageMetadata } from "@/lib/seo";

const TYPES: ThankYouType[] = ["demo", "call", "pilot", "contact"];

const isThankYouType = (value: string): value is ThankYouType => (TYPES as string[]).includes(value);

export function generateStaticParams() {
  return TYPES.map((type) => ({ type }));
}

/** Confirmation pages are not search landing pages. */
export async function generateMetadata({ params }: PageProps<"/thank-you/[type]">): Promise<Metadata> {
  const { type } = await params;
  return pageMetadata({
    title: "Thank you",
    description: "We have received your request.",
    path: `/thank-you/${type}`,
    noindex: true,
  });
}

export default async function ThankYouPage({ params }: PageProps<"/thank-you/[type]">) {
  const { type } = await params;
  if (!isThankYouType(type)) notFound();
  return <ThankYouView type={type} />;
}
