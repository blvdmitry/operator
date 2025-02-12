export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-rs-theme="reshaped" data-bui-theme="traveller-light">
      <body>{children}</body>
    </html>
  );
}
