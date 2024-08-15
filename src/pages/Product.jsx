import PageNav from "../components/PageNav";
export default function Product() {
  return (
    <main className="bg-slate-600 h-screen px-4">
      <PageNav />
      <section className="grid grid-cols-1 justify-items-center my-[100px] sm:grid-cols-2 gap-y-16">
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
          className="w-4/6"
        />
        <div className="text-center align-middle text-white my-auto">
          <h2 className="text-6xl">About JourneyTracker.</h2>
          <p className="text-3xl">
            Embarking on a journey is more than just reaching a destination;
            it's about the experiences, the stories, and the memories created
            along the way. With JourneyTracker, you can effortlessly document
            your journeys. Our intuitive web app offers a user-friendly
            interface, empowering you to track your travels and pin your
            favorite spots.
          </p>
        </div>
      </section>
    </main>
  );
}
