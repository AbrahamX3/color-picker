import { type Metadata } from "next";

import ColorPicker from "@/components/color-picker";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Image Color Picker",
  description:
    "Upload an Image, picker a color from the image and view extra information about the picked color!",
  keywords: [
    "color",
    "picker",
    "color picker",
    "image",
    "tool",
    "eyedropper",
    "hex",
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Image Color Picker",
    description:
      "Upload an Image, picker a color from the image and view extra information about the picked color!",
    url: "https://color.abraham-dev.tech/",
    siteName: "Image Color Picker",
    images: [
      {
        url: "/openGraph.webp",
        width: 1600,
        height: 840,
        alt: "Image Color Picker Icon",
      },
    ],
    locale: "en-US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Image Color Picker",
    description:
      "Upload an Image, picker a color from the image and view extra information about the picked color!",
    siteId: "3038180873",
    creator: "@x3_abe",
    creatorId: "3038180873",
    images: ["/openGraph.webp"],
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  return <ColorPicker />;
}
