import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://maps.gstatic.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://maps.googleapis.com",
              "img-src 'self' data: blob: https://maps.googleapis.com https://maps.gstatic.com https://streetviewpixels-pa.googleapis.com https://khms0.googleapis.com https://khms1.googleapis.com https://khms2.googleapis.com https://khms3.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://maps.googleapis.com https://maps.gstatic.com https://places.googleapis.com",
              "frame-src 'self' https://www.google.com",
              "worker-src 'self' blob:",
              "child-src 'self' blob:"
            ].join('; ')
          }
        ]
      }
    ];
  }
};
 
export default withNextIntl(nextConfig);