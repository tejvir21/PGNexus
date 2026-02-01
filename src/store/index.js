import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      userRole: null, // 'admin' | 'owner' | 'tenant'

      login: (userData) =>
        set({
          user: userData,
          isAuthenticated: true,
          userRole: userData.role,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          userRole: null,
        }),

      updateUser: (userData) =>
        set((state) => ({
          user: { ...state.user, ...userData },
        })),
    }),
    {
      name: "auth-storage",
    },
  ),
);

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: "blue", // 'blue' | 'purple' | 'green' | 'orange'
      isDarkMode: false,

      setTheme: (theme) => {
        set({ theme });
        document.documentElement.setAttribute("data-theme", theme);
      },

      toggleDarkMode: () =>
        set((state) => {
          const newMode = !state.isDarkMode;
          if (newMode) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
          return { isDarkMode: newMode };
        }),

      initializeTheme: () => {
        const stored = useThemeStore.getState();
        document.documentElement.setAttribute("data-theme", stored.theme);
        if (stored.isDarkMode) {
          document.documentElement.classList.add("dark");
        }
      },
    }),
    {
      name: "theme-storage",
    },
  ),
);

export const usePGStore = create((set) => ({
  properties: [],
  rooms: [],
  tenants: [],
  payments: [],
  complaints: [],
  notices: [],

  setProperties: (properties) => set({ properties }),
  addProperty: (property) =>
    set((state) => ({
      properties: [...state.properties, property],
    })),
  updateProperty: (id, data) =>
    set((state) => ({
      properties: state.properties.map((p) =>
        p.id === id ? { ...p, ...data } : p,
      ),
    })),
  deleteProperty: (id) =>
    set((state) => ({
      properties: state.properties.filter((p) => p.id !== id),
    })),

  setRooms: (rooms) => set({ rooms }),
  addRoom: (room) => set((state) => ({ rooms: [...state.rooms, room] })),
  updateRoom: (id, data) =>
    set((state) => ({
      rooms: state.rooms.map((r) => (r.id === id ? { ...r, ...data } : r)),
    })),

  setTenants: (tenants) => set({ tenants }),
  addTenant: (tenant) =>
    set((state) => ({ tenants: [...state.tenants, tenant] })),
  updateTenant: (id, data) =>
    set((state) => ({
      tenants: state.tenants.map((t) => (t.id === id ? { ...t, ...data } : t)),
    })),

  setPayments: (payments) => set({ payments }),
  addPayment: (payment) =>
    set((state) => ({ payments: [...state.payments, payment] })),

  setComplaints: (complaints) => set({ complaints }),
  addComplaint: (complaint) =>
    set((state) => ({
      complaints: [...state.complaints, complaint],
    })),
  updateComplaint: (id, data) =>
    set((state) => ({
      complaints: state.complaints.map((c) =>
        c.id === id ? { ...c, ...data } : c,
      ),
    })),

  setNotices: (notices) => set({ notices }),
  addNotice: (notice) =>
    set((state) => ({ notices: [...state.notices, notice] })),
}));

export const useUIStore = create((set) => ({
  isMobileMenuOpen: false,
  activeModal: null,
  sidebarCollapsed: false,

  toggleMobileMenu: () =>
    set((state) => ({
      isMobileMenuOpen: !state.isMobileMenuOpen,
    })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  openModal: (modalName) => set({ activeModal: modalName }),
  closeModal: () => set({ activeModal: null }),

  toggleSidebar: () =>
    set((state) => ({
      sidebarCollapsed: !state.sidebarCollapsed,
    })),
}));
