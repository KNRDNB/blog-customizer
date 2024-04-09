import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowButtonProps = {
	isOpen: boolean;
	onClick: OnClick;
};

export const ArrowButton = (props: ArrowButtonProps) => {
	const arrowContainerStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: props.isOpen,
	});

	const arrowStyle = clsx({
		[styles.arrow]: true,
		[styles.arrow_open]: props.isOpen,
	});

	function handleClick() {
		props.onClick();
	}

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={arrowContainerStyle}
			onClick={handleClick}>
			<img src={arrow} alt='иконка стрелочки' className={arrowStyle} />
		</div>
	);
};
