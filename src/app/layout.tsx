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
  title: 'Taxi in Germany',
  description: 'Order taxi anywhere in frankfurt',
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
        <ColorSchemeScript />
      </head>
      <body className='font-sans'>
      <NextIntlClientProvider messages={messages}>
        <DatesProvider settings={{
            locale: 'de',            // German locale
            firstDayOfWeek: 1,       // Monday is the first day of the week
            weekendDays: [6, 0],     // Saturday and Sunday are weekend days
            timezone: 'Europe/Berlin' // German timezone
          }}>
        <MantineProvider theme={theme} defaultColorScheme={'light'}>{children}</MantineProvider>
        </DatesProvider>
        </NextIntlClientProvider>
      </body>
    </html> 
  );
}