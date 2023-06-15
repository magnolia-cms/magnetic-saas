import Link from 'next/link';

function A(props) {
	const { className, href, label } = props;

	return (
		<Link className={className} href={href}>
			{label}
		</Link>
	);
}

export default A;
