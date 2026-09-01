import type { Metadata } from 'next';
import { Kalam, Patrick_Hand } from 'next/font/google';
import './globals.css';

const kalam = Kalam({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-kalam',
  display: 'swap',
});

const patrickHand = Patrick_Hand({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-patrick',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Campus Genie — Hand-Drawn Opportunity Radar',
  description: 'A Genie-powered campus intelligence platform turning disconnected datasets into personalized opportunity paths.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${kalam.variable} ${patrickHand.variable}`}>
      <body className="font-hand text-[#2d2d2d] bg-[#fdfbf7] antialiased selection:bg-[#ff4d4d] selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
