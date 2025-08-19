import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardSidebar from "../components/DashboardSidebar";
import { useI18n } from "../i18n/I18nProvider";
import ProfileSection from "./dashboard/sections/ProfileSection";
import AddPostSection from "./dashboard/sections/AddPostSection";
import MyPostsSection from "./dashboard/sections/MyPostsSection";
import JoinRequestsSection from "./dashboard/sections/JoinRequestsSection";
import JobPostsSection from "./dashboard/sections/JobPostsSection";
import MyBookingsSection from "./dashboard/sections/MyBookingsSection";
import RequestsSection from "./dashboard/sections/RequestsSection";
import LanguageSwitcher from "../components/LanguageSwitcher";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Dashboard() {
  const { t, lang } = useI18n();
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${API}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(({ data }) => {
      setUser(data.user);
    }).catch(() => setUser(null));
  }, [lang]); // refetch user if language changes

  if (!user) return <div className="mt-10 text-center">{t("common.loading")}</div>;

  return (
    <div className="flex min-h-screen bg-gradient-to-t from-blue-300 to-violet-200">
      {/* Sidebar */}
      <DashboardSidebar
        role={user.role}
        active={activeSection}
        onSelect={setActiveSection}
      />
      {/* Main content area */}
      <div className="flex-1 flex flex-col relative">
        {/* Navbar - fixed to top right, does not push down sidebar */}
        <nav className="absolute top-0 right-0 w-full h-16 shadow flex items-center justify-end px-8 z-10 gap-6">
          <span className="text-gray-700 font-semibold">{user.name}</span>
          <button
            className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 font-medium"
            onClick={() => window.location.href = "/"}
          >
            {t("dashboard.homeBtn") || "Home"}
          </button>
          <LanguageSwitcher />
        </nav>
        {/* Add top padding to main to avoid overlap with navbar */}
        <main className="flex-1 p-8 pt-24">
          {activeSection === "profile" && (
            <ProfileSection user={user} onUserUpdate={setUser} />
          )}
          {user.role === "user" && activeSection === "add-post" && <AddPostSection />}
          {user.role === "user" && activeSection === "my-posts" && <MyPostsSection />}
          {user.role === "user" && activeSection === "join-requests" && <JoinRequestsSection />}
          {user.role === "worker" && activeSection === "job-posts" && <JobPostsSection />}
          {user.role === "worker" && activeSection === "my-bookings" && <MyBookingsSection />}
          {user.role === "worker" && activeSection === "requests" && <RequestsSection />}
        </main>
      </div>
    </div>
  );
}