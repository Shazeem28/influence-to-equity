import './globals.css';

export const metadata = {
  title: 'Influence to Equity',
  description: 'ADI Framework based web app to assess creator brand longevity.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
