import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";

function BurgerIngredients({ data }) {
  console.log(data);
  return (
    <section className={styles.burger_ingredients}>
      <h1>Соберите бургер</h1>
      <div style={{ display: "flex" }}>
        <Tab value="one">Булки</Tab>
        <Tab value="two">Соусы</Tab>
        <Tab value="three">Начинки</Tab>
      </div>
      <div className="bun-conteiner">
        <h2>Булки</h2>
        <ul className={styles.bun_conteiner}>
          {data.map((el) => {
            if (el.type === "bun") {
              return (
                <li key={el._id} className={styles.burger_item}>
                  <img src={el.image} />
                  <Counter count={1} size="default" extraClass="m-1" />
                  <p>
                    {el.price} <CurrencyIcon type="primary" />
                  </p>
                  <p>{el.name}</p>
                </li>
              );
            }
          })}
        </ul>
      </div>
      <div className="sauce-conteiner">
        <h2>Соусы</h2>
        <ul className={styles.bun_conteiner}>
          {data.map((el) => {
            if (el.type === "sauce") {
              return (
                <li key={el._id} className={styles.burger_item}>
                  <img src={el.image}></img>
                  <Counter count={1} size="default" extraClass="m-1" />
                  <p>
                    {el.price} <CurrencyIcon type="primary" />
                  </p>
                  <p>{el.name}</p>
                </li>
              );
            }
          })}
        </ul>
      </div>
      <div className="main-conteiner">
        <h2>Начинки</h2>
        <ul className={styles.bun_conteiner}>
          {data.map((el) => {
            if (el.type === "main") {
              return (
                <li key={el._id} className={styles.burger_item}>
                  <img src={el.image}></img>
                  <Counter count={1} size="default" extraClass="m-1" />
                  <p>
                    {el.price} <CurrencyIcon type="primary" />
                  </p>
                  <p>{el.name}</p>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </section>
  );
}

export default BurgerIngredients;
