import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useState, useEffect, SyntheticEvent, useRef } from 'react';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

type ArticleParamsProps = {
	currentPageState: ArticleStateType;
	setCurrentPageState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentPageState,
	setCurrentPageState,
}: ArticleParamsProps) => {
	const rootRef = useRef<HTMLElement>(null);

	const [isOpen, setOpen] = useState<boolean>(false);
	const [fontFamily, setFontFamily] = useState<OptionType>(
		currentPageState.fontFamilyOption
	);
	const [fontColor, setFontColor] = useState<OptionType>(
		currentPageState.fontColor
	);
	const [fontSize, setFontSize] = useState<OptionType>(
		currentPageState.fontSizeOption
	);
	const [contentWidth, setContentWidth] = useState<OptionType>(
		currentPageState.contentWidth
	);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
		currentPageState.backgroundColor
	);

	const pageState = {
		fontFamilyOption: fontFamily,
		fontColor: fontColor,
		fontSizeOption: fontSize,
		contentWidth: contentWidth,
		backgroundColor: backgroundColor,
	};

	const paramsStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen,
	});

	function handleClick() {
		setOpen(!isOpen);
	}

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef,
		onClose: handleClick,
		onChange: setOpen,
	});

	useEffect(() => {
		setParamsState();
	}, [currentPageState]);

	function setParamsState() {
		setFontFamily(currentPageState.fontFamilyOption);
		setFontColor(currentPageState.fontColor);
		setFontSize(currentPageState.fontSizeOption);
		setContentWidth(currentPageState.contentWidth);
		setBackgroundColor(currentPageState.backgroundColor);
	}

	function saveData(event: SyntheticEvent) {
		event.preventDefault();
		setCurrentPageState(pageState);
		localStorage.setItem('pageState', JSON.stringify(pageState));
		setOpen(!isOpen);
	}

	function resetData() {
		setCurrentPageState(defaultArticleState);
		localStorage.setItem('pageState', JSON.stringify(defaultArticleState));
		setOpen(!isOpen);
	}

	return (
		<>
			<ArrowButton onClick={handleClick} isOpen={isOpen} />
			<aside className={paramsStyle} ref={rootRef}>
				<form className={styles.form} onSubmit={saveData}>
					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={setFontFamily}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						selected={fontSize}
						options={fontSizeOptions}
						onChange={setFontSize}
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={setBackgroundColor}
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetData} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
