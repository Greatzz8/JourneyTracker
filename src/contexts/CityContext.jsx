import { useReducer } from "react";
import { createContext, useContext, useEffect } from "react";
import { useAuth } from "./fakeAuth";

const CityContext = createContext();
const initState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        currentCity: {},
        cities: state.cities.filter((c) => c._id !== action.payload),
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function CityProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);
  const { cities, currentCity, isLoading } = state;
  //const authToken = `Bearer ${document.cookie.substring(6)}`;
  const { user, isAuth } = useAuth();
  useEffect(() => {
    async function loadCities() {
      dispatch({ type: "loading" });
      try {
        let res = await fetch("http://localhost:8001/cities", {
          credentials: "include",
          //headers: { Authorization: authToken },
        });
        res = await res.json();
        dispatch({ type: "cities/loaded", payload: res });
      } catch (e) {
        dispatch({ type: "rejected", payload: "Can not load cities" });
      }
    }
    if (isAuth) {
      loadCities();
    }
  }, [isAuth]);

  async function getCity(id) {
    dispatch({ type: "loading" });
    try {
      let res = await fetch(`http://localhost:8001/cities/${id}`, {
        credentials: "include",
        //headers: { Authorization: authToken },
      });
      res = await res.json();

      dispatch({ type: "city/loaded", payload: res });
    } catch (e) {
      dispatch({ type: "rejected", payload: "Can not load this city" });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      let res = await fetch(`http://localhost:8001/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          //Authorization: authToken,
        },
      });
      res = await res.json();
      dispatch({ type: "city/created", payload: res });
    } catch (e) {
      dispatch({ type: "rejected", payload: "Can not create city" });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`http://localhost:8001/cities/${id}`, {
        method: "DELETE",
        credentials: "include",
        //headers: { Authorization: authToken },
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch (e) {
      dispatch({ type: "rejected", payload: "Can not delete city" });
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCity() {
  const value = useContext(CityContext);
  if (value === undefined) {
    throw new Error("Context out of scope!");
  }
  return value;
}
export { CityProvider, useCity };
