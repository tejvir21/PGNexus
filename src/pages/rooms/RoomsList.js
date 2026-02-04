import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  BedDouble,
  ArrowLeft,
  Plus,
  Search,
  Users,
  Eye,
  Edit,
  Wind,
  Droplet,
  Home,
  IndianRupee,
} from "lucide-react";
import Button from "../../components/common/Button";
import Card, { CardContent } from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Input from "../../components/common/Input";
import RoomForm from "../../components/room-form/RoomForm";
import { formatCurrency } from "../../utils/helpers";

/* ── mock data (keyed by propertyId so any /rooms/property/:id works) ── */
const MOCK_PROPERTIES = {
  1: { name: "Green Valley PG", address: "Sector 15, Noida" },
  2: { name: "Sunrise Residency", address: "Gomti Nagar, Lucknow" },
  3: { name: "Peaceful Heights", address: "Civil Lines, Allahabad" },
};

const MOCK_ROOMS = {
  1: [
    {
      id: "r1",
      roomNumber: "101",
      floor: "Ground",
      roomType: "single",
      capacity: 1,
      rent: 5500,
      area: 120,
      furnishing: "fully-furnished",
      status: "occupied",
      ac: true,
      balcony: false,
      attachedBathroom: true,
      tenant: { name: "Arun Kumar" },
    },
    {
      id: "r2",
      roomNumber: "102",
      floor: "Ground",
      roomType: "double",
      capacity: 2,
      rent: 4000,
      area: 150,
      furnishing: "semi-furnished",
      status: "occupied",
      ac: false,
      balcony: true,
      attachedBathroom: true,
      tenant: { name: "Sneha Reddy" },
    },
    {
      id: "r3",
      roomNumber: "103",
      floor: "Ground",
      roomType: "single",
      capacity: 1,
      rent: 5000,
      area: 110,
      furnishing: "fully-furnished",
      status: "available",
      ac: true,
      balcony: false,
      attachedBathroom: false,
      tenant: null,
    },
    {
      id: "r4",
      roomNumber: "201",
      floor: "1st",
      roomType: "single",
      capacity: 1,
      rent: 6000,
      area: 130,
      furnishing: "fully-furnished",
      status: "available",
      ac: true,
      balcony: true,
      attachedBathroom: true,
      tenant: null,
    },
    {
      id: "r5",
      roomNumber: "202",
      floor: "1st",
      roomType: "triple",
      capacity: 3,
      rent: 3500,
      area: 180,
      furnishing: "unfurnished",
      status: "maintenance",
      ac: false,
      balcony: false,
      attachedBathroom: false,
      tenant: null,
    },
    {
      id: "r6",
      roomNumber: "203",
      floor: "1st",
      roomType: "double",
      capacity: 2,
      rent: 4200,
      area: 155,
      furnishing: "semi-furnished",
      status: "occupied",
      ac: true,
      balcony: true,
      attachedBathroom: true,
      tenant: { name: "Neha Gupta" },
    },
    {
      id: "r7",
      roomNumber: "301",
      floor: "2nd",
      roomType: "single",
      capacity: 1,
      rent: 5800,
      area: 125,
      furnishing: "fully-furnished",
      status: "occupied",
      ac: true,
      balcony: false,
      attachedBathroom: true,
      tenant: { name: "Vikram Mehta" },
    },
    {
      id: "r8",
      roomNumber: "302",
      floor: "2nd",
      roomType: "four",
      capacity: 4,
      rent: 3000,
      area: 200,
      furnishing: "unfurnished",
      status: "available",
      ac: false,
      balcony: true,
      attachedBathroom: false,
      tenant: null,
    },
  ],
  2: [
    {
      id: "r9",
      roomNumber: "101",
      floor: "Ground",
      roomType: "single",
      capacity: 1,
      rent: 6200,
      area: 140,
      furnishing: "fully-furnished",
      status: "occupied",
      ac: true,
      balcony: true,
      attachedBathroom: true,
      tenant: { name: "Priya Sharma" },
    },
    {
      id: "r10",
      roomNumber: "102",
      floor: "Ground",
      roomType: "double",
      capacity: 2,
      rent: 4800,
      area: 160,
      furnishing: "semi-furnished",
      status: "available",
      ac: true,
      balcony: false,
      attachedBathroom: true,
      tenant: null,
    },
    {
      id: "r11",
      roomNumber: "201",
      floor: "1st",
      roomType: "single",
      capacity: 1,
      rent: 5900,
      area: 130,
      furnishing: "fully-furnished",
      status: "occupied",
      ac: true,
      balcony: true,
      attachedBathroom: true,
      tenant: { name: "Divya Nair" },
    },
    {
      id: "r12",
      roomNumber: "202",
      floor: "1st",
      roomType: "triple",
      capacity: 3,
      rent: 3800,
      area: 175,
      furnishing: "unfurnished",
      status: "maintenance",
      ac: false,
      balcony: false,
      attachedBathroom: false,
      tenant: null,
    },
  ],
  3: [
    {
      id: "r13",
      roomNumber: "101",
      floor: "Ground",
      roomType: "single",
      capacity: 1,
      rent: 4500,
      area: 110,
      furnishing: "semi-furnished",
      status: "occupied",
      ac: false,
      balcony: false,
      attachedBathroom: true,
      tenant: { name: "Rahul Verma" },
    },
    {
      id: "r14",
      roomNumber: "102",
      floor: "Ground",
      roomType: "double",
      capacity: 2,
      rent: 3800,
      area: 145,
      furnishing: "unfurnished",
      status: "available",
      ac: false,
      balcony: true,
      attachedBathroom: false,
      tenant: null,
    },
    {
      id: "r15",
      roomNumber: "201",
      floor: "1st",
      roomType: "single",
      capacity: 1,
      rent: 4800,
      area: 120,
      furnishing: "fully-furnished",
      status: "available",
      ac: true,
      balcony: false,
      attachedBathroom: true,
      tenant: null,
    },
  ],
};

const RoomsList = () => {
  const { propertyId } = useParams(); // /rooms/property/:propertyId
  const navigate = useNavigate();

  const property = MOCK_PROPERTIES[propertyId] || MOCK_PROPERTIES["1"];
  const [rooms, setRooms] = useState(MOCK_ROOMS[propertyId] || MOCK_ROOMS["1"]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const [showRoomForm, setShowRoomForm] = useState(false);
  const [editRoom, setEditRoom] = useState(null);

  /* ── filtering ── */
  const filtered = rooms.filter((r) => {
    const matchSearch =
      r.roomNumber.includes(search) ||
      r.floor.toLowerCase().includes(search.toLowerCase()) ||
      (r.tenant?.name || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    const matchType = typeFilter === "all" || r.roomType === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  /* ── aggregated stats ── */
  const stats = {
    total: rooms.length,
    occupied: rooms.filter((r) => r.status === "occupied").length,
    available: rooms.filter((r) => r.status === "available").length,
    maintenance: rooms.filter((r) => r.status === "maintenance").length,
    revenue: rooms
      .filter((r) => r.status === "occupied")
      .reduce((s, r) => s + r.rent, 0),
  };

  /* ── badge variant from status ── */
  const statusVariant = (s) => {
    if (s === "available") return "success";
    if (s === "occupied") return "info";
    if (s === "maintenance") return "warning";
    return "default";
  };

  /* ── card bg tint ── */
  const cardBorder = (s) => {
    if (s === "available") return "border-green-200 dark:border-green-800";
    if (s === "maintenance") return "border-yellow-200 dark:border-yellow-800";
    return "border-gray-200 dark:border-gray-800";
  };

  /* ── handlers ── */
  const handleAdd = (data) => {
    setRooms((prev) => [...prev, data]);
  };
  const handleEdit = (data) => {
    setRooms((prev) => prev.map((r) => (r.id === data.id ? data : r)));
  };

  /* ── render ── */
  return (
    <div className="pb-20 space-y-6 md:pb-6">
      {/* ── header ── */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" icon={ArrowLeft} onClick={() => navigate(-1)} />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            All Rooms
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-0.5">
            {property.name} · {property.address}
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => {
            setEditRoom(null);
            setShowRoomForm(true);
          }}
        >
          Add Room
        </Button>
      </div>

      {/* ── stats row ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {[
          {
            label: "Total",
            value: stats.total,
            color: "text-gray-900 dark:text-gray-100",
          },
          { label: "Occupied", value: stats.occupied, color: "text-blue-600" },
          {
            label: "Available",
            value: stats.available,
            color: "text-green-600",
          },
          {
            label: "Maintenance",
            value: stats.maintenance,
            color: "text-yellow-600",
          },
          {
            label: "Revenue / mo",
            value: formatCurrency(stats.revenue),
            color: "text-primary-600",
          },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {s.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── search + filters ── */}
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="flex-1">
          <Input
            placeholder="Search room number, floor, or tenant…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={Search}
          />
        </div>

        {/* status pills */}
        <div className="flex flex-wrap gap-2">
          {["all", "occupied", "available", "maintenance"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                statusFilter === s
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {s === "all" ? "All Status" : s}
            </button>
          ))}
        </div>

        {/* type pills */}
        <div className="flex flex-wrap gap-2">
          {["all", "single", "double", "triple", "four"].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                typeFilter === t
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {t === "all" ? "All Types" : t}
            </button>
          ))}
        </div>
      </div>

      {/* ── rooms grid ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((room) => (
          <div
            key={room.id}
            className={`bg-white dark:bg-gray-900 border ${cardBorder(room.status)} rounded-xl p-5 hover:shadow-md transition-all cursor-pointer`}
            // onClick={() => navigate(`/${window.location.pathname?.split("/")[1]}/room/${room.id}`)}
          >
            {/* top row: icon + badge */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center justify-center rounded-lg w-11 h-11 bg-gradient-to-br from-primary-600 to-accent-600">
                <BedDouble className="w-5 h-5 text-white" />
              </div>
              <Badge
                variant={statusVariant(room.status)}
                size="sm"
                className="capitalize"
              >
                {room.status}
              </Badge>
            </div>

            {/* room number + floor */}
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Room {room.roomNumber}
            </h3>
            <p className="mb-3 text-xs text-gray-500 capitalize dark:text-gray-400">
              {room.floor} Floor · {room.roomType} · {room.capacity}
              {room.capacity === 1 ? " person" : " persons"}
            </p>

            {/* rent + area */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1">
                <IndianRupee className="w-4 h-4 text-primary-600" />
                <span className="font-semibold text-primary-600">
                  {formatCurrency(room.rent)}
                </span>
                <span className="text-xs text-gray-400">/mo</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {room.area} sq ft
              </span>
            </div>

            {/* feature pills */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {room.ac && (
                <span className="inline-flex items-center gap-1 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                  <Wind className="w-3 h-3" /> AC
                </span>
              )}
              {room.attachedBathroom && (
                <span className="inline-flex items-center gap-1 text-xs bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 px-2 py-0.5 rounded-full">
                  <Droplet className="w-3 h-3" /> Bath
                </span>
              )}
              {room.balcony && (
                <span className="inline-flex items-center gap-1 text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
                  <Home className="w-3 h-3" /> Balcony
                </span>
              )}
            </div>

            {/* tenant strip (only when occupied) */}
            {room.tenant && (
              <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-800">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {room.tenant.name}
                </span>
              </div>
            )}

            {/* action row */}
            <div className="flex gap-2 pt-3 mt-4 border-t border-gray-200 dark:border-gray-800">
              <Button
                variant="outline"
                size="sm"
                icon={Eye}
                fullWidth
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(
                    `/${window.location.pathname?.split("/")[1]}/room/${room.id}`,
                  );
                }}
              >
                View
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon={Edit}
                onClick={(e) => {
                  e.stopPropagation();
                  setEditRoom(room);
                  setShowRoomForm(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── empty state ── */}
      {filtered.length === 0 && (
        <Card>
          <CardContent className="text-center p-14">
            <BedDouble className="mx-auto mb-3 text-gray-300 w-14 h-14 dark:text-gray-600" />
            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
              No rooms match your filters
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Try clearing the search or changing a filter
            </p>
          </CardContent>
        </Card>
      )}

      {/* ── form modal ── */}
      <RoomForm
        isOpen={showRoomForm}
        onClose={() => {
          setShowRoomForm(false);
          setEditRoom(null);
        }}
        onSubmit={editRoom ? handleEdit : handleAdd}
        properties={[{ id: propertyId, name: property.name }]}
        rooms={rooms}
        initialData={editRoom}
      />
    </div>
  );
};

export default RoomsList;
