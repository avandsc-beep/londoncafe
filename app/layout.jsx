import "./globals.css";

export const metadata = {
  title: "Cafetería — Menú Digital",
  description: "Menú digital y pedidos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}