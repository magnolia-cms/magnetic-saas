import Link from 'next/link';
import { spaRootNodePath } from '../utils/api';

function A(props) {
	const { className, href, label } = props;

	let newLink = href;

	if (spaRootNodePath) {
		newLink = href.replace(spaRootNodePath, '');
	}

	return (
		<Link className={className} href={newLink}>
			{label}
		</Link>
	);
}

export default A;
