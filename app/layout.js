import "./globals.css";
import LayoutWrapper from "./LayoutWrapper"; // correct path kodukkuka

export const metadata = {
  title: "Muhammed Salman | Frontend Developer",
  description: "Professional Frontend Developer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
