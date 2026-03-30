# 🕵️‍♂️ DeepFake Detection Platform (CertiScan Frontend)

Welcome to the **DeepFake Detection Platform**! This is the frontend application built to provide a modern, fast, and intuitive user interface for detecting manipulated media (deepfakes).

## 🚀 Features

- **Modern & Responsive UI**: Built with Tailwind CSS and Framer Motion for a sleek, glassmorphic design and smooth animations.
- **Media Upload**: Easy drag-and-drop file uploading using `react-dropzone`.
- **Results & Analytics**: Beautiful data visualization using `recharts` to display deepfake probability scores and analysis results.
- **Seamless Navigation**: Client-side routing with `react-router-dom` ensuring fast transitions across Home, Features, About, Upload, and Results pages.
- **Global Layout**: Consistent navigation and theming across the entire application.

## 🛠 Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)

## 📂 Project Structure

```text
src/
├── assets/         # Static assets like images and icons
├── components/     # Reusable UI components (e.g., Layout)
├── pages/          # Application routes/pages
│   ├── Home.tsx      # Landing page
│   ├── Features.tsx  # Platform features overview
│   ├── About.tsx     # Information about the project/team
│   ├── Upload.tsx    # Media upload handling
│   └── Results.tsx   # Deepfake scan results and charts
├── api.ts          # Axios configuration and API calls
├── App.tsx         # Root component containing routing logic
├── main.tsx        # Application entry point
└── index.css       # Global CSS and Tailwind directives
```

## 🏁 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository** (or navigate to the project directory):
   ```bash
   cd CertiScan_Frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`.

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Compiles TypeScript and builds the app for production to the `dist` folder.
- `npm run lint`: Runs ESLint to check for code quality and matching type rules.
- `npm run preview`: Bootstraps a local web server to preview the production build.

## 📄 License

This project is licensed under the MIT License.
