# PG Nexus - Create React App Setup Guide

## 🚀 Installation (5 Minutes)

### Step 1: Check Requirements

```bash
node --version   # Should be 14.0.0 or higher
npm --version    # Should be 6.0.0 or higher
```

If not installed, download from [nodejs.org](https://nodejs.org/)

### Step 2: Navigate to Project

```bash
cd pg-nexus-cra
```

### Step 3: Install Dependencies

```bash
npm install
```

This will install:
- React & React DOM
- React Router
- Zustand (state management)
- Tailwind CSS
- Lucide React (icons)
- And more...

**Wait time**: 2-5 minutes

### Step 4: Start Development Server

```bash
npm start
```

**Expected output:**
```
Compiled successfully!

You can now view pg-nexus in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

### Step 5: Open in Browser

The app should automatically open at `http://localhost:3000`

If not, manually open your browser and go to that URL.

## 🎯 First Steps After Installation

### 1. Login

Use these demo credentials:

| Role   | Email                | Password |
|--------|----------------------|----------|
| Admin  | admin@pgnexus.com   | password |
| Owner  | owner@pgnexus.com   | password |
| Tenant | tenant@pgnexus.com  | password |

### 2. Try Theme Changes

- Click the **palette icon** (🎨) in the top navbar
- Select different colors: Blue, Purple, Green, Orange
- See the entire app change color!

### 3. Toggle Dark Mode

- Click the **moon/sun icon** in the navbar
- Watch the theme switch!
- Your preference is saved automatically

### 4. Test Mobile View

**Using Chrome DevTools:**
1. Press `F12` (or right-click → Inspect)
2. Click the **device icon** (📱) in the toolbar
3. Select a mobile device (e.g., iPhone 12)
4. See the bottom navigation appear!

## 📂 Project Structure

```
pg-nexus-cra/
├── public/
│   └── index.html           # HTML template
├── src/
│   ├── components/
│   │   └── common/         # Reusable UI components
│   ├── pages/
│   │   ├── auth/           # Login & Signup
│   │   ├── admin/          # Admin dashboard
│   │   ├── owner/          # Owner dashboard
│   │   └── tenant/         # Tenant dashboard
│   ├── store/
│   │   └── index.js        # Zustand stores
│   ├── utils/
│   │   └── helpers.js      # Helper functions
│   ├── styles/
│   │   └── index.css       # Global styles + Tailwind
│   ├── App.js              # Main app with routing
│   └── index.js            # Entry point
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
└── README.md               # Documentation
```

## 🎨 Understanding the Code

### Components

All reusable components are in `src/components/common/`:
- `Button.js` - Buttons with variants
- `Input.js` - Form inputs
- `Card.js` - Container cards
- `Modal.js` - Popup modals
- `Navbar.js` - Top navigation
- `BottomNav.js` - Mobile navigation
- And more...

### Pages

Each user role has their own folder:
- `src/pages/admin/` - Admin pages
- `src/pages/owner/` - Owner pages
- `src/pages/tenant/` - Tenant pages
- `src/pages/auth/` - Login & Signup

### State Management

Zustand stores in `src/store/index.js`:

```javascript
// Auth Store - User authentication
export const useAuthStore = create(...)

// Theme Store - Colors & dark mode
export const useThemeStore = create(...)

// PG Store - Properties, tenants, etc.
export const usePGStore = create(...)
```

### Styling

- Main styles: `src/styles/index.css`
- Tailwind config: `tailwind.config.js`
- Theme colors defined with CSS variables

## 🔧 Common Commands

```bash
# Start development server
npm start

# Create production build
npm run build

# Run tests
npm test

# Start from scratch
rm -rf node_modules package-lock.json
npm install
npm start
```

## ❌ Troubleshooting

### Issue 1: Port 3000 Already in Use

**Solution:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm start
```

### Issue 2: Module Not Found Errors

**Solution:**
```bash
# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 3: Styles Not Working

**Solution:**
1. Check `tailwind.config.js` exists
2. Check `src/styles/index.css` is imported in `src/index.js`
3. Restart the dev server (Ctrl+C then `npm start`)
4. Hard refresh browser (Ctrl+Shift+R)

### Issue 4: Blank Page

**Solution:**
1. Open browser console (F12)
2. Check for errors in Console tab
3. Common fix: Clear cache and hard reload
4. Check `src/index.js` renders to div with id="root"

### Issue 5: Changes Not Showing

**Solution:**
1. Save the file (Ctrl+S)
2. Check terminal for compilation errors
3. Wait for "Compiled successfully!" message
4. Refresh browser if needed

## 🎯 Next Steps

### 1. Explore the App

- [x] Login with all three roles
- [x] Check each dashboard
- [x] Try all theme colors
- [x] Test dark mode
- [x] View on mobile size

### 2. Customize

- [ ] Change app name in `public/index.html`
- [ ] Update logo in `src/components/common/Navbar.js`
- [ ] Modify theme colors in `src/styles/index.css`
- [ ] Add your own pages

### 3. Add Backend

- [ ] Create API endpoints
- [ ] Connect to database
- [ ] Replace mock data with API calls
- [ ] Add authentication

### 4. Deploy

- [ ] Build: `npm run build`
- [ ] Deploy to Vercel/Netlify
- [ ] Set up environment variables
- [ ] Configure custom domain

## 📚 Learn More

### Documentation

- [Create React App Docs](https://create-react-app.dev/)
- [React Docs](https://react.dev/)
- [React Router Docs](https://reactrouter.com/)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Tailwind CSS Docs](https://tailwindcss.com/)

### Video Tutorials

Search YouTube for:
- "Create React App tutorial"
- "React Router tutorial"
- "Zustand tutorial"
- "Tailwind CSS crash course"

## 💡 Pro Tips

### Development

1. **Hot Reload**: Changes auto-refresh the browser
2. **Console**: Keep browser console open (F12) to see errors
3. **Terminal**: Watch for compilation messages
4. **Extensions**: Install React DevTools browser extension

### VS Code Extensions

Recommended:
- ES7+ React/Redux snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- Auto Rename Tag
- Path Intellisense

### Keyboard Shortcuts

- `Ctrl/Cmd + S` - Save file
- `Ctrl/Cmd + P` - Quick file search
- `Ctrl/Cmd + /` - Toggle comment
- `Alt + Shift + F` - Format document

## ✅ Success Checklist

After setup, you should be able to:

- [x] Run `npm start` without errors
- [x] See login page at http://localhost:3000
- [x] Login successfully
- [x] Navigate to dashboard
- [x] Switch between themes
- [x] Toggle dark mode
- [x] See mobile navigation on small screens

## 🎉 You're All Set!

Your PG Management System is now running!

### What You Have:
✅ Complete React application
✅ Three role-based dashboards
✅ Dynamic theme system
✅ Dark mode
✅ Responsive design
✅ Professional components
✅ Clean code structure

### What to Build Next:
🔨 Backend API
🔨 Database integration
🔨 Real authentication
🔨 Payment processing
🔨 File uploads
🔨 Notifications

---

**Need help? Check README.md or open an issue on GitHub!**

**Happy Coding! 🚀**
