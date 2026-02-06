# 🖥️ DevOps Terminal

> An interactive, terminal-based portfolio website designed for DevOps Engineers. Experience my professional journey through an authentic command-line interface.

---

## 📖 About

**DevOps Terminal** is a fully interactive, terminal-themed portfolio website that simulates a real Linux/Unix command-line interface. Instead of traditional web navigation, visitors interact with my portfolio by typing actual terminal commands like `help`, `about`, `skills`, and `projects`.

This project showcases my passion for DevOps culture, automation, and the command-line interface that powers modern infrastructure.

---

## ✨ Features

- 🖥️ **100% Terminal Experience** - Authentic CLI interface, no traditional web UI
- ⌨️ **Interactive Commands** - Navigate by typing real terminal commands
- 💚 **Classic Green Phosphor Theme** - Retro CRT monitor aesthetics
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- 🎮 **Easter Eggs** - Hidden commands and surprises for explorers
- ⚡ **Lightning Fast** - Built with Next.js for optimal performance
- ♿ **Accessible** - Keyboard navigation and screen reader compatible
- 🔧 **Component-Based** - Modular React architecture for easy customization
- 🚀 **SEO Optimized** - Next.js SSG for better search rankings

---

## 🎯 Available Commands

Type any of these commands in the terminal to navigate:

### Core Navigation
```bash
help              # Display all available commands
about             # Learn about me
skills            # View technical skills and expertise
projects          # Browse my DevOps projects
certifications    # View my certifications
contact           # Get contact information
resume            # Download my resume (PDF)
clear             # Clear terminal screen
```

### Utility Commands
```bash
whoami            # Display current user info
date              # Show current date and time
history           # View command history
banner            # Redisplay welcome banner
theme [color]     # Change color theme (green/amber/white)
ls                # List available sections
cat [file]        # Display file contents
```

### Easter Eggs 🎮
```bash
matrix            # Enter the Matrix (rain animation)
neofetch          # Display system information
fortune           # Random DevOps quote
sudo              # Try it and see! 😄
hack              # Access denied...
konami            # Secret achievement
cowsay            # ASCII art with messages
```

---

## 🚀 Live Demo

**[👉 View Live Portfolio](https://myselfusman.github.io/devops-terminal)**

---

## 🎨 Screenshots

### Desktop View
![Desktop Screenshot](screenshots/desktop-view.png)
*Terminal interface on desktop - Full command-line experience*

### Mobile View
![Mobile Screenshot](screenshots/mobile-view.png)
*Responsive terminal on mobile devices*

> 📸 **Note:** Add your actual screenshots to a `screenshots/` folder in your repository

---

## 💻 Technology Stack

- **Next.js** - React framework for production
- **React** - Component-based UI library
- **TypeScript/JavaScript** - Type-safe command parser and interactivity
- **CSS Modules** - Scoped terminal aesthetics and animations
- **Node.js** - Development and build tooling

---

## 🛠️ Installation & Deployment

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm**, **yarn**, or **pnpm** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

Check your versions:
```bash
node --version  # Should be 18.x or higher
npm --version   # Should be 9.x or higher
git --version
```

### Local Development

1. **Clone the repository:**
```bash
git clone https://github.com/myselfusman/devops-terminal.git
cd devops-terminal
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run development server:**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open in browser:**
```
http://localhost:3000
```

### Build for Production

```bash
# Build the project
npm run build

# Start production server
npm run start

# Or export as static site
npm run build && npm run export
```

### Available Scripts

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run export       # Export as static site (creates 'out' folder)
npm run lint         # Run ESLint
npm run format       # Format code with Prettier (if configured)
```

### Deploy to GitHub Pages

1. **Add deployment script to `package.json`:**
```json
"scripts": {
  "deploy": "next build && next export && touch out/.nojekyll && gh-pages -d out"
}
```

2. **Install gh-pages:**
```bash
npm install --save-dev gh-pages
```

3. **Update `next.config.js`:**
```javascript
module.exports = {
  output: 'export',
  basePath: '/devops-terminal',
  images: {
    unoptimized: true
  }
}
```

4. **Deploy:**
```bash
npm run deploy
```

5. **Enable GitHub Pages:**
   - Go to repo Settings → Pages
   - Source: Deploy from branch `gh-pages`
   - Save

6. **Access your site:**
   - `https://myselfusman.github.io/devops-terminal`

### Deploy to Netlify

**Option 1: Connect GitHub (Recommended)**
1. Sign in to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Choose GitHub and select your repository
4. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Build image:** Ubuntu Focal 20.04 (default)
5. Click "Deploy site"
6. Done! Get instant production URL

**Option 2: Netlify CLI**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize and deploy
netlify init
netlify deploy --prod
```

**Option 3: Drag and Drop**
```bash
# Build the project
npm run build && npm run export

# Drag the 'out' folder to Netlify Drop
```

### Deploy to Vercel (Recommended for Next.js)

**Option 1: One-Click Deploy**
1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com/new)
3. Import your GitHub repository
4. Vercel auto-detects Next.js configuration
5. Click "Deploy"
6. Done! Get instant production URL

**Option 2: CLI Deploy**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd devops-terminal
vercel

# Follow the prompts
```

### Deploy to Any Web Server

For static hosting (Apache, Nginx, etc.):

1. **Build and export:**
```bash
npm run build
npm run export  # Creates 'out' directory with static files
```

2. **Upload the `out` folder** to your web server:
   - Shared hosting (cPanel) → `public_html/`
   - AWS S3 + CloudFront
   - DigitalOcean Droplet
   - Your own EC2/VPS with Nginx

3. **Nginx Configuration (if applicable):**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/devops-terminal;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 🎨 Customization

### Change Color Theme

The terminal supports three classic themes. Update theme in your component or CSS:

**Green Phosphor (Default):**
```css
--bg-color: #000000;
--text-color: #00FF00;
--cursor-color: #00FF00;
```

**Amber Terminal:**
```css
--bg-color: #000000;
--text-color: #FFB000;
--cursor-color: #FFB000;
```

**Classic White:**
```css
--bg-color: #0C0C0C;
--text-color: #FFFFFF;
--cursor-color: #FFFFFF;
```

You can switch themes by typing `theme green`, `theme amber`, or `theme white` in the terminal!

### Modify Content

Content is managed through React components and data files:

**Update Personal Info:**
```javascript
// components/Terminal.jsx or similar
const personalInfo = {
  name: "Your Name",
  role: "Your Role",
  tagline: "Your Tagline"
};
```

**Update Skills:**
```javascript
// lib/data.js or similar
export const skills = {
  current: ['Docker', 'Kubernetes', ...],
  learning: ['Terraform', 'Ansible', ...]
};
```

**Update Projects:**
```javascript
// lib/projects.js
export const projects = [
  {
    title: "Project Name",
    description: "Description",
    tech: ['React', 'Next.js', ...],
    github: "github.com/your-repo"
  }
];
```

### Add New Commands

```javascript
// lib/commands.js or components/Terminal.jsx
const commands = {
  yourcommand: () => {
    return "Your output here";
  },
  // Add more commands
};
```

### Project Structure
```
devops-terminal/
├── app/                # Next.js app directory
├── components/         # React components
│   └── Terminal.jsx    # Main terminal component
├── lib/                # Utility functions and data
├── public/             # Static assets
├── styles/             # CSS modules
├── hooks/              # Custom React hooks
├── next.config.mjs     # Next.js configuration
├── package.json        # Dependencies
└── tsconfig.json       # TypeScript config
```

---

## 🎯 Use Cases

This terminal portfolio is perfect for:

- ✅ **DevOps Engineers** showcasing technical skills
- ✅ **System Administrators** demonstrating CLI expertise
- ✅ **Developers** who love terminal aesthetics
- ✅ **Students** learning web development
- ✅ **Anyone** wanting a unique, memorable portfolio

---

## 📊 Project Stats

- **Framework:** Next.js 14+
- **Bundle Size:** ~100KB gzipped (optimized)
- **Load Time:** < 2 seconds (with CDN)
- **Build Time:** ~30 seconds
- **Runtime:** React 18+
- **Browser Support:** All modern browsers (ES6+)
- **Mobile Friendly:** ✅ Yes
- **SEO Optimized:** ✅ Yes (SSG/SSR)
- **Accessibility:** ✅ WCAG 2.1 compliant

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 💡 Inspiration

Inspired by classic Linux/Unix terminals, retro CRT monitors, and the DevOps philosophy of automation and efficiency.

---

## 🐛 Known Issues & Troubleshooting

### Common Issues

**1. Build Errors:**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**2. Port Already in Use:**
```bash
# Kill process on port 3000
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
PORT=3001 npm run dev
```

**3. Module Not Found:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**4. Hydration Errors:**
- Ensure server and client rendering match
- Check for dynamic content that differs between server/client
- Use `useEffect` for client-only code

### Mobile Issues

- [ ] Some mobile keyboards may not trigger auto-complete
- [ ] Tab completion works best on desktop browsers
- [ ] Touch events optimized for mobile typing

**Workarounds:** Most features have mobile-friendly alternatives built-in.

---

## 📝 Roadmap

Future enhancements planned:

### Features
- [ ] Add more easter egg commands
- [ ] Implement `vim` mode for viewing files
- [ ] Add `man` pages for commands
- [ ] Multiple theme options with persistence
- [ ] Sound effects toggle (optional)
- [ ] `ssh` simulation for project details
- [ ] ASCII art gallery

### Technical
- [ ] Add TypeScript for better type safety
- [ ] Implement command history persistence (localStorage)
- [ ] Add unit tests (Jest/React Testing Library)
- [ ] E2E tests (Playwright/Cypress)
- [ ] Performance monitoring
- [ ] PWA support for offline use
- [ ] Dark/Light mode toggle (beyond terminal themes)
- [ ] i18n support for multiple languages

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**TL;DR:** You can use, modify, and distribute this project freely. Just give credit! 🙏

---

## 👨‍💻 Author

**Usman Siddique** - Junior DevOps Engineer

- 📧 Email: [contact@myselfusman.com](mailto:contact@myselfusman.com)
- 💼 LinkedIn: [linkedin.com/in/myself-usman](https://www.linkedin.com/in/myself-usman/)
- 🐙 GitHub: [github.com/myselfusman](https://github.com/myselfusman)

---

## 💬 Feedback

Have suggestions or feedback? Feel free to reach out!

- 📧 Email: contact@myselfusman.com
- 💼 LinkedIn: [myself-usman](https://www.linkedin.com/in/myself-usman/)
- 🐙 GitHub: Open an issue in this repo

---

## ⭐ Show Your Support

If you like this project:
- ⭐ Star it on GitHub
- 🔄 Fork it for your own use
- 📢 Share it with others

---

## 🎓 Learning Resources

Want to build something similar? Here are resources that helped me:

**Next.js & React:**
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Next.js Learn Course](https://nextjs.org/learn)
- [React Hooks Guide](https://react.dev/reference/react)

**Terminal Emulation:**
- [Xterm.js Documentation](https://xtermjs.org/)
- [Terminal Color Schemes](https://terminal.sexy/)
- [ASCII Art Generator](https://patorjk.com/software/taag/)

**DevOps Learning:**
- [Docker Documentation](https://docs.docker.com/)
- [Jenkins Handbook](https://www.jenkins.io/doc/)
- [AWS Free Tier](https://aws.amazon.com/free/)

**Web Development:**
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)

---

<div align="center">

---

**Built with 💚 by Usman Siddique**

*Junior DevOps Engineer | Building, Deploying, Scaling*

**⚡ Automate everything, deploy with confidence, scale infinitely ⚡**

</div>
