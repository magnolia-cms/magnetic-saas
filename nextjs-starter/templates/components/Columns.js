import { EditableArea } from '@magnolia/react-editor';

function Columns(props) {
	const { showCol1, col1, showCol2, col2, showCol3, col3, showCol4, col4 } =
		props;
	let colWidth =
		'col-' +
		12 / [showCol1, showCol2, showCol3, showCol4].filter(Boolean).length;

	return (
		<div className="Columns">
			<div className="row">
				{showCol1 && col1 && (
					<EditableArea className={colWidth} content={col1} />
				)}
				{showCol2 && col2 && (
					<EditableArea className={colWidth} content={col2} />
				)}
				{showCol3 && col3 && (
					<EditableArea className={colWidth} content={col3} />
				)}
				{showCol4 && col4 && (
					<EditableArea className={colWidth} content={col4} />
				)}
			</div>
		</div>
	);
}

export default Columns;
