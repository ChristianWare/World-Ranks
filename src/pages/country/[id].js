import { useEffect, useState } from 'react';
import { border } from "@material-ui/system";
import Layout from "../../components/Layout/Layout";
import styles from "./country.module.css";

const getCountry = async (id) => {
  const res = await fetch(
    `https://restcountries.eu/rest/v2/alpha/${id}`
  );

  const country = await res.json();

  return country;
};

const Country = ({ country }) => {
  console.log(country);
  const [borders, setBorders] = useState([]);

  const getBorders = async () => {
  const borders = country.borders.map((border) => getCountry(border))

 setBorders(borders);
  };

  useEffect(() => {
    getBorders();
  }, [])


  return (
    <Layout title={country.name}>
      <div>
        <div className={styles.overview_panel}>
          <img src={country.flag} alt={country.name} />

          <h1 className={styles.overview_name}>{country.name}</h1>
          <div className={styles.overview_region}>{country.region}</div>

          <div className={styles.overview_numbers}>
            <div className={styles.population}>
              <div className={styles.overview_value}>{country.population}</div>
              <div className={styles.overview_label}>Population</div>
            </div>
            <div className={styles.overview_area}>
              <div>{country.area}</div>
              <div>Area</div>
            </div>
          </div>
        </div>

        <div className={styles.details_panel}>
          <h4 className={styles.details_panel_heading}>Details</h4>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Capital</div>
            <div className={styles.details_panel_value}>{country.capital}</div>
          </div>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Language</div>
            <div className={styles.details_panel_value}>
              {country.languages.map(({ name }) => name).join(", ")}
            </div>
          </div>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Currencies</div>
            <div className={styles.details_panel_value}>
              {country.currencies.map(({ name }) => name).join(", ")}
            </div>
          </div>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Native Name</div>
            <div className={styles.details_panel_value}>
              {country.nativeName}
            </div>
          </div>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Gini</div>
            <div className={styles.details_panel_value}>{country.gini}%</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Country;

export const getServerSideProps = async ({ params }) => {
  const country = await getCountry(params.id);

  return {
    props: {
      country,
    },
  };
};
