import { Outlet } from "react-router-dom";
import FeatureSidebar from "./FeatureSidebar";

const FeatureLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <FeatureSidebar />
      <main className="flex-1 p-0 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default FeatureLayout;
