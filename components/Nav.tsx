import Link from "next/link";

export default function Nav() {
  return (
    <nav style={{ display: "flex", gap: 20, padding: 20 }}>
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/dashboard">Dashboard</Link>
    </nav>
  );
}
