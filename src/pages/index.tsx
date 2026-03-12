import Sidebar from "../components/sideBar";
import MainRoutes from "../routes/mainRoutes";
import { defaultLinks } from "../utils/constant";

export default function Pages() {
  return (
    <div className="flex w-full h-screen gap-4 p-2 md:p-4">
      <Sidebar link={defaultLinks} />
      <div className="w-full h-full p-4 bg-[#F7F7F7] rounded-xl ">
        <MainRoutes />
      </div>
    </div>
  );
}
