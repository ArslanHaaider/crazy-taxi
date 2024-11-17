// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
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
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <DatesProvider settings={{
  locale: 'de',            // German locale
  firstDayOfWeek: 1,       // Monday is the first day of the week
  weekendDays: [6, 0],     // Saturday and Sunday are weekend days
  timezone: 'Europe/Berlin' // German timezone
}}>
        <MantineProvider theme={theme} defaultColorScheme={'light'}>{children}</MantineProvider>
        </DatesProvider>
      </body>
    </html>
  );
}