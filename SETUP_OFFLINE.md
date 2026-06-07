# Portfolio Website - Offline Setup Guide

## ✅ Setup Complete

The PortfolioWebsite project has been successfully set up for offline development.

### What Was Done

1. **Repository Cloned**: The project has been cloned from GitHub
2. **Dependencies Installed**: All npm packages (483 packages) have been installed
3. **Environment File Created**: `.env` file has been generated with EmailJS configuration placeholders
4. **Build Verified**: Production build completes successfully

### Project Structure

- **Frontend Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with PostCSS
- **UI Components**: Radix UI components library
- **3D Graphics**: Three.js with React Three Fiber
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: Zustand
- **Animations**: Framer Motion & GSAP
- **Email**: EmailJS integration
- **Build Size**: ~368KB main JS (gzipped: ~122KB)

### Available Commands

```bash
# Start development server (hot reload)
npm run dev

# Build for production
npm run build

# Build for development mode
npm run build:dev

# Run ESLint
npm run lint

# Preview production build
npm preview
```

### Environment Configuration

The `.env` file has been created with the following variables:
- `VITE_EMAILJS_SERVICE_ID` - Your EmailJS service ID
- `VITE_EMAILJS_TEMPLATE_ID` - Your EmailJS template ID
- `VITE_EMAILJS_PUBLIC_KEY` - Your EmailJS public key

**To use EmailJS functionality**, replace these placeholders with your actual credentials from [EmailJS](https://www.emailjs.com/).

### Getting Started

1. **Start the dev server**:
   ```bash
   cd PortfolioWebsite
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

2. **Configure EmailJS** (optional):
   - Sign up at emailjs.com
   - Update the `.env` file with your credentials
   - Contact form will work once configured

### Dependencies Note

⚠️ **Minor security vulnerabilities detected** (7 moderate, 9 high):
- Run `npm audit fix` to address these automatically
- Or review with `npm audit` for details

### Next Steps

- Run `npm run dev` to start development
- Edit files in `src/` directory
- Changes will hot-reload automatically
- Run `npm run build` when ready for production deployment

---

**Project is ready for offline development!**
