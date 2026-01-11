<div align="center">

# Walk With Ibrahim | امشِ مع إبراهيم

### A community-built platform to support a scholar's medical journey

[![Live Site](https://img.shields.io/badge/Live-ibrahim.help-166534?style=for-the-badge&logo=vercel)](https://ibrahim-falcon.vercel.app)
[![Built with Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge)](CONTRIBUTING.md)

[View Live Site](https://ibrahim-falcon.vercel.app) · [Report Bug](https://github.com/KJfamily33/ibrahim/issues) · [Request Feature](https://github.com/KJfamily33/ibrahim/issues)

</div>

---

## The Story | القصة

**For 20 years**, Ibrahim Ali served the Muslim Ummah through [islamland.com](https://islamland.com) — translating Islamic texts into **140+ languages**, completely free. He never sought payment. He did it for Allah alone.

**Now he has cancer.** A tumor is blocking his intestines. Libya's hospitals cannot help — they lack equipment and are controlled by militias. He needs surgery in Tunisia.

**The Ummah he served is gathering to carry him.**

> *"Whoever relieves a believer's distress in this world, Allah will relieve his distress on the Day of Resurrection."*
> — Prophet Muhammad ﷺ

---

## What This Project Is

This is an **open-source medical fundraising platform** built to help Ibrahim reach his €20,000 goal for surgery in Tunisia. Unlike typical donation pages, this is an **interactive solidarity experience** where people:

- **Walk with Ibrahim** through his journey stages
- **Sponsor specific needs** (hospital nights, medications, transport)
- **Join the Dua Circle** for collective prayer
- **Track real progress** with live updates

### Features

| Feature | Description |
|---------|-------------|
| 🗺️ **Journey Map** | Visual 5-stage path from Libya to healing |
| 🤲 **Sponsor Grid** | Specific items people can claim (€15-€500) |
| 📿 **Dua Circle** | Collective prayer tracking |
| 🕌 **Prayer Times** | Live prayer times with Hijri date |
| 📄 **Document Gallery** | Verified medical & identity documents |
| 🌍 **Bilingual** | Full Arabic (RTL) and English support |
| 📱 **Mobile-First** | Designed for WhatsApp sharing |

---

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) with App Router
- **Styling:** [Tailwind CSS](https://tailwindcss.com) with custom Islamic theme
- **Components:** [Radix UI](https://radix-ui.com) primitives
- **Icons:** [Lucide React](https://lucide.dev)
- **Deployment:** [Vercel](https://vercel.com)
- **Package Manager:** pnpm

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)

### Installation

```bash
# Clone the repository
git clone https://github.com/KJfamily33/ibrahim.git
cd ibrahim

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build for Production

```bash
pnpm build
pnpm start
```

---

## Project Structure

```
ibrahim/
├── app/
│   ├── page.tsx          # Main page with all sections
│   ├── layout.tsx        # Root layout with fonts
│   └── globals.css       # Global styles & Islamic theme
├── components/
│   ├── falcon-hero.tsx       # Hero section with falcon animation
│   ├── flight-path.tsx       # Journey map timeline
│   ├── sponsor-grid.tsx      # Sponsorship items grid
│   ├── solidarity-dashboard.tsx  # Live stats dashboard
│   ├── dua-circle.tsx        # Prayer circle component
│   ├── prayer-times.tsx      # Live prayer times API
│   ├── document-gallery.tsx  # Medical docs viewer
│   ├── donation-options.tsx  # Payment methods
│   └── ui/                   # Reusable UI components
├── public/
│   └── images/           # Documents, logos, assets
└── hope/                 # Planning docs & strategy
```

---

## Contributing

We welcome contributions! This is a humanitarian project — every improvement helps Ibrahim.

### Ways to Help

| Type | How |
|------|-----|
| 🐛 **Bug Fixes** | Find something broken? [Open an issue](https://github.com/KJfamily33/ibrahim/issues) |
| ✨ **Features** | Check [issues](https://github.com/KJfamily33/ibrahim/issues) for feature requests |
| 🌐 **Translations** | Help improve Arabic or add other languages |
| 🎨 **Design** | UI/UX improvements always welcome |
| 📝 **Documentation** | Help others understand the codebase |
| 📢 **Sharing** | Star the repo, share the site |

### Development Guidelines

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## The Campaign

### Why Libya Can't Help

Libya's banking system has collapsed. Ibrahim cannot even access his own savings. Local hospitals lack equipment and are controlled by militias. Tunisia offers quality care at accessible prices.

### Where Funds Go

| Need | Amount | Status |
|------|--------|--------|
| Surgery | €10,000 | Pending |
| Hospital Stay (14 nights) | €560 | Pending |
| Medications (30 days) | €750 | Pending |
| Accommodation (30 nights) | €1,200 | Pending |
| Transport & Flights | €430 | Pending |
| Pre-op Tests | €500 | Pending |
| **Total** | **€20,000** | **Fundraising** |

### Verification

All medical documents are available in the `/public/images/` directory and displayed on the site. This campaign is coordinated by verified third parties with full transparency.

---

## Roadmap

- [x] Core website with bilingual support
- [x] Journey map visualization
- [x] Sponsor grid with specific items
- [x] Document gallery
- [x] Prayer times integration
- [ ] LaunchGood widget integration
- [ ] Real-time donation tracking
- [ ] Scholar endorsement videos
- [ ] SMS/WhatsApp notifications
- [ ] Multi-currency support

---

## Support the Project

### For Ibrahim

- 🌐 **Visit:** [ibrahim.help](https://ibrahim-falcon.vercel.app)
- 📱 **WhatsApp:** [+218 91-669-5689](https://wa.me/218916695689)
- 📧 **Email:** Abraabre731@gmail.com

### For This Repo

- ⭐ **Star** this repository
- 🍴 **Fork** and contribute
- 📢 **Share** with your network
- 🐛 **Report** bugs and issues

---

## License

This project is open source under the [MIT License](LICENSE). Use it, fork it, improve it — help others help those in need.

---

## Acknowledgments

- Ibrahim Ali for 20 years of service to the Ummah
- [islamland.com](https://islamland.com) for reaching millions
- The open-source community
- Everyone who shares, contributes, and prays

---

<div align="center">

**Built with ❤️ for the Ummah**

*"من أحياها فكأنما أحيا الناس جميعا"*

*"Whoever saves a life, it is as if he has saved all of humanity"* — Quran 5:32

[![Star History](https://img.shields.io/github/stars/KJfamily33/ibrahim?style=social)](https://github.com/KJfamily33/ibrahim)

</div>
