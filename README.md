# FixIt Frontend

A modern, responsive React frontend application for FixIt, Sri Lanka's premium roadside assistance and car repair service. This app connects users with professional mechanics for towing, battery jumpstarts, mechanical repairs, and fuel delivery services.

## 🚀 Features

### Core Functionality
- **Location-Based Mechanic Search**: Drop your location to find the nearest available mechanic
- **Service Selection**: Choose from towing, battery jumpstart, mechanical repairs, or fuel delivery
- **Real-Time Connection**: Instant connection with professionals in seconds
- **24/7 Availability**: Round-the-clock roadside assistance

### User Experience
- **Dark/Light Mode Toggle**: Seamless theme switching with smooth transitions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Powered by Framer Motion for engaging interactions
- **Modern UI**: Clean, professional interface with organic shapes and gradients

### Components
- **Hero Section**: Eye-catching landing with service search functionality
- **Process Section**: Animated step-by-step guide of how the service works
- **Services Section**: Detailed service offerings with hover effects
- **Reviews Section**: Client testimonials with infinite scroll animation
- **Footer**: Contact information and additional links
- **Sidebar Navigation**: Collapsible navigation with theme toggle

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.2.0**: Latest React with concurrent features
- **Vite**: Fast build tool and development server
- **React Router DOM 7.11.0**: Client-side routing

### Styling & UI
- **Tailwind CSS 4.1.18**: Utility-first CSS framework
- **Framer Motion 12.23.26**: Animation library for React
- **Lucide React 0.562.0**: Beautiful icon library

### Development Tools
- **ESLint**: Code linting and formatting
- **PostCSS & Autoprefixer**: CSS processing
- **TypeScript Types**: Type definitions for React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fixit-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install additional packages** (if needed)
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   npm install axios lucide-react framer-motion zustand next-themes clsx tailwind-merge
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## 🏗️ Project Structure

```
fixit-frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   └── common/
│   │       ├── DynamicPath.jsx      # Animated background path
│   │       ├── Footer.jsx           # Site footer
│   │       ├── Hero.jsx             # Landing hero section
│   │       ├── LeftSidebar.jsx      # Navigation sidebar
│   │       ├── Process.jsx          # How it works section
│   │       ├── Reviews.jsx          # Client testimonials
│   │       ├── Services.jsx         # Service offerings
│   │       └── SidebarNav.jsx       # Sidebar navigation
│   ├── App.css
│   ├── App.jsx                      # Main application component
│   ├── index.css                    # Global styles
│   └── main.jsx                     # Application entry point
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
├── eslint.config.js
└── README.md
```

## 🎨 Key Components

### App.jsx
- Main application wrapper
- Theme management (dark/light mode)
- Routing setup
- Layout structure with sidebar and main content

### Hero.jsx
- Prominent landing section
- Location input for mechanic search
- "FIND MECHANIC" call-to-action button
- Background image with overlay

### Process.jsx
- Animated step-by-step process visualization
- Curved SVG path with progress animation
- Interactive cards with hover effects
- Parallax scrolling effects

### Services.jsx
- Grid layout of service offerings
- Hover animations and rotations
- Service icons and descriptions
- Responsive card design

### Reviews.jsx
- Infinite horizontal scroll animation
- Client testimonials
- Star ratings display
- Smooth animation transitions

## 🎯 Usage

1. **Theme Toggle**: Use the sidebar toggle to switch between light and dark modes
2. **Navigation**: Click on sidebar items to navigate to different sections
3. **Service Search**: Enter your location in the hero section and click "FIND MECHANIC"
4. **Explore Services**: Scroll through the services section to learn about offerings
5. **View Process**: Check the "HOW IT WORKS" section for service flow
6. **Read Reviews**: Browse client testimonials in the reviews section

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Code Style
- Uses ESLint for code quality
- Follows React best practices
- Modular component structure
- Consistent naming conventions

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full feature set with sidebar navigation
- **Tablet**: Adapted layout with touch-friendly interactions
- **Mobile**: Streamlined interface with collapsible navigation

## 🎨 Design System

### Colors
- **Primary**: #FEB05D (Orange accent)
- **Secondary**: Complementary colors for UI elements
- **Dark Background**: #050505 for dark mode
- **Light Background**: Clean white/light theme

### Typography
- **Font Family**: System fonts with bold weights
- **Hierarchy**: Clear heading structure (H1-H6)
- **Readability**: High contrast text for accessibility

### Animations
- **Framer Motion**: Smooth, performant animations
- **Scroll Triggers**: Elements animate on viewport entry
- **Hover Effects**: Interactive feedback on user actions
- **Theme Transitions**: Smooth mode switching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions or support, please contact:
- **Email**: support@fixit.lk
- **Website**: https://fixit.lk
- **Location**: Sri Lanka

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Vite** for fast development experience
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **Lucide** for beautiful icons
- **Unsplash** for background images

---

Built with ❤️ for Sri Lanka's roadside assistance needs.
