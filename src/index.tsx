import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const localPageState = localStorage.getItem('pageState');
	const pageState =
		localPageState && localPageState !== null
			? JSON.parse(localPageState)
			: defaultArticleState;
	const [currentPageState, setCurrentPageState] = useState(pageState);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': currentPageState.fontFamilyOption.value,
					'--font-size': currentPageState.fontSizeOption.value,
					'--font-color': currentPageState.fontColor.value,
					'--container-width': currentPageState.contentWidth.value,
					'--bg-color': currentPageState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				currentPageState={currentPageState}
				setCurrentPageState={setCurrentPageState}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
