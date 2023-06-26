import { useEffect, useState, useContext } from 'react';
import { EditableArea, EditableComponent } from '@magnolia/react-editor';

function renderCarousel({ content }) {
	const [active, setActive] = useState(0);
	const length = content['@nodes'].length;

	function prev() {
		setActive((prevActive) =>
			prevActive === 0 ? length - 1 : prevActive - 1
		);
	}

	function next() {
		setActive((prevActive) =>
			prevActive === length - 1 ? 0 : prevActive + 1
		);
	}

	useEffect(() => {
		const interval = setInterval(next, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="Carousel">
			{length > 1 && (
				<>
					<div
						className="Carousel__nav Carousel__nav--prev"
						onClick={prev}
					/>
					<div
						className="Carousel__nav Carousel__nav--next"
						onClick={next}
					/>
				</>
			)}
			{length > 0 && (
				<>
					{content['@nodes'].map((nodeName, i) => {
						const node = content[nodeName];
						let className = 'Carousel__Item';

						if (i === active)
							className += ' Carousel__Item--active';

						return (
							<div key={node['@id']} className={className}>
								<EditableComponent content={node} />
							</div>
						);
					})}
				</>
			)}
		</div>
	);
}

function Carousel(props) {
	const { items } = props;

	return items ? (
		<EditableArea content={items} customView={renderCarousel} />
	) : null;
}

export default Carousel;
