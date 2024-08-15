import { Link } from "react-router-dom";
import { useCity } from "../contexts/CityContext";
import styles from "./CityItem.module.css";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
export default function CityItem({ city }) {
  const { currentCity, deleteCity } = useCity();

  function handleDelete(e) {
    e.preventDefault();
    deleteCity(city._id);
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          city._id === currentCity?._id ? styles["cityItem--active"] : ""
        }`}
        to={`${city._id}?lat=${city.position.lat}&lng=${city.position.lng}`}
      >
        <span className={styles.emoji}>{city.emoji}</span>
        <h3 className={styles.name}>{city.cityName}</h3>
        <time className={styles.date}>{formatDate(city.date)}</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}
