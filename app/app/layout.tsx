import type { Metadata } from "next";
import { Kalam, Patrick_Hand } from "next/font/google";
import "./globals.css";

const kalam = Kalam({
  subsets: ["latin"],
  variable: "--font-kalam",
  display: "swap",
  weight: ["400", "700"],
});

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  variable: "--font-patrick-hand",
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Campus Opportunity Radar — Powered by Databricks Genie",
  description:
    "Turn fragmented campus data into personalized, explainable opportunity paths — sketched and reasoned by Databricks Genie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${kalam.variable} ${patrickHand.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-paper bg-paper-grain text-ink font-body antialiased selection:bg-paper-yellowDark selection:text-ink">
        {children}
      </body>
    </html>
  );
}
