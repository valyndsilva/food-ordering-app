import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function Login() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });
      router.push("/admin");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold mb-5">Admin Dashboard</h1>
        <input
          placeholder="username"
          className="border h-10 mb-5 py-0 px-3 rounded-lg"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          className="border h-10 mb-5 py-0 px-3 rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleClick}
          className="h-10 mb-5 border-none bg-teal-500 text-white font-bold cursor-pointer rounded-lg"
        >
          Sign In
        </button>
        {error && <span className="text-sm text-red-500">Wrong Credentials! Please try again.</span>}
      </div>
    </div>
  );
}

export default Login;
