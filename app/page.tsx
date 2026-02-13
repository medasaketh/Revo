import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Revo</h1>
      <p>Know what suits your body and skin.</p>

      <Link href="/login">
        <button style={{ marginTop: 20 }}>
          Start Analysis
        </button>
      </Link>
    </div>
  );
}
