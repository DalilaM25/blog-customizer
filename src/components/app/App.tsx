import { CSSProperties, useState } from 'react';
import styles from '../../styles/index.module.scss';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	const stateSubmit = (selectedState: ArticleStateType) => {
		setArticleState(selectedState);
	};

	const stateReset = () => {
		setArticleState(defaultArticleState);
	};

	return (
		<div
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm stateSubmit={stateSubmit} stateReset={stateReset} />
			<Article />
		</div>
	);
};
