import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router";

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main className="p-5 pt-[100px] pb-[64px] h-full bg-defaultBg">
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
