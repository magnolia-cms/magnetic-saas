import A from './A';

function CTA(props) {
	const { ctaTitle, pageLink } = props;

	return ctaTitle ? (
		<A className="cta-button" href={pageLink['@path']} label={ctaTitle} />
	) : null;
}

export default CTA;
