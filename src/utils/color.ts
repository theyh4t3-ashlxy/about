export interface GeneratedPalette {
  surface0: string;
  surface100: string;
  surface200: string;
  strokeDefault: string;
  strokeEmphasis: string;
  accent: string;
  contentEmphasis: string;
  contentDefault: string;
  contentMuted: string;
}

export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  let c = hex.replace("#", "").trim();
  if (c.length === 3) c = c.split("").map((x) => x + x).join("");
  if (c.length !== 6) return { h: 210, s: 20, l: 20 };

  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h = Math.round(h * 60);
  }

  return { h, s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function hslToHex(h: number, s: number, l: number): string {
  const sNorm = Math.max(0, Math.min(100, s)) / 100;
  const lNorm = Math.max(0, Math.min(100, l)) / 100;

  const k = (n: number) => (n + h / 30) % 12;
  const a = sNorm * Math.min(lNorm, 1 - lNorm);
  const f = (n: number) =>
    lNorm - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

export function generateProceduralPalette(
  hexColor: string,
  isDark: boolean
): GeneratedPalette {
  const { h, s, l } = hexToHsl(hexColor);

  if (isDark) {
    // If user provided a very dark color directly, anchor on its lightness
    const baseL = l < 15 ? l : 6;
    const surfaceS = Math.min(s, 28);

    return {
      surface0: hslToHex(h, surfaceS, baseL),
      surface100: hslToHex(h, surfaceS * 0.9, baseL + 5),
      surface200: hslToHex(h, surfaceS * 0.95, baseL + 9),
      strokeDefault: hslToHex(h, surfaceS, baseL + 16),
      strokeEmphasis: hslToHex(h, Math.min(s, 50), baseL + 30),
      accent: l < 35 ? hslToHex(h, Math.max(s, 60), 60) : hexColor,
      contentEmphasis: hslToHex(h, 15, 96),
      contentDefault: hslToHex(h, 10, 80),
      contentMuted: hslToHex(h, 12, 60),
    };
  } else {
    // Light mode: clean tinted surfaces with deep text
    const surfaceS = Math.min(s, 25);

    return {
      surface0: hslToHex(h, surfaceS * 0.7, 96),
      surface100: hslToHex(h, surfaceS * 0.5, 99),
      surface200: hslToHex(h, surfaceS * 0.9, 92),
      strokeDefault: hslToHex(h, surfaceS, 85),
      strokeEmphasis: hslToHex(h, Math.min(s, 50), 65),
      accent: l > 75 ? hslToHex(h, Math.max(s, 70), 45) : hexColor,
      contentEmphasis: hslToHex(h, 30, 10),
      contentDefault: hslToHex(h, 20, 24),
      contentMuted: hslToHex(h, 15, 45),
    };
  }
}
