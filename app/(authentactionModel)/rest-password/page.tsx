import type { Metadata } from "next";
import Modal from "./Modal";

export const metadata: Metadata = {
  title: "إعادة تعين",
};

export default function Page() {
  return <Modal />;
}
