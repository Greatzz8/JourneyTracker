import Map from "../components/Map";
import SideBar from "../components/SideBar";
import User from "../components/User";
export default function AppLayout() {
  return (
    <div className="flex flex-col sm:flex-row h-screen relative sm:overscroll-y-none">
      <SideBar />
      <Map />
      <User />
    </div>
  );
}
