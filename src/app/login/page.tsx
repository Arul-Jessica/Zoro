"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = useSearchParams()?.get("error");
  const router = useRouter();

  type Errors = Record<string, string>;

  const errors: Errors = {
    Signin: "Try signing with a different account.",
    OAuthSignin: "Try signing with a different account.",
    OAuthCallback: "Try signing with a different account.",
    OAuthCreateAccount: "Try signing with a different account.",
    EmailCreateAccount: "Try signing with a different account.",
    Callback: "Try signing with a different account.",
    OAuthAccountNotLinked:
      "To confirm your identity, sign in with the same account you used originally.",
    EmailSignin: "Check your email address.",
    CredentialsSignin:
      "Sign in failed. Check the details you provided are correct.",
    default: "Unable to sign in.",
    "Invalid email or password": "Invalid email or password",
    USER_NOT_FOUND: "User doesn't exist",
    INVALID_PASSWORD: "Invalid password",
    "User not found": "User not found",
  };

  useEffect(() => {
    if (error) {
      toast.error(errors[error] ?? "Something went wrong");
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signIn("credentials", {
        email: email,
        password: password,
        callbackUrl: "/dashboard",
      });
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Failed to login");
    }
  };
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-md bg-white p-6 shadow-md">
        <h2 className="text-center text-lg font-semibold text-gray-700">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <label htmlFor="email" className="block">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none"
              placeholder="you@example.com"
              required
            />
          </label>
          <label htmlFor="password" className="mt-3 block">
            <span className="text-gray-700">Password</span>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none"
              placeholder="Your Password"
              required
            />
          </label>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full transform rounded-md bg-indigo-500 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-indigo-600 focus:bg-indigo-600 focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
