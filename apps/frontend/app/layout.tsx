import Header from "./component/Header/header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <Header />
        <main className="container mx-auto p-4 md:p-6">
          {children}
        </main>

      </body>
    </html>
  );
}
