import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '../components/Providers';
import { Layout } from '../components/Layout';
import { AnnouncementBar } from '../components/AnnouncementBar';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
    title: 'Override Shop',
    description: 'Override Shop Configuration',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
                <Providers>
                    <AnnouncementBar />
                    <Layout>
                        {children}
                    </Layout>
                </Providers>
            </body>
        </html>
    );
}
