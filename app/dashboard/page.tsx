"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/useUser";
import { useEffect } from "react";

export default function DashboardPage() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user]);

  if (!user) return null;

  return <h1>Dashboard</h1>;
}
