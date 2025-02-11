export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-rs-theme="reshaped">
      <body>{children}</body>
    </html>
  );
}
