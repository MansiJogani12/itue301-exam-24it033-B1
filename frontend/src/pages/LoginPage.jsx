import { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");

  return (
    <div>
      <h1>FitZone Gym</h1>

      <h2>Member Login</h2>

      <form>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <button type="submit">
          Login
        </button>
      </form>

      <p>
        Email: {email}
      </p>
    </div>
  );
}

export default LoginPage;