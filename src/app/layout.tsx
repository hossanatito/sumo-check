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
  title: 'Sumo Check', // Updated title
  description: 'Check AppSumo deal details quickly.', // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Apply suppressHydrationWarning to the html tag and enforce dark theme
    <html lang="en" suppressHydrationWarning={true} className={`${inter.variable} ${robotoMono.variable} dark`}>
      {/* Apply suppressHydrationWarning to the body tag as well to handle browser extension injections */}
      <body
        className={`antialiased`}
        suppressHydrationWarning={true}
      >
        {/* V2 Notification Banner */}
        <div className="w-full bg-primary text-primary-foreground py-3 px-4 text-center">
          <p className="text-sm font-medium">
            🎉 v2 is now live!{' '}
            <a
              href="https://sumocheck.appsdyno.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold hover:text-white transition-colors"
            >
              Check it out →
            </a>
          </p>
        </div>
        {children}
        <Toaster /> {/* Add Toaster for notifications */}
      </body>
    </html>
  );
}
