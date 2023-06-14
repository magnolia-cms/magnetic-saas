// import { baseUrl } from '../utils/config';

function Img(props) {
	const { className, image, withCaption } = props;
	const caption = image?.metadata?.caption || image?.metadata?.fileName;

	return (
		image && (
			<>
				<img className={className} src={image['@link']} alt={caption} />
				{withCaption && <div className="Img__caption">{caption}</div>}
			</>
		)
	);
}

export default Img;
