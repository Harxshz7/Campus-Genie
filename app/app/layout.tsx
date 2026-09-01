import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campus Opportunity Radar — Powered by Databricks Genie",
  description:
    "Turn fragmented campus data into personalized, explainable opportunity paths — powered by Databricks Genie multi-hop reasoning over the Unity Catalog Opportunity Graph.",
  keywords: [
    "Databricks Genie",
    "Campus Opportunity Radar",
    "Opportunity Graph",
    "Unity Catalog",
    "Higher Education",
    "Career Pathway",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white text-black antialiased selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}
