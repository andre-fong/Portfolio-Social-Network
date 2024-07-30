import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Stocks Social Network",
  description: "A portfolio and stock tracker with social features",
};

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
