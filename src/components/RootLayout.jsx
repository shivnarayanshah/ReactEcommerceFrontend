import Header from "./Header";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-2">
        <Outlet />
      </main>
    </div>
  );
}
