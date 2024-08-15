import { useState } from "react";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/fakeAuth";
import Button from "../components/Button";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, auth } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) {
      login(email, password);
    }
  }

  const navigate = useNavigate();
  const { isAuth } = useAuth();
  useEffect(() => {
    auth();
  }, [auth]);
  useEffect(() => {
    if (isAuth) {
      navigate("/app", { replace: true });
    }
  }, [isAuth, navigate]);
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

          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="mx-6"
          >
            <Button type="primary">Login</Button>
            <Link to="/register">
              <Button> New User? </Button>
            </Link>
          </div>
          <div className="mx-6">
            <p className="text-lg">
              About Cookie: We use cookies to authenticate and log uses in.
              These cookies are required to enable the basic features of this
              app.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
