import A from "./A";

function CTA(props) {
  const { ctaTitle, pageLink, webLink } = props;

  return ctaTitle && (pageLink || webLink) ? (
    <A
      className="btn-blue"
      href={pageLink ? pageLink["@path"] : webLink}
      label={ctaTitle}
    />
  ) : null;
}

export default CTA;
