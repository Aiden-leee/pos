import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router";

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main className="p-5 pt-[100px] pb-[64px] h-full bg-defaultBg">
        <div className="max-w-[1200px] m-auto w-full h-full">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default RootLayout;
