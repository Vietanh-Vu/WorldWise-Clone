import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

export default function CityList() {
  const { cities, isLoading } = useCities();

  const countries = cities.reduce((acc, cur) => {
    if (acc.map((el) => el.country).includes(cur.country)) {
      return acc;
    } else
      return [...acc, { country: cur.country, emoji: cur.emoji, id: cur.id }];
  }, []);
  if (isLoading) return <Spinner />;
  if (cities.length === 0)
    return (
      <Message
        message={"Please add your first city by clicking on a city on a map"}
      />
    );
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}
