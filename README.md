# 🚀 MYSTRONIUM™ Platform

A comprehensive creator platform for AI-powered content generation, featuring real-time collaboration, secure authentication, and scalable backend infrastructure.

## ✨ Features

- **AI-Powered Content Creation**: Ghostscribe for book writing, Narrata for voice generation
- **Real-Time Collaboration**: Live updates and synchronization
- **Secure Authentication**: Firebase Auth with admin privileges
- **Scalable Backend**: Firebase Firestore, Storage, and Cloud Functions
- **Modern UI/UX**: React 18 + TypeScript + Tailwind CSS
- **Production Ready**: Optimized builds and deployment configurations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project (see setup guide)

### Installation
```bash
# Clone the repository
git clone https://github.com/Gaz-Hub/mystronium-platform.git
cd mystronium-platform

# Install dependencies
npm install

# Set up environment variables
cp env.template .env.local
# Edit .env.local with your Firebase configuration

# Start development server
npm run dev
```

### Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication, Firestore, and Storage
3. Update `.env.local` with your Firebase configuration
4. Deploy security rules: `firebase deploy --only firestore:rules,storage`

## 📁 Project Structure

```
mystronium-platform/
├── src/                    # Source code
│   ├── components/         # React components
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom hooks
│   ├── pages/             # Page components
│   ├── utils/             # Utility functions
│   └── firebase.ts        # Firebase configuration
├── docs/                  # Documentation
├── scripts/               # Setup and utility scripts
├── public/                # Static assets
├── functions/             # Firebase Cloud Functions
└── dist/                  # Production build
```

## 🔧 Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test
```

## 🚀 Deployment

### Netlify (Recommended)
- Connected to GitHub repository
- Automatic deployment on push to main
- Environment variables configured in dashboard

### Firebase Hosting
```bash
firebase login
firebase deploy
```

### Vercel
```bash
vercel --prod
```

## 📚 Documentation

- [Firebase Setup Guide](docs/FIREBASE_SETUP_NOW.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Environment Setup](docs/ENVIRONMENT_SETUP.md)
- [API Documentation](docs/API.md)

## 🔐 Environment Variables

Required environment variables (see `env.template`):
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_DATABASE_URL`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- Check the [documentation](docs/) for detailed guides
- Review [troubleshooting](docs/TROUBLESHOOTING.md) for common issues
- Open an issue for bugs or feature requests

---

**Built with ❤️ by the MYSTRONIUM™ Team** 