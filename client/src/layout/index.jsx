import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import OfferCard from "../components/offer-card";
const PageLayout = () => {
  return (
    <>
      <OfferCard />
      <Navbar />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default PageLayout;
