import { EditableArea } from "@magnolia/react-editor";
import { renderHomeHeader } from "./Home";
import Footer from "../components/Footer";

function Basic(props) {
  const { title, description, main, header } = props;

  return (
    <div className="Basic">
      {/* <HomeHeader /> */}
      {header && (
        <EditableArea content={header} customView={renderHomeHeader} />
      )}
      <div className="text-center">
        {title && <div className="page-title">{title}</div>}
        {description && <div className="text">{description}</div>}
      </div>
      {main && <EditableArea content={main} />}
      <Footer />
    </div>
  );
}

export default Basic;
