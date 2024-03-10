import MainHeader from "@/components/main-header/main-header";
import "./globals.css";
import { PropsWithChildren } from "react";

export const metadata = {
  title: "Flavor Fiesta",
  description: "Delicious meals, shared by a food-loving community.",
};

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
