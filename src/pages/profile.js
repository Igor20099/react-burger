import styles from "./profile.module.css";
import {
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ProfilePage() {
  return (
    <div className={styles.profile}>
      <ul className={styles.nav}>
        <li className="text text_type_main-medium mb-8">Профиль</li>
        <li className="text text_type_main-medium text_color_inactive mb-8">История заказов</li>
        <li className="text text_type_main-medium text_color_inactive">Выход</li>
      </ul>
      <div>
        <Input
          type={"text"}
          placeholder={"Имя"}
          icon={"EditIcon"}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
          disabled={true}
        />
        <EmailInput
          name={"email"}
          placeholder="Логин"
          isIcon={true}
          extraClass="mb-6"
        />
        <PasswordInput name={"password"} icon="EditIcon" />
      </div>
      <p className={styles.text}><span className="text text_type_main-small text_color_inactive">В этом разделе вы можете
изменить&nbsp;свои персональные данные</span></p>
    </div>
  );
}

export default ProfilePage;
