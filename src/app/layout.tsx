import type { Metadata } from "next";
import { Header } from "@/components";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Docuventus",
  description: "Generar Readme",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="relative">
        <Header />
        <main className="bg-main">
          <div className="mt-32">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
