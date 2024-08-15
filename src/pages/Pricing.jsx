// Uses the same styles as Product

import PageNav from "../components/PageNav";
export default function Product() {
  return (
    <main className="bg-slate-600 h-screen px-4">
      <PageNav />
      <section className="grid grid-cols-1 justify-items-center my-[100px] sm:grid-cols-2 gap-y-16">
        <div className="text-center align-middle text-white my-auto">
          <h2 className="text-6xl">
            Simple pricing.
            <br />
            Just Free.
          </h2>
          <p className="text-3xl">
            JourneyTracker is a free app. You don't need to pay 1 dollar to use
            it.
          </p>
        </div>
        <img
          src="img-2.jpg"
          alt="overview of a large city with skyscrapers"
          className="w-4/6"
        />
      </section>
    </main>
  );
}
