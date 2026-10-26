import Script from "next/script";
import { siteConfig } from "@/lib/site";

/**
 * Loads Google Tag Manager when `NEXT_PUBLIC_GTM_ID` is set. Site events are pushed to
 * `dataLayer` by `lib/analytics.ts` whether or not GTM is present. The id is validated
 * so a malformed env value can never end up inside the inline script.
 */
export function Analytics() {
  const id = siteConfig.analytics.gtmId;
  if (!id || !/^GTM-[A-Z0-9]{4,}$/.test(id)) return null;

  return (
    <Script id="gtm" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`}
    </Script>
  );
}
