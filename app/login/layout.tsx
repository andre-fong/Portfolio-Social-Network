import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Stocks Social Network",
  description: "A portfolio and stock tracker with social features",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
