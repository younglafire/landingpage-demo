# Study VHU Landing Page

A modern, responsive landing page for Study VHU - an intelligent learning platform for Vietnamese university students. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, responsive design with smooth animations
- 📝 Registration form with EmailJS integration
- 🔍 Search and filter functionality for AI tools and study materials
- 📱 Mobile-first responsive design
- ⚡ Fast performance with Vite
- 🎯 Clean, production-ready code

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email**: EmailJS
- **Build Tool**: Vite
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd study-vhu-landing
```

2. Install dependencies:
```bash
npm install
```

3. Set up EmailJS (see EmailJS Configuration section below)

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## EmailJS Configuration

### Quick Setup

1. **Create EmailJS Account**
   - Go to [EmailJS.com](https://www.emailjs.com/)
   - Sign up for a free account

2. **Create Email Service**
   - Add a new email service (Gmail, Outlook, etc.)
   - Note your Service ID

3. **Create Email Template**
   - Create a new template with the variables from `src/emailjs-config.md`
   - Note your Template ID

4. **Get Public Key**
   - Find your Public Key in Account settings

5. **Update Configuration**
   - Replace placeholder values in `src/components/Registration/RegistrationForm.tsx`:

```typescript
const serviceId = 'YOUR_SERVICE_ID';
const templateId = 'YOUR_TEMPLATE_ID';  
const publicKey = 'YOUR_PUBLIC_KEY';
```

### Detailed Instructions

See `src/emailjs-config.md` for complete setup instructions, template examples, and troubleshooting tips.

## Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   └── Header.tsx          # Navigation header
│   └── Registration/
│       └── RegistrationForm.tsx # Main registration form
├── App.tsx                     # Main application component
├── main.tsx                    # Application entry point
├── index.css                   # Global styles and Tailwind imports
└── emailjs-config.md          # EmailJS setup guide
```

## Key Components

### RegistrationForm
- Comprehensive form with validation
- EmailJS integration for automatic email responses
- Support for both modal and inline display modes
- Collects: name, email, phone, year of study, major, university, interests

### Header
- Responsive navigation
- Mobile menu support
- Registration call-to-action button

### Landing Sections
- Hero section with clear value proposition
- Vision & mission showcase
- Study tools overview
- AI tools directory
- Study materials catalog
- Inline registration form
- Call-to-action sections

## Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `src/index.css` for global styles
- Component-specific styles use Tailwind classes

### Content
- Update text content directly in `src/App.tsx`
- Modify form fields in `src/components/Registration/RegistrationForm.tsx`
- Add/remove study tools, AI tools, or materials in the respective data arrays

### EmailJS Template
- Customize email template in your EmailJS dashboard
- Update template variables as needed
- Modify the template parameters in the registration form

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## Deployment

This project can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist/` folder or connect via Git
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **AWS S3**: Upload the `dist/` folder to an S3 bucket

## Environment Variables

For production, consider using environment variables for EmailJS configuration:

```bash
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Then update the component to use:
```typescript
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or support, please contact:
- Email: support@studyvhu.com
- Website: https://studyvhu.com

---

Built with ❤️ for Vietnamese university students