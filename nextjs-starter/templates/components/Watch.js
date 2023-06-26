import A from "../../components/A";
import Img from "../../components/Img";
import CTA from "../../components/CTA";

function Watch(props) {
  const { title, watchLink, transparentBg } = props;

  let cardClassName = "Card";

  if (transparentBg) cardClassName += " transparent";

  return (
    <div className="Card-wrapper">
      <div className={cardClassName}>
        <div>
          <Img className="Card__image" image={watchLink.image} />
        </div>
        <div className="Card__info">
          <div className="title">{title || watchLink.name}</div>
          {watchLink.tagLine && (
            <div className="supTitle">{watchLink.tagLine}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Watch;
