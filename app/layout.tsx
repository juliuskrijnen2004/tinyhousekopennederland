import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tinyhousekopennederland.nl";
export const metadata: Metadata = { metadataBase: new URL(site), title: { default: "Tiny House Kopen Nederland | Vind passende mogelijkheden", template: "%s | Tiny House Kopen Nederland" }, description: "Ontdek tiny houses die bij jouw woonwensen passen en ontvang vrijblijvend informatie van geschikte aanbieders.", alternates: { canonical: "/" }, openGraph: { type: "website", locale: "nl_NL", siteName: "Tiny House Kopen Nederland", images: ["/images/tiny-house-hero.png"] } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
 const gtm = process.env.NEXT_PUBLIC_GTM_ID;
 return <html lang="nl"><body>{gtm && <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}</Script>}<header className="header"><Link className="brand" href="/"><span className="mark">TH</span><span>Tiny House Kopen<br/><small>Nederland</small></span></Link><nav aria-label="Hoofdnavigatie"><Link href="/tiny-house-kopen">Kopen</Link><Link href="/prijzen">Prijzen</Link><Link href="/mogelijkheden">Mogelijkheden</Link><Link href="/veelgestelde-vragen">FAQ</Link></nav><Link className="button compact" href="/aanvragen">Bekijk mijn mogelijkheden</Link></header><main>{children}</main><footer><div><strong>Tiny House Kopen Nederland</strong><p>Onafhankelijke aanvraagservice voor consumenten die een tiny house overwegen.</p></div><div><Link href="/over-ons">Hoe het werkt</Link><Link href="/contact">Contact</Link><Link href="/privacybeleid">Privacy</Link><Link href="/cookiebeleid">Cookies</Link><Link href="/algemene-voorwaarden">Voorwaarden</Link></div></footer></body></html>;
}
