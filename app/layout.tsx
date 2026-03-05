import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'AI Dev Team | Бесплатный онлайн-вебинар',
  description: 'Как конвертировать ИИ в деньги: реальные инструменты, эффективность которых можно посчитать.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body className="bg-[#0B0F19] text-white font-sans antialiased selection:bg-purple-500/30 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
