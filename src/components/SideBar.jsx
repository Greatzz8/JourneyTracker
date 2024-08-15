import { Outlet } from "react-router-dom";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import AppNav from "./AppNav";
export default function SideBar() {
  return (
    <div
      className="flex basis-[56rem] flex-col px-12 py-20 items-center sm:h-full max-h-[400px] sm:max-h-full"
      style={{ backgroundColor: "#2d3439" }}
    >
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>&copy; JourneyTracker</p>
      </footer>
    </div>
  );
}
