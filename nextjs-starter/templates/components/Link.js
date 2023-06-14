import A from '../../components/A';

function PageLink(props) {
	const { label, pageLink, isButton, loggedInLabel, user } = props;
	const currentLabel = (user && loggedInLabel) || label;

	return currentLabel ? (
		<A
			className={'PageLink' + (isButton ? ' PageLink--button' : '')}
			href={pageLink}
			label={currentLabel}
		/>
	) : null;
}

export default PageLink;
