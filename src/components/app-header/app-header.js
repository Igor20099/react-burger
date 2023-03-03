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
              <BurgerIcon type="primary" />
              <span className="text text_type_main-default pl-2">Конструктор</span>
            </a>
          </li>
          <li>
            <a className={styles.link_inactive} href="#">
              <ListIcon type="secondary" />
              <span className="text text_type_main-default pl-2">Лента заказов</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className={styles.logo}>
      <Logo />
      </div>
      
      <a className={styles.login_inactive} href="#">
        <ProfileIcon type="secondary" />
        <span className="text text_type_main-default pl-2">Личный кабинет</span>
      </a>
    </header>
  );
}

export default AppHeader;
