"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Authors", href: "/authors" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between md:px-10 px-4 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-slate-950">
          techfacts
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-700 transition hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {status === "loading" ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200" />
          ) : session ? (
            <div className="flex items-center gap-4">
              <Link
                href="/profile"
                className="flex items-center gap-2 hover:text-indigo-600 transition"
              >
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200">
                    <User className="h-4 w-4" />
                  </div>
                )}
                <span className="text-sm font-medium text-slate-700">
                  {session.user?.name}
                </span>
              </Link>
              <Button
                onClick={handleSignOut}
                variant="ghost"
                size="sm"
                className="text-slate-700 hover:text-slate-950"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-slate-800"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white/95 px-6 pb-5 md:hidden">
          <nav className="flex flex-col gap-3 pt-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-4 border-t border-slate-200 pt-4">
              {status === "loading" ? (
                <div className="h-8 w-full animate-pulse rounded bg-slate-200" />
              ) : session ? (
                <div className="space-y-3">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
                    onClick={() => setOpen(false)}
                  >
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                    <span>{session.user?.name}</span>
                  </Link>
                  <Button
                    onClick={() => {
                      handleSignOut();
                      setOpen(false);
                    }}
                    variant="ghost"
                    className="w-full justify-start text-slate-700 hover:text-slate-950"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button asChild variant="ghost" className="w-full justify-start">
                    <Link href="/auth/signin" onClick={() => setOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/auth/signup" onClick={() => setOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
