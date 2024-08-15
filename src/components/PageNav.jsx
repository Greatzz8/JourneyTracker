import { NavLink } from "react-router-dom";
import Logo from "./Logo";
//import styles from "./PageNav.module.css";
export default function PageNav() {
  return (
    <nav className="flex align-middle sm:justify-between justify-center mx-4 pt-4">
      <div className="hidden sm:block">
        <Logo />
      </div>

      <ul className="flex sm:gap-x-10 gap-x-5" style={{ alignItems: "center" }}>
        <li>
          <NavLink
            to="/product"
            className="font-semibold text-white active:text-green-400 text-3xl"
          >
            Product
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/pricing"
            className="font-semibold text-white active:text-green-400 text-3xl"
          >
            Pricing
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className="rounded-lg bg-green-400 py-2 px-4 font-semibold hover:bg-green-700 transition-colors duration-500 text-3xl text-black"
          >
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
