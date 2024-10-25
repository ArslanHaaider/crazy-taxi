// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import {
  ColorSchemeScript,
  createTheme,
  MantineProvider
} from '@mantine/core';
import '@mantine/core/styles.css';
import './globals.css';
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
        <MantineProvider theme={theme} defaultColorScheme={'light'}>{children}</MantineProvider>
      </body>
    </html>
  );
}