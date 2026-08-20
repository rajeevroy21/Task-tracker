import {
  ClipboardList,
  Moon,
  Sun,
  LogOut,
} from "lucide-react";

function Header({ darkMode, setDarkMode, onLogout }) {
  return (
    <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto h-full px-36 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center">
            <ClipboardList size={21} />
          </div>

          <h1 className="text-xl font-bold text-slate-800 dark:text-white">
            TaskFlow
          </h1>
        </div>

        <div className="flex items-center gap-3">
          
          {/* Theme */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {darkMode ? (
              <Sun size={21} />
            ) : (
              <Moon size={21} />
            )}
          </button>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
          >
            <LogOut size={21} />
          </button>

        </div>
      </div>
    </header>
  );
}

export default Header;