import { EditableArea, EditableComponent } from '@magnolia/react-editor';
import { useEffect, useState } from 'react';
import { HomeHeader } from './Home';
import Footer from '../components/Footer';

function Basic(props) {
	const { title, description, main } = props;

	return (
		<div className="Basic">
			<HomeHeader />
			<div className="text-center">
				{title && <div className="page-title">{title}</div>}
				{description && <div className="text">{description}</div>}
			</div>
			{main && <EditableArea content={main} />}
			<Footer />
		</div>
	);
}

export default Basic;
