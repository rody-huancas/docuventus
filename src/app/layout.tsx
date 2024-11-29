import type { Metadata } from "next";
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: "Docuventus",
  description: "Generar Readme",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
