import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Docuventus",
  description: "Generar Readme",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="relative">
        <main className="bg-main">
          {children}
        </main>
      </body>
    </html>
  );
}
