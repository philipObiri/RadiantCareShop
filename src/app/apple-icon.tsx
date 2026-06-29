import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#B07A2F",
          borderRadius: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Heart shape via SVG path */}
        <svg
          width="110"
          height="110"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 24C16 24 7 17.5 7 11.5C7 8.5 9.5 6 12.5 6C14 6 15.2 6.8 16 8C16.8 6.8 18 6 19.5 6C22.5 6 25 8.5 25 11.5C25 17.5 16 24 16 24Z"
            fill="white"
            opacity="0.92"
          />
          <polyline
            points="9,12.5 11.5,12.5 13,9.5 14.5,15.5 16,11 17.2,14 18.5,12.5 23,12.5"
            stroke="#B07A2F"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
