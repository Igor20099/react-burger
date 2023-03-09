import styles from './order-details.module.css'
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function OrderDetails() {

    return (
        <div className={styles.order}>
            <p className='text text_type_digits-large mb-8'>034536</p>
            <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
            <div className={styles.done}> <CheckMarkIcon type="primary" /></div>
            <p className='text text_type_main-small mb-2'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;