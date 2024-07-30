import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Stocks Social Network",
  description: "A portfolio and stock tracker with social features",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Sidebar />
      {children}
    </div>
  );
}
