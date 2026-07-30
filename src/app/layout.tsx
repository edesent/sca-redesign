import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const SITE_NAME = "Springfield Christian Academy";
const SITE_DESCRIPTION =
  "A modern school website concept for Springfield Christian Academy in Clarkston, Michigan.";

export const metadata: Metadata = {
  metadataBase: new URL("https://sca.elijahdesent.com"),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: "https://sca.elijahdesent.com",
    type: "website",
    siteName: SITE_NAME,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#27183b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          id="wbc-chat-sca"
          src="https://slackwebsitechat.vercel.app/widget/wbc-chat.js"
          data-api="https://slackwebsitechat.vercel.app"
          data-key="wbc_7c0d8ba06143c6163f1cfd7870f0207f47aedbacb1d043b0"
          data-greeting-message="Hi, I'm Mr. Wagner. Have a question about Springfield Christian Academy or planning a visit? Ask us here."
          data-form-subtitle="Leave your name and number, and Mr. Wagner or the school office will get right back to you."
          data-agent-icon-url="https://faithconnector.s3.amazonaws.com/1562/images/member/0155.jpg"
          data-accent-color="#fdc10e"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
