import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";

export default function Homepage() {
  return (
    <main className="text-center bgimg h-screen px-4">
      <PageNav />
      <div
        className="pt-48 px-4 overflow-y-scroll"
        style={{ height: "calc(100vh - 60px)" }}
      >
        <h1 className="text-stone-200 text-5xl sm:text-7xl font-semibold">
          You travel the world.
          <br />
          JourneyTracker keeps track of your adventures.
        </h1>
        <h2 className="text-stone-400 text-3xl sm:text-4xl font-semibold mb-28 mt-4">
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link
          to="/login"
          className="rounded-lg bg-green-400 text-3xl py-6 px-4 hover:bg-green-700 transition-colors duration-500 text-black font-semibold"
        >
          START TRACKING NOW
        </Link>
      </div>
    </main>
  );
}
