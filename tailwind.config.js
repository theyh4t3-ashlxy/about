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
};
