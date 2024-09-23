import type { Metadata } from "next";
import "@styles/globals.css";


export const metadata: Metadata = {
  title: "NexiMeet",
  description: "Elevate Your Virtual Events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.ico" />
      </head>
      <body>
          <main className="app">
            {children}
          </main>
      </body>
    </html>
  );
}
