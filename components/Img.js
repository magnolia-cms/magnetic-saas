// import { baseUrl } from '../utils/config';

function Img(props) {
	const { className, image, withCaption } = props;
	const caption = image?.metadata?.caption || image?.metadata?.fileName;

	return (
		image && (
			<>
				<img className={className} src={image['@link']} alt={caption} />
			</>
		)
	);
}

export default Img;
