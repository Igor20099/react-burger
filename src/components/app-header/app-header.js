import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { NavLink } from "react-router-dom";

function AppHeader() {
  return (
    <header className={styles.appHeader}>
      <div className={styles.content}>
        <nav>
          <ul className={styles.list}>
            <li>
              <NavLink className={styles.link} to="/">
                <BurgerIcon type="primary" />
                <span className="text text_type_main-default pl-2">
                  Конструктор
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink className={styles.link_inactive} to="/">
                <ListIcon type="secondary" />
                <span className="text text_type_main-default pl-2">
                  Лента заказов
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.logo}>
          <Logo />
        </div>

        <NavLink
          className={styles.login_inactive}
          to="/profile"
          activeClassName={styles.active}
        >
          <ProfileIcon type="secondary" />
          <span className="text text_type_main-default pl-2">
            Личный кабинет
          </span>
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
