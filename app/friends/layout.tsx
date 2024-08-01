import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Friends | Stocks Social Network",
  description: "A portfolio and stock tracker with social features",
};

export default function FriendsLayout({
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
