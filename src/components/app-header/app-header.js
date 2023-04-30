import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import {Link} from 'react-router-dom'

function AppHeader() {
  return (
    <header className={styles.appHeader}>
      <div className={styles.content}>
        <nav>
          <ul className={styles.list}>
            <li>
              <Link className={styles.link} to='/'>
                <BurgerIcon type="primary" />
                <span className="text text_type_main-default pl-2">
                  Конструктор
                </span>
              </Link>
            </li>
            <li>
              <a className={styles.link_inactive} href="#">
                <ListIcon type="secondary" />
                <span className="text text_type_main-default pl-2">
                  Лента заказов
                </span>
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles.logo}>
          <Logo />
        </div>

        <Link className={styles.login_inactive} to="/login">
          <ProfileIcon type="secondary" />
          <span className="text text_type_main-default pl-2">
            Личный кабинет
          </span>
        </Link>
      </div>
    </header>
  );
}

export default AppHeader;
