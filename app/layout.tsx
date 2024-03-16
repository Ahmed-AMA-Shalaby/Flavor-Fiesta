import MainHeader from "@/components/main-header/main-header";
import "./globals.css";
import { PropsWithChildren } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: "Flavor Fiesta",
  description: "Delicious meals, shared by a food-loving community.",
};

const RootLayout: React.FC<PropsWithChildren> = async ({ children }) => {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
