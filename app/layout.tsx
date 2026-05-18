import { NamePageProvider } from "./dashBoard/(JobSeekerModel)/context/NamePageContext";
import { PersentProfileProvider } from "./dashBoard/(JobSeekerModel)/context/PersentProfileContext";
import { UpdateCvValueProvider } from "./dashBoard/(JobSeekerModel)/context/UpdateCvValue";
import { ToastContainer } from "react-toastify";
import NextTopLoader from 'nextjs-toploader';

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
        <NextTopLoader color="#2563eb" height={3} showSpinner={false} />
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
