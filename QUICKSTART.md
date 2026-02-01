# 🚀 Quick Start Guide - PG Nexus

Get up and running in 5 minutes!

## ⚡ Installation (2 minutes)

```bash
# Navigate to project
cd pg-management-system

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🌐 Access the App

Open your browser and go to:
```
http://localhost:5173
```

## 🔐 Login

Use these demo credentials:

| Role   | Email                  | Password |
|--------|------------------------|----------|
| Admin  | admin@pgnexus.com     | password |
| Owner  | owner@pgnexus.com     | password |
| Tenant | tenant@pgnexus.com    | password |

## 🎨 Try These Features

### 1. Change Theme
- Click the **palette icon** (🎨) in the navbar
- Choose: Blue, Purple, Green, or Orange

### 2. Toggle Dark Mode
- Click the **moon/sun icon** in the navbar
- Watch the entire app change!

### 3. Switch Roles
- Logout from current role
- Login with different credentials
- See role-specific dashboards

### 4. Test Responsive Design
- Resize browser window
- Notice navigation changes at 768px
- Mobile: Bottom navigation
- Desktop: Top navigation

## 📂 Important Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main routing |
| `src/store/index.js` | State management |
| `src/pages/*/Dashboard.jsx` | Role dashboards |
| `src/components/common/*` | Reusable components |
| `tailwind.config.js` | Theme configuration |

## 🎯 What You Can Do Now

### Admin Role
- ✅ View all properties
- ✅ Monitor tenants
- ✅ Track revenue
- ✅ Manage complaints

### Owner Role
- ✅ Manage properties
- ✅ Track rooms
- ✅ View tenants
- ✅ Monitor payments

### Tenant Role
- ✅ View room details
- ✅ See payment history
- ✅ Raise complaints
- ✅ Read notices

## 🛠️ Common Commands

```bash
# Development
npm run dev           # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Troubleshooting
rm -rf node_modules  # Delete dependencies
npm install          # Reinstall
```

## 📱 Test on Mobile

### Using Chrome DevTools
1. Press `F12` to open DevTools
2. Click the **device icon** (📱) to toggle device toolbar
3. Select a mobile device from dropdown
4. Refresh the page
5. See mobile navigation at bottom!

### Using Real Device
1. Find your IP address:
   ```bash
   # Mac/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```

2. Start with host flag:
   ```bash
   npm run dev -- --host
   ```

3. Access from phone:
   ```
   http://YOUR_IP:5173
   ```

## 🎨 Customize

### Change Primary Color
Edit `src/styles/globals.css`:
```css
:root {
  --color-primary-600: 37 99 235;  /* Change these RGB values */
}
```

### Add New Page
1. Create file in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation in `BottomNav.jsx`

### Modify Logo
Edit `src/components/common/Navbar.jsx`:
```jsx
<span className="text-xl font-bold">
  Your App Name
</span>
```

## ❓ Need Help?

### Documentation
- 📖 Full docs: `README.md`
- 🔧 Setup guide: `SETUP_GUIDE.md`
- ✨ Features: `FEATURES.md`

### Common Issues

**Port in use?**
```bash
npm run dev -- --port 3000
```

**Styles not working?**
```bash
# Restart server
Ctrl + C
npm run dev
```

**Changes not reflecting?**
- Save file (Ctrl/Cmd + S)
- Check terminal for errors
- Hard refresh (Ctrl/Cmd + Shift + R)

## 🎉 You're Ready!

The app is now running. Here's what to explore:

1. ✅ Login with different roles
2. ✅ Try all theme colors
3. ✅ Toggle dark mode
4. ✅ Test on mobile
5. ✅ Explore dashboards

## 📞 Next Steps

- Read `FEATURES.md` for complete feature list
- Check `SETUP_GUIDE.md` for detailed setup
- Start customizing for your needs
- Add backend API integration
- Deploy to production

---

**Happy coding! 🚀**

Need more help? Check the other documentation files in the project root.
