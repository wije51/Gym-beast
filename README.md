# Gym Beast 💪

A cinematic, modern gym website featuring parallax scrolling effects, glassmorphism UI, and a sleek dark theme with warm LED lighting aesthetics.

## Overview

Gym Beast is a premium fitness facility website built with React, TypeScript, Vite, and Tailwind CSS. It showcases a luxury gym experience with:

- **Cinematic Hero Section** with parallax background effects
- **Membership Plans** - Starter, Pro, and Elite tiers
- **Why Choose Us** section highlighting key differentiators
- **Coaching Team** profiles
- **Contact & Social Links** integration
- **Responsive Design** - Mobile, tablet, and desktop optimized
- **Smooth Animations** using Framer Motion
- **Accessibility Features** - Reduced motion support, semantic HTML

## Tech Stack

- **Frontend Framework:** React 19.2.3
- **Language:** TypeScript 5.9.3
- **Build Tool:** Vite 7.2.4
- **Styling:** Tailwind CSS 4.1.17 + Tailwind Merge
- **Animations:** Framer Motion 12.38.0
- **Icons:** Lucide React 1.7.0
- **Routing:** React Router DOM 7.13.2
- **Utilities:** clsx 2.1.1

## Getting Started

### Prerequisites

- Node.js 18+ (with npm)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/wije51/Gym-beast.git
cd Gym-beast

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
gym-beast/
├── src/
│   ├── components/
│   │   └── Navbar.tsx          # Navigation component
│   ├── pages/
│   │   ├── Home.tsx            # Main landing page
│   │   └── Contact.tsx         # Contact & social links page
│   ├── utils/
│   │   └── cn.ts               # Class name utility
│   ├── App.tsx                 # Main app component with routing
│   ├── index.css               # Global styles
│   └── main.tsx                # React DOM entry point
├── public/
│   └── images/                 # Background images for parallax
├── index.html                  # HTML template
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies & scripts
```

## Features

### 🎬 Cinematic Parallax Effects
- Smooth background parallax on scroll
- Scale transforms synchronized with scroll position
- Accessibility-aware (respects prefers-reduced-motion)

### 🎨 Modern UI Components
- **LiquidGlassCard:** Glassmorphic containers with backdrop blur
- **SectionReveal:** In-viewport fade and slide animations
- **Buttons:** Primary and ghost button variants with hover effects
- **CeilingLights:** Decorative geometric lighting overlay

### 📱 Responsive Layout
- Mobile-first design approach
- Grid-based layout system
- Flexible typography scaling

### ♿ Accessibility
- Semantic HTML structure
- ARIA labels on decorative elements
- Reduced motion support via Framer Motion
- Color contrast compliance

## Usage

### Adding New Content

1. **Update Plans:** Edit the `planItems` array in [Home.tsx](src/pages/Home.tsx)
2. **Update Coaches:** Modify the coach names array in the COACHES section
3. **Update Contact Links:** Edit the `LINKS` array in [Contact.tsx](src/pages/Contact.tsx)
4. **Update Images:** Add images to `public/images/` and reference them in ParallaxSections

### Customizing Styles

- Global styles: [index.css](src/index.css)
- Tailwind config: Inherits from `tailwindcss.config.ts` (auto-loaded by `@tailwindcss/vite`)
- Component-level: Use Tailwind classes directly in components

## Environment Variables

Currently no environment variables are required. For future API integration, create a `.env` file:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_CONTACT_EMAIL=contact@gymbeast.example
```

Then access via `import.meta.env.VITE_API_BASE_URL`

## Security Considerations

### File Upload Safety ⚠️

**This project does NOT currently handle file uploads.** However, if you plan to add user-generated content uploading:

#### Prevention Measures:

1. **Server-Side Validation (Critical)**
   ```typescript
   // Never validate on client-side only
   // Always validate on your backend:
   - File size limits (e.g., max 10MB)
   - Whitelist allowed MIME types (e.g., image/jpeg, image/png)
   - Validate file magic bytes/signatures (not just extension)
   - Scan with antivirus/malware detection
   ```

2. **Filename Sanitization**
   ```typescript
   // Remove special characters, path traversal attempts
   const safeFilename = filename
     .replace(/[^a-zA-Z0-9._-]/g, '')
     .replace(/\.\./g, '');
   ```

3. **Store Files Securely**
   - Store uploads OUTSIDE the web root
   - Use a CDN or cloud storage (AWS S3, Cloudflare R2, etc.)
   - Generate random filenames instead of user-provided names
   - Set `Content-Disposition: attachment` headers

4. **Prevent Script Execution**
   - Disable script execution in upload directories
   - Use `.htaccess` (Apache) or nginx config to prevent script execution:
   ```apache
   <FilesMatch "\.php$|\.exe$|\.sh$">
     Deny from all
   </FilesMatch>
   ```

5. **Content-Type Headers**
   ```typescript
   // Always set correct mime types on responses
   res.setHeader('Content-Type', 'image/jpeg');
   res.setHeader('X-Content-Type-Options', 'nosniff');
   ```

6. **Virus/Malware Scanning**
   - Integrate ClamAV or VirusTotal API
   - Scan ALL uploaded files before serving

7. **Rate Limiting**
   - Prevent abuse with upload rate limits
   - Use packages like `express-rate-limit`

### General Security Best Practices

- ✅ Keep dependencies updated: `npm audit` and `npm update`
- ✅ Use HTTPS in production
- ✅ Set security headers (CSP, X-Frame-Options, etc.)
- ✅ Sanitize user input before display
- ✅ Use environment variables for sensitive data
- ✅ Regular security audits
- ✅ Monitor for vulnerabilities with Dependabot (enabled on GitHub)

## Performance Optimization

- Vite's fast HMR for development
- Tree-shaking removes unused code
- CSS minification via Tailwind
- Image optimization (reference images in `public/`)
- Code splitting via Vite's async imports

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### Tailwind styles not applying
- Ensure `src/**/*.{tsx,jsx,ts,js}` files exist in `tailwind.config.ts` content
- Restart dev server after config changes

### Images not showing
- Verify image paths in `public/images/`
- Use relative paths starting with `/images/`

## Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## License

MIT License - See LICENSE file for details

## Contact

- **Email:** hello@gymbeast.example
- **Location:** Dambulla, Sri Lanka
- **GitHub:** https://github.com/wije51/Gym-beast

---

**Built with ❤️ for fitness enthusiasts who appreciate cinematic design.**
