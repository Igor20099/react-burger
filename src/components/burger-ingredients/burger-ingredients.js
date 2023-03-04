import React from "react";

import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";

function BurgerIngredients({ data }) {
  const [current, setCurrent] = React.useState("one");
  //   console.log(data);
  return (
    <section className={styles.burger_ingredients}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div className="mb-10" style={{ display: "flex" }}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styles.ingredients_container}>
        <div className="bun-container">
          <h2 className="text text_type_main-medium">Булки</h2>
          <ul className={styles.bun_conteiner}>
            {data.map((el) => {
              if (el.type === "bun") {
                return (
                  <li key={el._id} className={styles.burger_item}>
                    <img src={el.image} className="mr-4 ml-4 mb-1"/>
                    <Counter count={1} size="default" extraClass="m-1" />
                    <div className={styles.price}>
                      <p className="text text_type_main-medium mr-2">{el.price}</p>
                      <CurrencyIcon type="primary" />
                    </div>

                    <p className="text text_type_main-small">{el.name}</p>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className="sauce-container">
          <h2 className="text text_type_main-medium">Соусы</h2>
          <ul className={styles.bun_conteiner}>
            {data.map((el) => {
              if (el.type === "sauce") {
                return (
                  <li key={el._id} className={styles.burger_item}>
                    <img src={el.image}></img>
                    <Counter count={1} size="default" extraClass="m-1" />
                    <div className={styles.price}>
                      <p className="text text_type_main-medium mr-2">{el.price}</p>
                      <CurrencyIcon type="primary" />
                    </div>
                    <p className="text text_type_main-small">{el.name}</p>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className="main-container">
          <h2 className="text text_type_main-medium">Начинки</h2>
          <ul className={styles.bun_conteiner}>
            {data.map((el) => {
              if (el.type === "main") {
                return (
                  <li key={el._id} className={styles.burger_item}>
                    <img src={el.image}></img>
                    <Counter count={1} size="default" extraClass="m-1" />
                    <div className={styles.price}>
                      <p className="text text_type_main-default mr-2">{el.price}</p>
                      <CurrencyIcon type="primary" />
                    </div>
                    <p className="text text_type_main-small">{el.name}</p>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default BurgerIngredients;
