import { Outlet } from "react-router-dom";
import { Navbar } from "./NavBar";
import { Footer } from "./Footer";

export const Body = () => {
  return (
    <>
      <Navbar />
      {/* Here the based on route component will be loaded in outlet's place */}
      <Outlet />
      <Footer />
    </>
  );
};
