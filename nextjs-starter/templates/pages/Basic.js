import { EditableArea, EditableComponent } from '@magnolia/react-editor';
import { useLayoutEffect, useState } from 'react';
import { renderHomeHeader } from './Home';

function Basic(props) {
	const { title, description, main } = props;

	const [header, setHeader] = useState();

	useLayoutEffect(() => {
		setHeader(JSON.parse(sessionStorage.getItem('header')));
	}, []);

	return (
		<div className="Basic">
			<div className="text-center">
				{title && <div className="page-title">{title}</div>}
				{description && <div className="text">{description}</div>}
			</div>

			{header && (
				<EditableArea content={header} customView={renderHomeHeader} />
			)}
			{main && <EditableArea content={main} />}
		</div>
	);
}

export default Basic;
