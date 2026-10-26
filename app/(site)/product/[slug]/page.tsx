import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPageView } from "@/components/product/product-page";
import { products } from "@/lib/content/products";
import { pageMetadata } from "@/lib/seo";
import { truncate } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return {};
  return pageMetadata({
    title: product.name,
    description: truncate(product.intro),
    path: `/product/${product.slug}`,
  });
}

export default async function ProductDetailPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  return <ProductPageView product={product} />;
}
