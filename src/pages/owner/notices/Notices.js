import React, { useState } from "react";
import {
  Megaphone,
  Plus,
  Search,
  Edit,
  Trash2,
  Calendar,
  AlertCircle,
  Info,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";
import Button from "../../../components/common/Button";
import Card, { CardContent } from "../../../components/common/Card";
import Badge from "../../../components/common/Badge";
import Input from "../../../components/common/Input";
import NoticeForm from "../../../components/notice-form/NoticeForm";
import { formatDate } from "../../../utils/helpers";

/* ── shared mock notices (same shape NoticeForm produces) ── */
const INITIAL_NOTICES = [
  {
    id: "1",
    title: "Electricity Maintenance – Sunday",
    content:
      "Power will be cut off on Sunday 4 Feb from 9 AM to 12 PM for routine maintenance on the main transformer. Please plan accordingly.",
    category: "maintenance",
    priority: "high",
    validFrom: "2024-02-03",
    validTill: "2024-02-04",
    targetAudience: "all",
    status: "active",
    createdAt: "2024-02-02T10:00:00",
  },
  {
    id: "2",
    title: "Rent Payment Reminder",
    content:
      "Please ensure your monthly rent is paid by the 5th of every month. Late payments beyond the 10th will attract a ₹200 late fee.",
    category: "payment",
    priority: "medium",
    validFrom: "2024-02-01",
    validTill: null,
    targetAudience: "all",
    status: "active",
    createdAt: "2024-02-01T08:00:00",
  },
  {
    id: "3",
    title: "Internet Speed Upgrade",
    content:
      "We have upgraded the Wi-Fi infrastructure to 100 Mbps fibre. If you still face slow speeds please restart your device or contact the front desk.",
    category: "general",
    priority: "low",
    validFrom: "2024-01-28",
    validTill: null,
    targetAudience: "all",
    status: "active",
    createdAt: "2024-01-28T09:30:00",
  },
  {
    id: "4",
    title: "Fire-Safety Drill – Green Valley",
    content:
      "A mandatory fire-safety drill will be conducted at Green Valley PG on 10 Feb at 3 PM. All residents must participate.",
    category: "safety",
    priority: "urgent",
    validFrom: "2024-02-05",
    validTill: "2024-02-10",
    targetAudience: "specific_property",
    status: "active",
    createdAt: "2024-02-04T14:00:00",
  },
  {
    id: "5",
    title: "New House Rules – Noise Policy",
    content:
      "From 10 PM to 7 AM the common areas and corridors must remain silent. Please keep personal music / calls at a low volume during this period.",
    category: "policy",
    priority: "medium",
    validFrom: "2024-01-15",
    validTill: null,
    targetAudience: "all",
    status: "archived",
    createdAt: "2024-01-14T11:00:00",
  },
];

/* ── colour / icon helpers (same logic as tenant Notices) ── */
const priorityVariant = (p) => {
  if (p === "urgent") return "danger";
  if (p === "high") return "warning";
  if (p === "medium") return "info";
  return "default";
};

const priorityIcon = (p) => {
  if (p === "urgent" || p === "high") return AlertCircle;
  if (p === "medium") return Info;
  return CheckCircle2;
};

/* ── icon-bg tints keyed by priority ── */
const iconBg = (p) => {
  if (p === "urgent") return "bg-red-100 dark:bg-red-900/30";
  if (p === "high") return "bg-orange-100 dark:bg-orange-900/30";
  if (p === "medium") return "bg-blue-100 dark:bg-blue-900/30";
  return "bg-gray-100 dark:bg-gray-800";
};

const iconColor = (p) => {
  if (p === "urgent") return "text-red-600";
  if (p === "high") return "text-orange-600";
  if (p === "medium") return "text-blue-600";
  return "text-gray-600 dark:text-gray-300";
};

/* ═══════════════════════════════════════════════════════════ */
const OwnerNotices = () => {
  /* ── state ── */
  const [notices, setNotices] = useState(INITIAL_NOTICES);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("active");

  const [formOpen, setFormOpen] = useState(false);
  const [editNotice, setEditNotice] = useState(null);
  const [deleteId, setDeleteId] = useState(null); // confirmation target

  /* ── filtering ── */
  const filtered = notices.filter((n) => {
    const matchSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase()) ||
      n.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "all" || n.category === categoryFilter;
    const matchStatus = statusFilter === "all" || n.status === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  /* ── aggregated stats ── */
  const stats = {
    total: notices.length,
    active: notices.filter((n) => n.status === "active").length,
    archived: notices.filter((n) => n.status === "archived").length,
    urgent: notices.filter(
      (n) => n.priority === "urgent" && n.status === "active",
    ).length,
  };

  /* ── handlers ── */
  const handleCreate = (data) => {
    setNotices((prev) => [{ ...data, status: "active" }, ...prev]);
    setFormOpen(false);
  };

  const handleUpdate = (data) => {
    setNotices((prev) => prev.map((n) => (n.id === data.id ? data : n)));
    setFormOpen(false);
    setEditNotice(null);
  };

  const handleDelete = () => {
    setNotices((prev) => prev.filter((n) => n.id !== deleteId));
    setDeleteId(null);
  };

  const handleToggleStatus = (id) => {
    setNotices((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, status: n.status === "active" ? "archived" : "active" }
          : n,
      ),
    );
  };

  /* ── unique categories present in data (for filter pills) ── */
  const categories = ["all", ...new Set(notices.map((n) => n.category))];

  /* ── render ── */
  return (
    <div className="pb-20 space-y-6 md:pb-6">
      {/* ════ header ════ */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Notices & Announcements
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Create and manage notices for your tenants
          </p>
        </div>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => {
            setEditNotice(null);
            setFormOpen(true);
          }}
        >
          New Notice
        </Button>
      </div>

      {/* ════ stats row ════ */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          {
            label: "Total",
            value: stats.total,
            color: "text-gray-900 dark:text-gray-100",
          },
          { label: "Active", value: stats.active, color: "text-green-600" },
          { label: "Archived", value: stats.archived, color: "text-gray-500" },
          { label: "Urgent", value: stats.urgent, color: "text-red-600" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {s.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ════ search + filter pills ════ */}
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="flex-1">
          <Input
            placeholder="Search notices…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={Search}
          />
        </div>

        {/* status pills */}
        <div className="flex flex-wrap gap-2">
          {["active", "archived", "all"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                statusFilter === s
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* category pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                categoryFilter === c
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {c === "all" ? "All Categories" : c}
            </button>
          ))}
        </div>
      </div>

      {/* ════ notice cards ════ */}
      <div className="space-y-4">
        {filtered.map((notice) => {
          const PIcon = priorityIcon(notice.priority);
          return (
            <Card key={notice.id} hover>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* priority icon blob */}
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg(notice.priority)}`}
                  >
                    <Megaphone
                      className={`w-6 h-6 ${iconColor(notice.priority)}`}
                    />
                  </div>

                  {/* body */}
                  <div className="flex-1 min-w-0">
                    {/* title row */}
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {notice.title}
                      </h3>
                      {notice.status === "archived" && (
                        <Badge variant="default" size="sm">
                          archived
                        </Badge>
                      )}
                    </div>

                    {/* badge row */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge variant="default" size="sm" className="capitalize">
                        {notice.category}
                      </Badge>
                      <Badge
                        variant={priorityVariant(notice.priority)}
                        size="sm"
                      >
                        <PIcon className="w-3 h-3 mr-1" />
                        {notice.priority}
                      </Badge>
                      <Badge variant="default" size="sm" className="capitalize">
                        {notice.targetAudience === "all"
                          ? "All Tenants"
                          : notice.targetAudience === "specific_property"
                            ? "Specific Property"
                            : "Specific Floor"}
                      </Badge>
                    </div>

                    {/* content */}
                    <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                      {notice.content}
                    </p>

                    {/* validity */}
                    <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>From: {formatDate(notice.validFrom)}</span>
                      </div>
                      {notice.validTill && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Till: {formatDate(notice.validTill)}</span>
                          </div>
                        </>
                      )}
                      <span>•</span>
                      <span>Created {formatDate(notice.createdAt)}</span>
                    </div>

                    {/* action buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-800">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={Edit}
                        onClick={() => {
                          setEditNotice(notice);
                          setFormOpen(true);
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        icon={notice.status === "active" ? EyeOff : Eye}
                        onClick={() => handleToggleStatus(notice.id)}
                      >
                        {notice.status === "active" ? "Archive" : "Restore"}
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        icon={Trash2}
                        onClick={() => setDeleteId(notice.id)}
                        className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ════ empty state ════ */}
      {filtered.length === 0 && (
        <Card>
          <CardContent className="text-center p-14">
            <Megaphone className="mx-auto mb-3 text-gray-300 w-14 h-14 dark:text-gray-600" />
            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
              No notices match your filters
            </h3>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Try clearing the search or changing a filter
            </p>
            <Button
              variant="primary"
              icon={Plus}
              onClick={() => {
                setEditNotice(null);
                setFormOpen(true);
              }}
            >
              Create Notice
            </Button>
          </CardContent>
        </Card>
      )}

      {/* ════ NoticeForm modal (create / edit) ════ */}
      <NoticeForm
        isOpen={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditNotice(null);
        }}
        onSubmit={editNotice ? handleUpdate : handleCreate}
        initialData={editNotice}
      />

      {/* ════ delete-confirmation overlay ════ */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setDeleteId(null)}
          />
          <div className="relative w-full max-w-sm p-6 bg-white shadow-2xl dark:bg-gray-900 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg dark:bg-red-900/30">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Delete Notice
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button
                variant="ghost"
                icon={Trash2}
                onClick={handleDelete}
                className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerNotices;
