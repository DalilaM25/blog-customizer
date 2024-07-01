import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import arrowStyles from '../arrow-button/ArrowButton.module.scss'
import { useRef, useState } from 'react';
import { OnClick } from '../arrow-button/ArrowButton';

type TSetClass = (value:boolean) => string | undefined;


export const ArticleParamsForm = () => {
	const [visibility, setVisibility] = useState(false);

	const toggleVisibility: OnClick = () => {
		setVisibility(!visibility);
	}

	const setClass: TSetClass = (visibility) => {
		return `${styles.container} ${visibility ? styles.container_open : ''}`
	}

	const setArrowClass: TSetClass =(visibility) => {
		return `${arrowStyles.container} ${visibility ? arrowStyles.container_open : ''} `
	}

	return (
		<>
			<ArrowButton className={setArrowClass(visibility)} onClick={toggleVisibility}/>
			<aside className={setClass(visibility)}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
