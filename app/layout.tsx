import { NamePageProvider } from "./dashBoard/(JobSeekerModel)/context/NamePageContext";
import { PersentProfileProvider } from "./dashBoard/(JobSeekerModel)/context/PersentProfileContext";

import "./globals.css";

export const metadata = {
  title: {
    default: "إفادة - منصة توظيف",
    template: "%s - إفادة",
  },
  description: "منصة إفادة للتوظيف وربط الباحثين عن عمل بالشركات",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PersentProfileProvider>
          <NamePageProvider>{children}</NamePageProvider>
        </PersentProfileProvider>
      </body>
    </html>
  );
}
