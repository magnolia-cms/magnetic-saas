import { EditableArea } from '@magnolia/react-editor';

function Basic(props) {
	const { title, description, main } = props;

	return (
		<div className="Basic">
			<div className="text-center">
				{title && <div className="page-title">{title}</div>}
				{description && <div className="text">{description}</div>}
			</div>
			{main && <EditableArea content={main} />}
		</div>
	);
}

export default Basic;
