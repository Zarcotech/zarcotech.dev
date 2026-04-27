import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import ThemeSwitcher from './components/themeSwitcher';

const ubuntu = Ubuntu({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ubuntu',
  weight: ['300', '400', '500', '700']
});

export const metadata: Metadata = {
  title: "Zarcotech",
  description: "Zarcotech's portfolio :)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
      suppressHydrationWarning
    >
      <body className={`${ubuntu.variable} min-h-full flex flex-col`}>
        <ThemeSwitcher />
        {children}
      </body>
    </html>
  );
}
