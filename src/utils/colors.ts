import colors from "tailwindcss/colors";

export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!result) throw new Error("Invalid hex color");

  return [parseInt(result[1]!, 16), parseInt(result[2]!, 16), parseInt(result[3]!, 16)].join(" ");
}

export const isTailwindColor = (color: string): color is keyof typeof colors => {
  return Object.keys(colors).includes(color);
};
