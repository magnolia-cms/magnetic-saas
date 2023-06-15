import React from 'react';
import { EditableArea, EditableComponent } from '@magnolia/react-editor';
import A from '../../components/A';
import Img from '../../components/Img';
import { useEffect } from 'react';

function renderHomeHeader(props: any) {
	const { content } = props;
	const { pageLink, logo } = content;

	console.log('content', content);

	return (
		<header>
			<nav>
				<ul className="nav-links">
					{content['@nodes'].map((nodeName: any) => (
						<li key={content[nodeName]['@id']}>
							<EditableComponent
								content={{ ...content[nodeName] }}
							/>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}

export default function Home(props: any) {
	const { main, header } = props;

	return (
		<>
			<main>
				{header && (
					<EditableArea
						content={header}
						customView={renderHomeHeader}
					/>
				)}

				{main && <EditableArea content={main} />}
			</main>
		</>
	);
}
