import type { Metadata } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

const ibm = IBM_Plex_Sans({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    variable: '--font-ibm-plex-sans',
});

export const metadata: Metadata = {
    title: 'Imaginify (Canva Clone)',
    description: 'AI-powered image generator',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider appearance={{ variables: { colorPrimary: '#624cf5' } }}>
            <html lang="en" suppressHydrationWarning>
                <body className={`${ibm.variable} antialiased`}>{children}</body>
            </html>
        </ClerkProvider>
    );
}
