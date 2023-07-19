import Img from "../../components/Img";
import CTA from "../../components/CTA";

function renderText(supTitle, title, text, pageLink, webLink, ctaTitle) {
  return supTitle || title || text ? (
    <div className="col-6 TextImage__text">
      {supTitle && <div className="supTitle">{supTitle}</div>}
      {title && <div className="title">{title}</div>}
      {text && (
        <div className="text" dangerouslySetInnerHTML={{ __html: text }} />
      )}

      <CTA
        className="btn-blue"
        pageLink={pageLink}
        webLink={webLink}
        ctaTitle={ctaTitle}
      />
    </div>
  ) : null;
}

function renderImage(image) {
  return image ? (
    <div className="col-6">
      <Img className="TextImage__image" image={image} withCaption={true} />
    </div>
  ) : null;
}

function TextImage(props) {
  const {
    supTitle,
    title,
    text,
    image,
    pageLink,
    webLink,
    ctaTitle,
    imageLeft,
  } = props;

  return (
    <div className="TextImage">
      <div className="row-center">
        {imageLeft ? (
          <>
            {renderImage(image)}
            {renderText(supTitle, title, text, pageLink, webLink, ctaTitle)}
          </>
        ) : (
          <>
            {renderText(supTitle, title, text, pageLink, webLink, ctaTitle)}
            {renderImage(image)}
          </>
        )}
      </div>
    </div>
  );
}

export default TextImage;
