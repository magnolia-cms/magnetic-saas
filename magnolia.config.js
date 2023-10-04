import Home from "./templates/pages/Home";
import Basic from "./templates/pages/Basic";
import BasicHeader from "./templates/pages/BasicHeader";

import Section from "./templates/components/Section";
import Carousel from "./templates/components/Carousel";
import Banner from "./templates/components/Banner";
import TextImage from "./templates/components/TextImage";
import Card from "./templates/components/Card";
import Columns from "./templates/components/Columns";
import Quote from "./templates/components/Quote";
import Map from "./templates/components/Map";
import Link from "./templates/components/Link";
import ContactForm from "./templates/components/ContactForm";
import Watch from "./templates/components/Watch";

export const config = {
  componentMappings: {
    "saas-demo:pages/Home": Home,
    "saas-demo:pages/Basic": Basic,
    "saas-demo:pages/BasicHeader": BasicHeader,

    "saas-demo:components/Section": Section,
    "saas-demo:components/Carousel": Carousel,
    "saas-demo:components/Banner": Banner,
    "saas-demo:components/TextImage": TextImage,
    "saas-demo:components/Card": Card,
    "saas-demo:components/Columns": Columns,
    "saas-demo:components/Quote": Quote,
    "saas-demo:components/Map": Map,
    "saas-demo:components/Link": Link,
    "saas-demo:components/ContactForm": ContactForm,
    "saas-demo:components/Watch": Watch,
  },
};
