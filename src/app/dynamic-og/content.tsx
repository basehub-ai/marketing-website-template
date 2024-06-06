/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import colors from "tailwindcss/colors";

import { isTailwindColor } from "@/utils/colors";

interface OgData {
  title: string;
  subtitle: string;
  logo: { url: string; alt?: string | null };
  accentColor: string;
}

export const ContentOGWrapperResponse = async ({ accentColor, ...props }: OgData) => {
  if (!isTailwindColor(accentColor)) {
    throw new Error(`Invalid color: ${accentColor}`);
  }
  const themeColor = colors[accentColor][500];

  // // fonts
  const geist300 = await fetch(new URL("/public/font/geist/Geist-Light.otf", import.meta.url)).then(
    (res) => res.arrayBuffer(),
  );
  const geist400 = await fetch(
    new URL("/public/font/geist/Geist-Regular.otf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(<LightThemeOG accentColor={themeColor} {...props} />, {
    fonts: [
      { data: geist400, name: "Geist 400" },
      { data: geist300, name: "Geist 300" },
    ],
    width: 1200,
    height: 630,
  });
};

function LightThemeOG({ title, subtitle, logo }: Omit<OgData, "theme">) {
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "1200px",
        height: "630px",
        background: "#FFFFFF",
      }}
    >
      <SvgBG
        fill="#FFFFFF"
        style={{
          position: "absolute",
          height: "120%",
          width: "120%",
          zIndex: 0,
          left: "50%",
          top: "50%",
          transformOrigin: "center",
          transform: "translate(-50%, -50%) scale(1.1)",
          color: "#D4D4D8",
        }}
      />
      {/* gradient */}
      <svg
        fill="none"
        height="600"
        style={{
          position: "absolute",
          zIndex: 1,
          transform: "scale(4)",
          transformOrigin: "center",
        }}
        width="1200"
      >
        <g filter="url(#filter0_f_7495_12766)">
          <path
            d="M1384.5 -362C1384.5 19.6288 581.629 632 200 632C-181.629 632 -491 322.629 -491 -59C-491 -440.629 -181.629 -750 200 -750C581.629 -750 1384.5 -743.629 1384.5 -362Z"
            fill="#FAFAFA"
          />
        </g>
        <defs>
          <filter
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
            height="1934.8"
            id="filter0_f_7495_12766"
            width="2428.3"
            x="-767.4"
            y="-1026.4"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_7495_12766" stdDeviation="138.2" />
          </filter>
        </defs>
      </svg>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          gap: "24px",
          zIndex: 2,
          top: "130px",
          left: "100px",
        }}
      >
        <img alt={logo.alt ?? "logo"} src={logo.url} style={{ width: 50 }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "60%",
          }}
        >
          <h1
            style={{
              color: "#000000",
              fontFamily: "Geist 500",
              fontSize: "64px",
              maxWidth: "80%",
              fontWeight: 400,
              lineHeight: "140%",
              letterSpacing: "-2.88px",
              margin: 0,
              textAlign: "left",
            }}
          >
            {truncateString(title, 70)}
          </h1>
          <p
            style={{
              color: "#787882",
              fontSize: "32px",
              lineHeight: "140%",
              maxWidth: "90%",
              letterSpacing: "-1.2px",
              fontWeight: 300,
            }}
          >
            {truncateString(subtitle, 140)}
          </p>
        </div>
      </div>
    </div>
  );
}

function truncateString(str: string, maxLength: number) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  } else {
    return str;
  }
}

function SvgBG({ style, fill }: { style?: React.CSSProperties; fill?: string }) {
  return (
    <svg height="600" style={style} viewBox="0 0 1200 600" width="1200">
      <g opacity="0.7">
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="500" y="-50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="500" y="50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="500" y="150" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="500" y="250" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="500" y="450" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="500" y="350" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="500" y="550" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="600" y="-50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="-100" y="-50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="600" y="50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="-100" y="50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="600" y="150" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="-100" y="150" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="600" y="250" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="600" y="450" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="-100" y="250" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="-100" y="450" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="600" y="350" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="600" y="550" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="-100" y="350" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="-100" y="550" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="700" y="-50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" y="-50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="700" y="50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" y="50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="700" y="150" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" y="150" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="700" y="250" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="700" y="450" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" y="250" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" y="450" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="700" y="350" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="700" y="550" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" y="350" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" y="550" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="800" y="-50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="100" y="-50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="800" y="50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="100" y="50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="800" y="150" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="100" y="150" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="800" y="250" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="800" y="450" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="100" y="250" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="100" y="450" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="800" y="350" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="800" y="550" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="100" y="350" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="100" y="550" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="900" y="-50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="200" y="-50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="900" y="50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="200" y="50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="900" y="150" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="200" y="150" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="900" y="250" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="900" y="450" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="200" y="250" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="200" y="450" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="900" y="350" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="900" y="550" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="200" y="350" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="200" y="550" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="1000" y="-50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="300" y="-50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="1000" y="50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="300" y="50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="1000" y="150" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="300" y="150" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="1000" y="250" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="1000" y="450" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="300" y="250" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="300" y="450" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="1000" y="350" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="1000" y="550" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="300" y="350" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="300" y="550" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="1100" y="-50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="400" y="-50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="1100" y="50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="400" y="50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="1100" y="150" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="400" y="150" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="1100" y="250" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="1100" y="450" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="400" y="250" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="400" y="450" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="1100" y="350" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="1100" y="550" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="400" y="350" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="400" y="550" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="1200" y="-50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="1200" y="50" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="1200" y="150" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="1200" y="250" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="1200" y="450" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="1200" y="350" />
        <rect fill={fill} height="100" stroke="currentColor" width="100" x="1200" y="550" />
      </g>
    </svg>
  );
}
