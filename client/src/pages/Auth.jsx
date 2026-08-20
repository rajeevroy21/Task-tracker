import { ClipboardList } from "lucide-react";
import AuthForm from "../components/AuthForm";

function Auth() {
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[560px]">
        {/* Logo */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-slate-800">
            <ClipboardList size={30} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">
              TaskFlow
            </h1>

            <p className="text-slate-400 text-lg">
              Manage tasks with clarity
            </p>
          </div>
        </div>

        <AuthForm />

        <p className="text-center text-slate-400 mt-7">
          Your tasks are private to your account.
        </p>
      </div>
    </div>
  );
}

export default Auth;