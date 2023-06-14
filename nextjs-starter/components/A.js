import Link from 'next/link';

function A(props) {
	const { href, label } = props;

	return <Link href={href}>{label}</Link>;
}

export default A;
