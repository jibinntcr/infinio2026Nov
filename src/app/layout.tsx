import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://app-sepia-tau-ngxwehnvd9.vercel.app";

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Infinio Technology Solutions | Software, Automation & Web Engineering (Kochi, Thrissur, Dubai)",
    template: "%s | Infinio Technology Solutions",
  },
  description:
    "Infinio Technology Solutions helps businesses design, build, and improve custom software, web platforms, cloud infrastructure, and digital automation across Kochi, Thrissur, and Dubai.",
  keywords: [
    "Infinio Technology Solutions",
    "Infinio Kochi",
    "Infinio Thrissur",
    "Software Company Kochi CIAL Aero Park",
    "Software Development Thrissur",
    "Web Design and Development Kerala",
    "Digital Transformation Dubai UAE",
    "Cloud Services and Moodle LMS Kerala",
  ],
  authors: [{ name: "Infinio Technology Solutions", url: SITE_URL }],
  creator: "Infinio Technology Solutions",
  publisher: "Infinio Technology Solutions",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Infinio Technology Solutions",
    title: "Infinio Technology Solutions | Intelligent Technology. Practical Business Impact.",
    description:
      "Custom software, web platforms, cloud hosting, and workflow automation engineered across Kochi, Thrissur, and Dubai.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Infinio Technology Solutions | Software, Web & Automation",
    description:
      "Infinio Technology Solutions helps businesses design, build, and improve software, automation, and digital experiences.",
  },
  category: "technology",
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Infinio Technology Solutions",
      url: SITE_URL,
      logo: `${SITE_URL}/images/infinio-logo.png`,
      email: "info@infinio.co.in",
      telephone: "+91-97454-50618",
      foundingDate: "2016",
      description:
        "Technology company providing custom software development, web design, cloud services, digital transformation, IT consulting, and cybersecurity & LMS training across Kochi, Thrissur, and Dubai.",
      address: [
        {
          "@type": "PostalAddress",
          streetAddress:
            "First Floor, CIASL Business Centre, CIAL Aero Park, F-23A, Cochin International Airport, Nedumbassery",
          addressLocality: "Kochi",
          addressRegion: "Kerala",
          postalCode: "683111",
          addressCountry: "IN",
        },
        {
          "@type": "PostalAddress",
          streetAddress:
            "2nd Floor, Vimala Building, Rice Bazar Road (Near St. Thomas College)",
          addressLocality: "Thrissur",
          addressRegion: "Kerala",
          postalCode: "680001",
          addressCountry: "IN",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "Jebel Ali Industrial Area",
          addressLocality: "Dubai",
          addressCountry: "AE",
        },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#kochi-studio`,
      name: "Infinio Technology Solutions — Kochi Studio",
      image: `${SITE_URL}/images/infinio-logo.png`,
      url: SITE_URL,
      telephone: "+91-97454-50618",
      email: "info@infinio.co.in",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "First Floor, CIASL Business Centre, CIAL Aero Park, F-23A, Cochin International Airport, Nedumbassery",
        addressLocality: "Kochi",
        addressRegion: "Kerala",
        postalCode: "683111",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 10.159,
        longitude: 76.3919,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Infinio Technology Solutions",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="min-h-screen bg-[#ffffff] text-[#0f172a] selection:bg-[#e0f2fe] selection:text-[#0284c7]">
        {children}
      </body>
    </html>
  );
}
