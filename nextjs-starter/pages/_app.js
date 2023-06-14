import '../styles/grid.css';
import '../styles/globals.css';
import '../styles/desktop.css';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
