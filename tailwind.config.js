import foundationPreset from "@rbx/foundation-tailwind/preset";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/@rbx/foundation-ui/dist/**/*.{js,jsx}",
  ],
  presets: [foundationPreset],
  darkMode: "class",
  corePlugins: {
    boxSizing: true,
    gridTemplateColumns: true,
    gridTemplateRows: true,
    gridColumn: true,
    gridRow: true,
    objectFit: true,
    objectPosition: true,
    flexWrap: true,
    flexGrow: true,
    boxShadow: true,
    transform: true,
    scale: true,
    lineClamp: true,
    zIndex: true,
    overflow: true,
    borderRadius: true,
    aspectRatio: true,
  },
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      xsmall: "1px",
      small: "361px",
      medium: "601px",
      large: "1141px",
      xlarge: "1521px",
      xxlarge: "1921px",
    },
  },
};
