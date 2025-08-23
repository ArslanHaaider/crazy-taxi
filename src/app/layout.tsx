// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import {
  ColorSchemeScript,
  createTheme,
  MantineProvider
} from '@mantine/core';
import './globals.css';
import { DatesProvider } from '@mantine/dates';
export const metadata = {
  title: 'Ride for Frankfurt',
  description: 'Book ride anywhere in frankfurt',
};
const theme = createTheme({
  fontFamily: 'Verdana, sans-serif',
});
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <head>
        {/* Initialize theme before hydration to avoid flashes */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var ls = typeof window !== 'undefined' ? window.localStorage : null;
    var stored = ls ? ls.getItem('theme') : null;
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    var root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-mantine-color-scheme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-mantine-color-scheme', 'light');
    }
  } catch (e) {}
})();
`}}
        />
        <ColorSchemeScript />
      </head>
      <body className='font-sans transition-colors duration-300'>
      <NextIntlClientProvider messages={messages}>
        <DatesProvider settings={{
            locale: 'de',            // German locale
            firstDayOfWeek: 1,       // Monday is the first day of the week
            weekendDays: [6, 0],     // Saturday and Sunday are weekend days
            timezone: 'Europe/Berlin' // German timezone
          }}>
        <MantineProvider theme={theme} defaultColorScheme={'auto'}>{children}</MantineProvider>
        </DatesProvider>
        </NextIntlClientProvider>
      </body>
    </html> 
  );
}