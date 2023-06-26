import A from '../../components/A';
import Img from '../../components/Img';
import CTA from '../../components/CTA';

function Card(props) {
	const { supTitle, title, text, image, cta, created, transparentBg } = props;

	let cardClassName = 'Card';

	if (transparentBg) cardClassName += ' transparent';

	return (
		<div className="Card-wrapper">
			<div className={cardClassName}>
				<div>
					<Img className="Card__image" image={image} />
				</div>
				<div className="Card__info">
					{created ? (
						<div>
							{new Date(created).toLocaleDateString('en-GB')}
						</div>
					) : null}
					{supTitle && <div className="supTitle">{supTitle}</div>}
					{title && <div className="title">{title}</div>}
					{text && (
						<div
							className="text"
							dangerouslySetInnerHTML={{ __html: text }}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default Card;
