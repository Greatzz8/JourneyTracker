import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCity } from "../contexts/CityContext";
export default function CityList() {
  const { cities, isLoading } = useCity();
  if (isLoading) {
    return <Spinner />;
  }
  if (cities.length === 0) {
    return <Message message="Add your first city" />;
  }
  return (
    <ul className={styles.cityList}>
      {cities.map((c) => (
        <CityItem city={c} key={c._id} />
      ))}
    </ul>
  );
}
