# PG Nexus - Create React App Version

A comprehensive PG (Paying Guest) management system built with **Create React App**, Zustand, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🔐 Demo Login Credentials

| Role   | Email                  | Password |
|--------|------------------------|----------|
| Admin  | admin@pgnexus.com     | password |
| Owner  | owner@pgnexus.com     | password |
| Tenant | tenant@pgnexus.com    | password |

## ✨ Features

### 🎨 Design & UI
- **Dynamic Theme System**: 4 color themes (Blue, Purple, Green, Orange)
- **Dark Mode Support**: Toggle between light and dark modes
- **Responsive Design**: Desktop top nav + mobile bottom nav
- **Modern Animations**: Smooth transitions
- **Professional Components**: Built with best practices

### 👥 Three User Roles

#### Admin
- View all properties and statistics
- Manage tenants system-wide
- Track payments and revenue
- Handle complaints

#### Owner
- Multi-property management
- Room and tenant management
- Rent collection tracking
- Maintenance requests

#### Tenant
- View room details
- Payment history
- Raise complaints
- View notices

## 📁 Project Structure

```
src/
├── components/
│   └── common/          # Reusable components
├── pages/
│   ├── auth/           # Login, Signup
│   ├── admin/          # Admin dashboard
│   ├── owner/          # Owner dashboard
│   └── tenant/         # Tenant dashboard
├── store/              # Zustand state management
├── utils/              # Helper functions
├── styles/             # Global CSS
└── App.js              # Main app component
```

## 🛠️ Available Scripts

### `npm start`
Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run eject`
**Note: this is a one-way operation!**

## 🎨 Theme System

Change themes via the palette icon in the navbar:
- Blue (Default)
- Purple
- Green
- Orange

All themes support dark mode!

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (bottom navigation)
- **Desktop**: ≥ 768px (top navigation)

## 🔧 Customization

### Change Primary Color

Edit `src/styles/index.css`:
```css
:root {
  --color-primary-600: 37 99 235;  /* Your RGB values */
}
```

### Add New Theme

1. Add theme colors in `src/styles/index.css`
2. Add theme option in `src/components/common/Navbar.js`

### Add New Page

1. Create component in `src/pages/`
2. Add route in `src/App.js`
3. Add navigation in `src/components/common/BottomNav.js`

## 📦 Dependencies

### Core
- react ^18.2.0
- react-dom ^18.2.0
- react-router-dom ^6.22.0
- react-scripts ^5.0.1

### State Management
- zustand ^4.5.0

### UI & Styling
- tailwindcss ^3.4.1
- lucide-react ^0.344.0
- clsx ^2.1.0
- tailwind-merge ^2.2.1

### Utilities
- date-fns ^3.3.1

## 🚧 Common Issues

### Port Already in Use

If port 3000 is busy:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Or set different port
PORT=3001 npm start
```

### Styles Not Applying

1. Restart development server
2. Clear browser cache (Ctrl+Shift+R)
3. Check `tailwind.config.js` exists

### Module Not Found

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🎯 Next Steps

### Phase 1 - Complete CRUD
- [ ] Property management (add/edit/delete)
- [ ] Room management
- [ ] Tenant onboarding
- [ ] Payment processing

### Phase 2 - Advanced Features
- [ ] Payment gateway integration
- [ ] Email/SMS notifications
- [ ] PDF report generation
- [ ] Document management

### Phase 3 - Analytics
- [ ] Revenue charts
- [ ] Occupancy trends
- [ ] Payment analytics
- [ ] Custom reports

## 🔐 State Management (Zustand)

```javascript
import { useAuthStore, useThemeStore, usePGStore } from './store';

// Auth
const { user, login, logout } = useAuthStore();

// Theme
const { theme, setTheme, toggleDarkMode } = useThemeStore();

// PG Data
const { properties, tenants, addProperty } = usePGStore();
```

## 🎓 Learn More

- [Create React App documentation](https://create-react-app.dev/)
- [React documentation](https://react.dev/)
- [Zustand documentation](https://github.com/pmndrs/zustand)
- [Tailwind CSS documentation](https://tailwindcss.com/)

## 📄 License

MIT License - Free to use for personal or commercial projects

## 🙏 Support

Having issues? Check:
1. Node.js version (should be 14+)
2. npm version (should be 6+)
3. All dependencies installed correctly

## 🎉 Success Checklist

- [x] Installed dependencies
- [x] Started dev server
- [x] Opened http://localhost:3000
- [x] Logged in successfully
- [x] Switched themes
- [x] Toggled dark mode
- [x] Tested mobile view

---

**Built with ❤️ using Create React App + Tailwind CSS**
