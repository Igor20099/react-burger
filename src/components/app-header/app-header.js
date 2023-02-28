import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

function AppHeader() {
  return (
    <header className={styles.appHeader}>
      <nav>
        <ul className={styles.list}>
          <li>
            <a className={styles.link} href="#">
              <BurgerIcon className="m-4" type="primary" />
              <span className="text text_type_main-default">Конструктор</span>
            </a>
          </li>
          <li>
            <a className={styles.link} href="#">
              <ListIcon type="secondary" />
              <span className="text text_type_main-default">Лента заказов</span>
            </a>
          </li>
        </ul>
      </nav>
      <Logo />
      <a className={styles.link} href="#">
        <ProfileIcon type="secondary" />
        <span className="text text_type_main-default">Личный кабинет</span>
      </a>
    </header>
  );
}

export default AppHeader;
