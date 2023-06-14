import Home from '../templates/pages/Home';
import Basic from '../templates/pages/Basic';
import Section from '../templates/components/Section';
import Carousel from '../templates/components/Carousel';
import Banner from '../templates/components/Banner';
import TextImage from '../templates/components/TextImage';
import Card from '../templates/components/Card';
import Columns from '../templates/components/Columns';
import Quote from '../templates/components/Quote';
import Map from '../templates/components/Map';
import Link from '../templates/components/Link';

export const config = {
	componentMappings: {
		'saas-demo:pages/Home': Home,
		'saas-demo:pages/Test': Home,
		'saas-demo:pages/Basic': Basic,

		'saas-demo:components/Section': Section,
		'saas-demo:components/Carousel': Carousel,
		'saas-demo:components/Banner': Banner,
		'saas-demo:components/TextImage': TextImage,
		'saas-demo:components/Card': Card,
		'saas-demo:components/Columns': Columns,
		'saas-demo:components/Quote': Quote,
		'saas-demo:components/Map': Map,
		'saas-demo:components/Link': Link,
	},
};
