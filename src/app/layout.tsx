import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Web3Provider } from '@/components/Web3Provider';
import { Toaster } from '@/components/ui/sonner';
import FarcasterWrapper from "@/components/FarcasterWrapper";

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
          >
            <Web3Provider>
      <FarcasterWrapper>
        {children}
      </FarcasterWrapper>
      </Web3Provider>
            <Toaster position="top-right" />
          </body>
        </html>
      );
}

export const metadata: Metadata = {
        title: "Mini DApp Builder",
        description: "Create and verify smart contracts on Base networks, integrate WalletConnect, and deploy on Vercel. Easily connect wallets and switch networks via an intuitive interface.",
        other: { "fc:frame": JSON.stringify({"version":"next","imageUrl":"https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/thumbnail_e96ffe1e-d474-4f2d-a7be-4bd2721d22c2-zeNqWSuWKSuCgwmuuBTyC8dlP2Hgt3","button":{"title":"Open with Ohara","action":{"type":"launch_frame","name":"Mini DApp Builder","url":"https://basis-quiet-387.app.ohara.ai","splashImageUrl":"https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/farcaster/splash_images/splash_image1.svg","splashBackgroundColor":"#ffffff"}}}
        ) }
    };
