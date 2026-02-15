// export default function LoginPage() {
//   return (
//     <div style={{ padding: 40 }}>
//       <h1>Login Page</h1>
//       <p>This will be login later</p>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (!error) {
      alert("Check your email for login link");
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleLogin} style={{ marginTop: 20 }}>
        Send Login Link
      </button>
    </div>
  );
}
