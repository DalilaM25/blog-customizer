import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';
import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;
export interface Props {
	onClick?: OnClick;
	visibility?: boolean;
}
export const ArrowButton = (props: Props) => {
	const imgClass = clsx(styles.arrow, {
		[styles.arrow_open]: props.visibility,
	});

	const Class = clsx(styles.container, {
		[styles.container_open]: props.visibility,
	});
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={Class}
			onClick={props.onClick}>
			<img src={arrow} alt='иконка стрелочки' className={imgClass} />
		</div>
	);
};
