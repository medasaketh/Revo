"use client";

import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#090909]">
      <nav className="border-b border-[#222222] bg-white px-6 py-5 md:px-10">
        <Link
          href="/"
          className="cursor-pointer text-2xl font-bold text-black transition-opacity hover:opacity-80"
        >
          Revo
        </Link>
      </nav>

      <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold text-white">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-sm text-gray-400">{subtitle}</p>
            )}
          </div>

          <div className="rounded-2xl border border-[#222222] bg-[#111111] p-6 md:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
