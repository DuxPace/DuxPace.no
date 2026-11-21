import { ogImage, ogSize } from "../../lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "DuxPace";

export default function Image() {
  return ogImage("en");
}
