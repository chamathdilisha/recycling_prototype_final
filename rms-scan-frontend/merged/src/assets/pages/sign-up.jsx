import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/button";
import InputBox from "../components/inputBox";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sign up and go to home
    navigate("/");
  };

  return (
    <div className="eco-mesh-background min-h-screen flex items-center justify-center p-4 font-sans text-slate-100">
      <div className="w-full max-w-md glass-panel-elevated rounded-3xl p-8 sm:p-10 shadow-2xl relative">
        {/* Top Brand Emblem */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/25 transition-transform group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-950">
                <svg className="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            </div>
          </Link>

          <h1 className="text-2xl font-black tracking-tight text-white">Create Account</h1>
          <p className="mt-1 text-xs text-slate-400 font-medium">
            Join the smart waste sorting revolution
          </p>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputBox
            label="Username"
            id="signup-username"
            type="text"
            placeholder="e.g. green_innovator"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />

          <InputBox
            label="Email Address"
            id="signup-email"
            type="email"
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
          />

          <InputBox
            label="Password"
            id="signup-password"
            type="password"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
          />

          <div className="pt-2">
            <Button text="Create Free Account" type="submit" />
          </div>
        </form>

        {/* Footer Link */}
        <div className="mt-8 border-t border-white/10 pt-5 text-center text-xs text-slate-400">
          Already have an account?{" "}
          <Link to="/sign-in" className="font-bold text-emerald-400 hover:text-emerald-300 hover:underline transition-colors">
            Sign In
          </Link>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-[11px] font-semibold text-slate-500 hover:text-slate-300 transition-colors">
            &larr; Back to Scanner
          </Link>
        </div>
      </div>
    </div>
  );
}