import React from 'react';
import { EditableArea, EditableComponent } from '@magnolia/react-editor';

function renderHomeHeader({ content }: any) {
	console.table('content', content);
	return <div className="header">Header</div>;
}

export default function Home(props: any) {
	const { main, header } = props;

	console.log('props', props);
	return (
		<>
			<main>
				{header && <EditableArea content={header} />}

				{main && <EditableArea content={main} />}
			</main>
		</>
	);
}
