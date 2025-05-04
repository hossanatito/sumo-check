import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google'; // Import standard Google Fonts
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

// Configure Inter font
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap', // Ensure text remains visible during font loading
});

// Configure Roboto Mono font
const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
  display: 'swap', // Ensure text remains visible during font loading
});

export const metadata: Metadata = {
  title: 'Deal Detective', // Updated title
  description: 'Check AppSumo deal details quickly.', // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Apply suppressHydrationWarning to the html tag
    <html lang="en" suppressHydrationWarning={true} className={`${inter.variable} ${robotoMono.variable}`}>
      {/* Remove suppressHydrationWarning from body if not needed, apply font variables */}
      <body
        className={`antialiased`}
      >
        {children}
        <Toaster /> {/* Add Toaster for notifications */}
      </body>
    </html>
  );
}
