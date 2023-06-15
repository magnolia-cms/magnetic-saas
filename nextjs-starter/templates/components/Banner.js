import Img from '../../components/Img';
import CTA from '../../components/CTA';

function Banner(props) {
	const { supTitle, title, text, image, cta } = props;

	return (
		<div className="Banner">
			<Img className="Banner__image" image={image} />
			<div className="Banner__imageMask">
				<div className="Banner__info">
					{supTitle && <div className="supTitle">{supTitle}</div>}
					{title && <div className="title">{title}</div>}
					{text && (
						<div
							className="text"
							dangerouslySetInnerHTML={{ __html: text }}
						/>
					)}
					<CTA className="btn-white" cta={cta} />
				</div>
			</div>
		</div>
	);
}

export default Banner;
