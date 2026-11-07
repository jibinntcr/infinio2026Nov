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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://app-sepia-tau-ngxwehnvd9.vercel.app";

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Infinio Technology Solutions | Enterprise AI, Cloud & Custom Software (Kochi, Thrissur, Dubai)",
    template: "%s | Infinio Technology Solutions",
  },
  description:
    "Infinio Technology Solutions engineers enterprise AI agents, custom cloud-native platforms, mobile applications, and ERP modernization from Kochi (CIAL Aero Park), Thrissur, and Dubai.",
  keywords: [
    "Infinio Technology Solutions",
    "Infinio Kochi",
    "Infinio Thrissur",
    "Software Company Kochi CIAL Aero Park",
    "Enterprise AI Development India",
    "Custom Software Engineering Kerala",
    "RAG & Agentic AI Workflows",
    "Next.js MongoDB Cloud Architecture",
    "Mobile App Development Kochi Dubai",
    "Digital Transformation GCC India",
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
    title: "Infinio Technology Solutions | Understand Complexity. Engineer Intelligence.",
    description:
      "AI-native product engineering, cloud platforms, and enterprise software crafted by Infinio across Kochi (CIAL Aero Park), Thrissur, and Dubai.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Infinio Technology Solutions | Enterprise AI & Cloud Engineering",
    description:
      "Custom software, AI agents, and cloud architecture built from Kochi, Thrissur & Dubai.",
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
      email: "info@infinio.co.in",
      telephone: "+91-484-298-4500",
      foundingDate: "2015",
      description:
        "Enterprise software engineering, agentic AI systems, cloud infrastructure, and digital product studio operating across Kochi, Thrissur, and Dubai.",
      sameAs: [
        "https://infinio.co.in",
        "https://www.linkedin.com/company/infinio-technology-solutions",
      ],
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "First Floor, CIASL Business Centre, CIAL Aero Park, F-23A, Nedumbassery",
          addressLocality: "Cochin",
          addressRegion: "Kerala",
          postalCode: "683111",
          addressCountry: "IN",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "2nd Floor, Vimala Building, Near Ragam Theatre, Kuruppam Road",
          addressLocality: "Thrissur",
          addressRegion: "Kerala",
          postalCode: "680001",
          addressCountry: "IN",
        },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#kochi-studio`,
      name: "Infinio Technology Solutions — Kochi Studio",
      url: SITE_URL,
      telephone: "+91-484-298-4500",
      email: "info@infinio.co.in",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "First Floor, CIASL Business Centre, CIAL Aero Park, F-23A, Nedumbassery",
        addressLocality: "Cochin",
        addressRegion: "Kerala",
        postalCode: "683111",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 10.159,
        longitude: 76.3919,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "18:30",
        },
      ],
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
      <body className="min-h-screen bg-[#ffffff] text-[#1f1f1f] selection:bg-[#e8f0fe] selection:text-[#1a73e8]">
        {children}
      </body>
    </html>
  );
}
