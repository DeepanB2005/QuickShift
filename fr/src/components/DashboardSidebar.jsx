import React from "react";
import { FaUser, FaPlusCircle, FaClipboardList, FaHandshake, FaBriefcase, FaBook, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import { useI18n } from "../i18n/I18nProvider";

const SIDEBAR_CONFIG = {
  user: [
    { key: "profile", label: "sidebar.profile", icon: <FaUser /> },
    { key: "add-post", label: "sidebar.addPost", icon: <FaPlusCircle /> },
    { key: "my-posts", label: "sidebar.myPosts", icon: <FaClipboardList /> },
    { key: "join-requests", label: "sidebar.joinRequests", icon: <FaHandshake /> }
  ],
  worker: [
    { key: "profile", label: "sidebar.profile", icon: <FaUser /> },
    { key: "job-posts", label: "sidebar.jobPosts", icon: <FaBriefcase /> },
    { key: "my-bookings", label: "sidebar.myBookings", icon: <FaBook /> },
    { key: "requests", label: "sidebar.requests", icon: <FaEnvelope /> }
  ]
};

export default function DashboardSidebar({ role, active, onSelect }) {
  const { t } = useI18n();
  const items = SIDEBAR_CONFIG[role] || [];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <aside
      className="fixed top-0 left-0 bg-gradient-to-b from-purple-600 to-indigo-400 text-white w-64 h-screen rounded-r shadow-xl flex flex-col py-8 px-4 z-30"
      style={{ minHeight: "100vh" }}
    >
      <div className="mb-8 text-center">
        <span className="text-3xl font-bold tracking-wide">QuickShift</span>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {items.map(item => (
            <li key={item.key}>
              <button
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-all
                  ${active === item.key ? "bg-green-500 bg-opacity-20 font-semibold shadow" : "hover:bg-red-200 hover:bg-opacity-10 hover:text-black"}
                `}
                onClick={() => onSelect(item.key)}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span>{t(item.label)}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <button
        className="flex items-center justify-center w-full mt-6 px-4 py-3 rounded-lg bg-red-400 bg-opacity-20 text-white font-semibold hover:bg-opacity-40 transition-all"
        onClick={handleLogout}
      >
        <FaSignOutAlt className="mr-2" />
        {t("logout")}
      </button>
      <div className="mt-8 text-xs text-center text-indigo-600 opacity-70">
        &copy; {new Date().getFullYear()} QuickShift
      </div>
    </aside>
  );
}
