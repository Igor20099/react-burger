import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";

function BurgerConstructor({ data }) {
  const burgerIngredients = [
    {
      _id: "60666c42cc7b410027a1a9b1",
      name: "Краторная булка N-200i",
      type: "bun",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      __v: 0,
    },
    {
      _id: "60666c42cc7b410027a1a9b5",
      name: "Говяжий метеорит (отбивная)",
      type: "main",
      proteins: 800,
      fat: 800,
      carbohydrates: 300,
      calories: 2674,
      price: 3000,
      image: "https://code.s3.yandex.net/react/code/meat-04.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
      __v: 0,
    },
    {
      _id: "60666c42cc7b410027a1a9b6",
      name: "Биокотлета из марсианской Магнолии",
      type: "main",
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: "https://code.s3.yandex.net/react/code/meat-01.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
      __v: 0,
    },
    {
      _id: "60666c42cc7b410027a1a9b7",
      name: "Соус Spicy-X",
      type: "sauce",
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: "https://code.s3.yandex.net/react/code/sauce-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
      __v: 0,
    },
    {
      _id: "60666c42cc7b410027a1a9b4",
      name: "Мясо бессмертных моллюсков Protostomia",
      type: "main",
      proteins: 433,
      fat: 244,
      carbohydrates: 33,
      calories: 420,
      price: 1337,
      image: "https://code.s3.yandex.net/react/code/meat-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
      __v: 0,
    },
  ];
  return (
    <section className={styles.burger_constructor}>
      {burgerIngredients.map((el) => {
        if (el.type === "bun") {
          return (
            <div className="ml-8 mr-2">
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${el.name} (верх)`}
                price={el.price}
                thumbnail={el.image}
                extraClass={styles.element}
              />
            </div>
          );
        }
      })}
      <ul className={styles.burger_list}>
        {burgerIngredients.map((el) => {
          if (!el.isLocked && el.type !== "bun") {
            return (
              <li className={styles.item}>
                <DragIcon type="primary"></DragIcon>
                <ConstructorElement
                  type={el.type}
                  isLocked={el.isLocked}
                  text={el.name}
                  price={el.price}
                  thumbnail={el.image}
                  extraClass="ml-2"
                />
              </li>
            );
          }
        })}
      </ul>
      {burgerIngredients.map((el) => {
        if (el.type === "bun") {
          return (
            <div className="ml-8 mr-2">
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${el.name} (низ)`}
                price={el.price}
                thumbnail={el.image}
                extraClass={styles.element}
              />
            </div>
          );
        }
      })}

      <div className={styles.burger_info}>
        <div className={styles.price}>
          <p className="text text_type_main-large mr-2">
            {burgerIngredients.reduce(
              (acc, ingredient) => acc + ingredient.price,
              0
            )}
          </p>
          <CurrencyIcon type="primary" />
        </div>

        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
