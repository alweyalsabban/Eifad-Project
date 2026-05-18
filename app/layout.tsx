import { NamePageProvider } from "./dashBoard/(JobSeekerModel)/context/NamePageContext";
import { PersentProfileProvider } from "./dashBoard/(JobSeekerModel)/context/PersentProfileContext";
import { UpdateCvValueProvider } from "./dashBoard/(JobSeekerModel)/context/UpdateCvValue";
import { ToastContainer } from "react-toastify";

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
        <ToastContainer />
        <UpdateCvValueProvider>
          <PersentProfileProvider>
            <NamePageProvider>{children}</NamePageProvider>
          </PersentProfileProvider>
        </UpdateCvValueProvider>
      </body>
    </html>
  );
}
