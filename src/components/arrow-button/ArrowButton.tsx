import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;
export interface Props {
	onClick?: OnClick;
	className?: string | undefined
}
export const ArrowButton = (props: Props) => {
const turnArrow = () => {
 return `${props.className?.includes('open') ? styles.arrow_open : styles.arrow }`
}
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={props.className}
			onClick={props.onClick}>
			<img src={arrow} alt='иконка стрелочки' className={turnArrow()} />
		</div>
	);
};
