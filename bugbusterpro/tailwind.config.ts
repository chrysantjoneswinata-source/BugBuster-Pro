import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bugbuster: {
          dark: "#0F172A",     // Latar belakang utama (mirip Slate 900)
          card: "#1E293B",     // Latar belakang kartu/form (mirip Slate 800)
          primary: "#38BDF8",  // Tombol utama & aksen (Light Blue)
          secondary: "#64748B",// Teks sekunder
          danger: "#EF4444",   // Validasi error (merah)
          success: "#10B981",  // Status selesai (hijau)
        }
      },
    },
  },
  plugins: [],
};
export default config;