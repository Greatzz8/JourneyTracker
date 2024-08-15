import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const AuthContext = createContext();

let FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  //const authToken = `Bearer ${document.cookie.substring(6)}`;
  async function login(email, password) {
    try {
      let result = await fetch("http://localhost:8001/login", {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          //Authentication: authToken,
        },
      });
      if (result.ok) {
        result = await result.json();
        FAKE_USER.email = result.email;
        FAKE_USER.name = result.name;
        setUser(FAKE_USER);
        setIsAuth(true);
      } else {
        alert("Wrong email or password");
      }
    } catch (e) {
      alert("Network error");
    }
  }

  async function auth() {
    let res = await fetch("http://localhost:8001/auth", {
      credentials: "include",
    });
    if (res.ok) {
      res = await res.json();
      FAKE_USER.email = res.email;
      FAKE_USER.name = res.name;
      setUser(FAKE_USER);
      setIsAuth(true);
    }
  }

  async function logout() {
    await fetch("http://localhost:8001/logout", {
      method: "DELETE",
      credentials: "include",
      //headers: { Authentication: authToken },
    });
    setUser(null);
    setIsAuth(false);
  }

  async function register(email, password, name) {
    return await fetch("http://localhost:8001/register", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password, name: name }),
      headers: { "Content-Type": "application/json" },
    });
  }
  return (
    <AuthContext.Provider
      value={{ user, isAuth, login, logout, register, auth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const value = useContext(AuthContext);
  if (value === undefined) {
    throw new Error("AuthContext out of scope");
  }
  return value;
}

export { AuthProvider, useAuth };
