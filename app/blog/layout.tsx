import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function StartupLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 font-work-sans">{children}</main>
      <Footer />
    </div>
  );
}
