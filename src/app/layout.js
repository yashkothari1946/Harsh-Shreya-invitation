import { Cinzel, Montserrat, Great_Vibes } from "next/font/google";
import ClientLayout from "@/components/ClientLayout";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-great-vibes",
  weight: ["400"],
});

const SITE_URL = "https://harsh-shreya-invitation.vercel.app";
const OG_TITLE = "Harsh & Shreya | Wedding Invitation 💍";
const OG_DESCRIPTION =
  "Together with their families, Harsh Kothari & Shreya Vaya joyfully invite you to their royal wedding celebration in Udaipur on 11 December 2026.";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: OG_TITLE,
  description: OG_DESCRIPTION,
  keywords: [
    "Harsh Shreya Wedding",
    "Wedding Invitation",
    "Udaipur Wedding",
    "Royal Wedding 2026",
    "Kothari Vaya",
  ],
  authors: [{ name: "Harsh & Shreya" }],

  // ── Open Graph (Facebook, WhatsApp, LinkedIn, iMessage) ──
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    siteName: "Harsh & Shreya Wedding",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Harsh & Shreya — Royal Wedding Invitation · Udaipur, December 2026",
      },
    ],
    locale: "en_IN",
  },

  // ── Twitter / X Card ──
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE],
    creator: "@harshshreya2026",
  },

  // ── Extra for WhatsApp rich previews ──
  other: {
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:type": "image/jpeg",
    "og:locale": "en_IN",
    "theme-color": "#7b2c45",
  },

  // ── Robots ──
  robots: {
    index: true,
    follow: false, // private wedding — don't get crawled deeply
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7b2c45",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${montserrat.variable} ${greatVibes.variable}`}
    >
      <body className="bg-[#fdfbf7] text-[#3c030a] font-sans antialiased overflow-x-hidden">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
