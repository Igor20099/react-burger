import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

function AppHeader() {
  const { pathname } = useLocation();

  return (
    <header className={styles.appHeader}>
      <div className={styles.content}>
        <nav>
          <ul className={styles.list}>
            <li>
              <NavLink
                className={
                  pathname === "/" ? styles.link : styles.link_inactive
                }
                to="/"
              >
                <BurgerIcon type={pathname === "/" ? "primary" : "secondary"} />
                <span className="text text_type_main-default pl-2">
                  Конструктор
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={
                  pathname === "/feed" ? styles.link : styles.link_inactive
                }
                to="/"
              >
                <ListIcon
                  type={pathname === "feed" ? "primary" : "secondary"}
                />
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
          className={
            pathname === "/profile" 
              ? styles.link
              : styles.link_inactive
          }
          to="/profile"
        >
          <ProfileIcon
            type={pathname === "/profile" ? "primary" : "secondary"}
          />
          <span className="text text_type_main-default pl-2">
            Личный кабинет
          </span>
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
