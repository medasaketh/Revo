import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white px-10 py-5 flex items-center justify-between shadow-sm">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-black">
        Revo
      </Link>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        {/* Login Button */}
        <Link href="/login">
          <button className="px-5 py-2 rounded-full border border-black text-black font-medium hover:bg-black hover:text-white transition">
            Login
          </button>
        </Link>

        {/* Get Started Button */}
        <Link href="/onboarding">
          <button className="px-6 py-2 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition">
            Get Started
          </button>
        </Link>
      </div>
    </nav>
  );
}
