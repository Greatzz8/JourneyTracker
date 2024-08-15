export default function Button({ children, onClick, type = "primary" }) {
  if (type === "primary") {
    return (
      <button
        className="rounded-lg bg-green-400 py-3 px-5 font-semibold hover:bg-green-700 transition-colors duration-500 text-3xl text-black"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  if (type === "back") {
    return (
      <button
        className="rounded-lg bg-transparent border-white border-2 py-3 px-5  hover:bg-slate-800 transition-colors duration-500 text-3xl text-white"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  return <button onClick={onClick}>{children}</button>;
}
