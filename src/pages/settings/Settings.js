import React, { useState } from "react";
import {
  Moon,
  Sun,
  Palette,
  Bell,
  BellOff,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Trash2,
  LogOut,
  Save,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore, useThemeStore } from "../../store";
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/common/Card";
import Button from "../../components/common/Button";
// import Input from '../../components/common/Input';
import { cn } from "../../utils/helpers";

/* ── small reusable toggle ── */
const Toggle = ({ checked, onChange }) => (
  <button
    onClick={onChange}
    className={cn(
      "relative w-11 h-6 rounded-full transition-colors duration-200",
      checked ? "bg-primary-600" : "bg-gray-300 dark:bg-gray-600",
    )}
  >
    <span
      className={cn(
        "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200",
        checked && "translate-x-5",
      )}
    />
  </button>
);

const Settings = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { theme, isDarkMode, toggleDarkMode, setTheme } = useThemeStore();

  /* ── notification toggles (local state; wire to API later) ── */
  const [notifs, setNotifs] = useState({
    paymentReminders: true,
    complaintUpdates: true,
    newNotices: true,
    systemAlerts: true,
    emailNotifications: true,
  });

  console.log(user);

  /* ── password change ── */
  const [pwData, setPwData] = useState({ current: "", newPw: "", confirm: "" });
  const [pwErrors, setPwErrors] = useState({});
  const [pwVisible, setPwVisible] = useState({
    current: false,
    newPw: false,
    confirm: false,
  });
  const [pwSaved, setPwSaved] = useState(false);

  /* ── helpers ── */
  const themes = [
    { name: "Blue", value: "blue", from: "from-blue-500", to: "to-blue-700" },
    {
      name: "Purple",
      value: "purple",
      from: "from-purple-500",
      to: "to-purple-700",
    },
    {
      name: "Green",
      value: "green",
      from: "from-green-500",
      to: "to-green-700",
    },
    {
      name: "Orange",
      value: "orange",
      from: "from-orange-500",
      to: "to-orange-700",
    },
  ];

  const toggleNotif = (key) =>
    setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));

  const togglePwVis = (key) =>
    setPwVisible((prev) => ({ ...prev, [key]: !prev[key] }));

  const handlePwChange = (e) => {
    const { name, value } = e.target;
    setPwData((prev) => ({ ...prev, [name]: value }));
    if (pwErrors[name]) setPwErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validatePassword = () => {
    const errs = {};
    if (!pwData.current) errs.current = "Current password is required";
    if (!pwData.newPw) errs.newPw = "New password is required";
    else if (pwData.newPw.length < 6) errs.newPw = "At least 6 characters";
    if (!pwData.confirm) errs.confirm = "Confirm password is required";
    else if (pwData.newPw !== pwData.confirm)
      errs.confirm = "Passwords do not match";
    return errs;
  };

  const handlePwSave = () => {
    const errs = validatePassword();
    if (Object.keys(errs).length) {
      setPwErrors(errs);
      return;
    }
    // TODO: call API to change password
    setPwSaved(true);
    setPwData({ current: "", newPw: "", confirm: "" });
    setTimeout(() => setPwSaved(false), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  /* ── section label ── */
  // const SectionLabel = ({ children }) => (
  //   <h2 className="mb-3 text-sm font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
  //     {children}
  //   </h2>
  // );

  /* ── render ── */
  return (
    <div className="pb-20 space-y-6 md:pb-6">
      {/* header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Settings
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Customise your experience
        </p>
      </div>

      {/* ════════ APPEARANCE ════════ */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* dark mode row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg dark:bg-gray-800">
                {isDarkMode ? (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-600" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Dark Mode
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isDarkMode ? "Dark theme is on" : "Switch to dark theme"}
                </p>
              </div>
            </div>
            <Toggle checked={isDarkMode} onChange={toggleDarkMode} />
          </div>

          <hr className="border-gray-200 dark:border-gray-800" />

          {/* theme palette */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg dark:bg-gray-800">
                <Palette className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Accent Colour
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Choose your favourite accent
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-2 ml-0">
              {themes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTheme(t.value)}
                  className="relative group"
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl bg-gradient-to-br shadow-md transition-all duration-200 group-hover:scale-105",
                      t.from,
                      t.to,
                      theme === t.value &&
                        "ring-4 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ring-gray-400",
                    )}
                  />
                  {theme === t.value && (
                    <Check className="absolute inset-0 w-5 h-5 m-auto text-white drop-shadow" />
                  )}
                  <p className="text-xs text-center text-gray-600 dark:text-gray-400 mt-1.5">
                    {t.name}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ════════ NOTIFICATIONS ════════ */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                key: "paymentReminders",
                label: "Payment Reminders",
                desc: "Get notified about upcoming and overdue payments",
              },
              {
                key: "complaintUpdates",
                label: "Complaint Updates",
                desc: "Updates on your raised complaints",
              },
              {
                key: "newNotices",
                label: "New Notices",
                desc: "Announcements from management",
              },
              {
                key: "systemAlerts",
                label: "System Alerts",
                desc: "Important system notifications",
              },
              {
                key: "emailNotifications",
                label: "Email Notifications",
                desc: "Receive a copy of notifications via email",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center bg-gray-100 rounded-lg w-9 h-9 dark:bg-gray-800">
                    {notifs[item.key] ? (
                      <Bell className="w-4 h-4 text-primary-600" />
                    ) : (
                      <BellOff className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <Toggle
                  checked={notifs[item.key]}
                  onChange={() => toggleNotif(item.key)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ════════ SECURITY ════════ */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* two-factor placeholder */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg dark:bg-green-900/30">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Two-Factor Authentication
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Add an extra layer of security
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Enable
            </Button>
          </div>

          <hr className="border-gray-200 dark:border-gray-800" />

          {/* change password */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg dark:bg-gray-800">
                <Lock className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Change Password
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Update your account password
                </p>
              </div>
            </div>

            {pwSaved && (
              <div className="flex items-center gap-2 p-3 mb-4 border border-green-200 rounded-lg bg-green-50 dark:bg-green-900/20 dark:border-green-800">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700 dark:text-green-300">
                  Password changed successfully
                </span>
              </div>
            )}

            <div className="space-y-3">
              {[
                { name: "current", label: "Current Password" },
                { name: "newPw", label: "New Password" },
                { name: "confirm", label: "Confirm New Password" },
              ].map(({ name, label }) => (
                <div key={name} className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    {label}
                  </label>
                  <div className="relative">
                    <input
                      type={pwVisible[name] ? "text" : "password"}
                      name={name}
                      value={pwData[name]}
                      onChange={handlePwChange}
                      placeholder="••••••••"
                      className="w-full pr-10 input-field"
                    />
                    <button
                      type="button"
                      onClick={() => togglePwVis(name)}
                      className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      {pwVisible[name] ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {pwErrors[name] && (
                    <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                      {pwErrors[name]}
                    </p>
                  )}
                </div>
              ))}
              <Button
                variant="primary"
                size="sm"
                icon={Save}
                onClick={handlePwSave}
              >
                Update Password
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ════════ DANGER ZONE ════════ */}
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400">
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10 rounded-xl">
              <div>
                <p className="font-medium text-red-900 dark:text-red-300">
                  Log Out
                </p>
                <p className="text-xs text-red-600 dark:text-red-400">
                  End your current session
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                icon={LogOut}
                onClick={handleLogout}
                className="text-red-600 border-red-300 hover:bg-red-100 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/30"
              >
                Log Out
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10 rounded-xl">
              <div>
                <p className="font-medium text-red-900 dark:text-red-300">
                  Delete Account
                </p>
                <p className="text-xs text-red-600 dark:text-red-400">
                  Permanently remove your account and all data
                </p>
              </div>
              <Button variant="danger" size="sm" icon={Trash2}>
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
