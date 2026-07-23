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

export const metadata = {
  title: "Harsh & Shreya | Royal Wedding Invitation",
  description: "Together with their families, Harsh & Shreya request the honour of your presence at their wedding celebration.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${montserrat.variable} ${greatVibes.variable}`}
    >
      <body className="bg-[#fdfbf7] text-[#3c030a] font-sans antialiased overflow-x-hidden cursor-none">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
