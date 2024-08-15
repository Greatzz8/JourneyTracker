import { useState } from "react";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/fakeAuth";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
export default function Register() {
  const { login, register } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    let result = await register(email, password, name);
    result = await result.json();
    if (result["result"] === "fail") {
      alert("Register Failed. Please Try Agian");
      return;
    } else {
      navigate("/login");
    }
  }

  const navigate = useNavigate();

  return (
    <main className="bg-slate-600 h-screen px-4">
      <PageNav />
      <div className="flex-top-margin">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 w-4/12 mx-auto rounded-lg flex flex-col py-8 gap-8 min-w-[300px] max-w-3xl"
        >
          <div className="flex flex-col mx-6 gap-2">
            <label htmlFor="email" className="text-white text-2xl">
              Email address
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="px-3 py-2 rounded-md text-black"
            />
          </div>

          <div className="flex flex-col mx-6 gap-2">
            <label htmlFor="password" className="text-white text-2xl">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="px-3 py-2 rounded-md text-black"
            />
          </div>
          <div className="flex flex-col mx-6 gap-2">
            <label htmlFor="name" className="text-white text-2xl">
              Username
            </label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="px-3 py-2 rounded-md text-black"
            />
          </div>

          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="mx-6"
          >
            <Button type="primary">Register</Button>
            <Link to="/login">
              <Button type="primary">Back to Login</Button>
            </Link>
          </div>
          <div className="mx-6">
            <p className="text-lg">
              Privacy Policy: We collect the email from users as the identifiers
              when registering. This app also requires geographical location
              permission when using some features, but we will not collect these
              geographical information. When using the website we may also
              automatically collect your IP address, operating system and
              browser information. We will not share your information with
              third-party and do our best to keep your information secure.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
