import { config } from "../magnolia.config";

import Img from "./Img";
import CTA from "./CTA";

import { EditablePage } from "@magnolia/react-editor";

import Footer from "/templates/components/Footer";

export default function ProductWatch(props) {
  const {
    name,
    tagLine,
    price,

    image,
    description,
    testimonial,
    headerPage,
  } = props;

  //   console.log("props.header 2:" + JSON.stringify(header, null, 2));

  if (props.error) {
    return "Not found.";
  }

  let cardClassName = "Card";

  return (
    <>
      <EditablePage content={headerPage} config={config} />

      <main>
        <div className="Card-wrapper">
          <div className={cardClassName}>
            {/* <div>
				<Img className="Card__image" image={image} />
			  </div> */}
            <div className="TextImage">
              <div className="row-center">
                <>
                  {renderImage(image)}
                  {renderText(name, tagLine, price)}
                </>
              </div>
            </div>

            <div className="Card__info">
              {/* {name && <div className="title">{name}</div>} */}
              {description && (
                <div
                  className="text"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}

              {testimonial && (
                <div
                  className="text Quote__quote"
                  dangerouslySetInnerHTML={{ __html: testimonial }}
                />
              )}
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}

function renderText(name, tagLine, price) {
  return (
    <div className="col-6 TextImage__text">
      {tagLine && <div className="supTitle">{tagLine}</div>}
      {name && <div className="title">{name}</div>}
      {price && <div className="title">${price}</div>}
      <div className="title">&nbsp;</div>
      <div className="text">
        <CTA
          className="btn-blue"
          pageLink=""
          webLink="https://www.magnolia-cms.com/"
          ctaTitle="Find a dealer"
        />
      </div>
    </div>
  );
}

function renderImage(image) {
  return image ? (
    <div className="col-6">
      <Img className="TextImage__image" image={image} withCaption={true} />
    </div>
  ) : null;
}

// export default ProductWatch;
