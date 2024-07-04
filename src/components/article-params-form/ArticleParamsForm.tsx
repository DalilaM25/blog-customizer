import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { OnClick } from '../arrow-button/ArrowButton';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

type Props = {
	stateSubmit: (value: ArticleStateType) => void;
	stateReset: () => void;
};

export const ArticleParamsForm = (props: Props) => {
	const [formVisibility, setFormVisibility] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	const toggleVisibility: OnClick = () => {
		setFormVisibility(!formVisibility);
	};

	const containerClass = clsx(styles.container, {
		[styles.container_open]: formVisibility,
	});

	const [selectedState, setSelectedState] = useState(defaultArticleState);

	const handleState = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setSelectedState((prevState) => ({ ...prevState, [field]: value }));}
	};

	const handleFormReset = () => {
		setSelectedState(defaultArticleState);
		props.stateReset();
		setFormVisibility(false);
	};

	const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		props.stateSubmit(selectedState);
		setFormVisibility(false);
	};

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (formRef.current && !formRef.current.contains(e.target as Node)) {
				setFormVisibility(false);
			}
		}
		if (!formVisibility) return;
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [formVisibility, setFormVisibility, formRef]);

	return (
		<>
			<ArrowButton visibility={formVisibility} onClick={toggleVisibility} />
			<aside className={containerClass} ref={formRef}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Text
						as='h2'
						size={31}
						weight={800}
						align='center'
						uppercase
						dynamicLite>
						задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={selectedState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleState('fontFamilyOption')}></Select>
					<RadioGroup
						name={'fontsize'}
						options={fontSizeOptions}
						selected={selectedState.fontSizeOption}
						title={'размер шрифта'}
						onChange={handleState('fontSizeOption')}></RadioGroup>
					<Select
						title='Цвет шрифта'
						selected={selectedState.fontColor}
						options={fontColors}
						onChange={handleState('fontColor')}></Select>
					<Separator></Separator>
					<Select
						title='Цвет фона'
						selected={selectedState.backgroundColor}
						options={backgroundColors}
						onChange={handleState('backgroundColor')}></Select>
					<Select
						title='Ширина контента'
						selected={selectedState.contentWidth}
						options={contentWidthArr}
						onChange={handleState('contentWidth')}></Select>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleFormReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
