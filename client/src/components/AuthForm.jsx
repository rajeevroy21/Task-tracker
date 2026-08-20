import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
} from "lucide-react";

import api from "../services/api";

function AuthForm() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const switchTab = (tab) => {
    setActiveTab(tab);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      let response;

      if (activeTab === "login") {
        response = await api.post("/auth/login", {
          email,
          password,
        });
      } else {
        response = await api.post("/auth/signup", {
          name,
          email,
          password,
        });
      }

      const data = response.data;

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: activeTab === "signup" ? name : "",
            email,
          })
        );
      }

      navigate("/dashboard");

    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#172033] border border-slate-700/70 rounded-2xl p-6 sm:p-10 shadow-2xl">
      
      {/* Tabs */}
      <div className="grid grid-cols-2 bg-[#263247] rounded-xl p-1.5 mb-8">
        <button
          type="button"
          onClick={() => switchTab("login")}
          className={`py-3 rounded-lg text-lg transition ${
            activeTab === "login"
              ? "bg-[#3b4a60] text-white shadow"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Sign In
        </button>

        <button
          type="button"
          onClick={() => switchTab("signup")}
          className={`py-3 rounded-lg text-lg transition ${
            activeTab === "signup"
              ? "bg-[#3b4a60] text-white shadow"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        
        {/* Error */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-red-400">
            {error}
          </div>
        )}

        {/* Name */}
        {activeTab === "signup" && (
          <div className="mb-5">
            <label className="block text-slate-200 font-medium mb-2">
              Name
            </label>

            <div className="h-14 flex items-center gap-3 px-4 bg-[#263247] border border-[#3a4a60] rounded-lg">
              <User size={20} className="text-slate-400" />

              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-transparent outline-none text-white placeholder:text-slate-400"
              />
            </div>
          </div>
        )}

        {/* Email */}
        <div className="mb-5">
          <label className="block text-slate-200 font-medium mb-2">
            Email
          </label>

          <div className="h-14 flex items-center gap-3 px-4 bg-[#263247] border border-[#3a4a60] rounded-lg">
            <Mail size={20} className="text-slate-400" />

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent outline-none text-white placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block text-slate-200 font-medium mb-2">
            Password
          </label>

          <div className="h-14 flex items-center gap-3 px-4 bg-[#263247] border border-[#3a4a60] rounded-lg">
            <Lock size={20} className="text-slate-400" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              className="w-full bg-transparent outline-none text-white placeholder:text-slate-400"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="text-slate-400 hover:text-white"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 mt-2 bg-white text-slate-900 rounded-lg text-lg font-medium hover:bg-slate-200 transition disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : activeTab === "login"
            ? "Sign In"
            : "Create Account"}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;