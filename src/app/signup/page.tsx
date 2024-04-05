"use client";
import { api } from "~/trpc/react";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [regno, setRegno] = useState("");
  const [dept, setDept] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const signupMutation = api.user.create.useMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    const user = await signupMutation.mutateAsync({
      name,
      regno: Number(regno),
      dept,
      email,
      password,
    });
    if (user.success) {
      toast.success("User created successfully.");
      router.push("/login");
    } else {
      toast.error(user?.message ?? "Something went wrong.");
    }
  };

  useEffect(() => {
    if (password && confirmPassword) {
      setPasswordsMatch(password === confirmPassword);
    }
  }, [password, confirmPassword]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-md bg-white p-6 shadow-md">
        <h2 className="text-center text-lg font-semibold text-gray-700">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <label htmlFor="name" className="block">
            <span className="text-gray-700">Name</span>
            <input
              type="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm
              focus:border-indigo-500 focus:outline-none"
              placeholder="Your Name"
              required
            />
          </label>

          <label htmlFor="email" className="block">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm
              focus:border-indigo-500 focus:outline-none"
              placeholder="you@example.com"
              required
            />
          </label>
          <label htmlFor="regno" className="block">
            <span className="text-gray-700">Register Number</span>
            <input
              type="name"
              id="regno"
              value={regno}
              onChange={(e) => setRegno(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm
              focus:border-indigo-500 focus:outline-none"
              placeholder="Your Register Number"
              required
            />
          </label>
          <label htmlFor="dept" className="block">
            <span className="text-gray-700">Department</span>
            <input
              type="dept"
              id="dept"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm
              focus:border-indigo-500 focus:outline-none"
              placeholder="CSE/IT/EEE/MECH/EC/CE/PE/ARCHI"
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
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm
              focus:border-indigo-500 focus:outline-none"
              placeholder="Your Password"
              required
            />
          </label>
          <label htmlFor="confirm-password" className="mt-3 block">
            <span className="text-gray-700">Confirm Password</span>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm
              focus:border-indigo-500 focus:outline-none"
              placeholder="Confirm Password"
              required
            />
          </label>
          {!passwordsMatch && (
            <p className="mt-1 text-xs text-red-500">Passwords do not match.</p>
          )}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full transform rounded-md bg-indigo-500 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-indigo-600 focus:bg-indigo-600 focus:outline-none"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
