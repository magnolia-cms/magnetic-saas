import { EditableArea } from "@magnolia/react-editor";
import { renderHomeHeader } from "./Home";

function BasicHeader(props) {
  const { header } = props;

  return (
    <div className="BasicHeader">
      {/* <HomeHeader /> */}
      {header && (
        <EditableArea content={header} customView={renderHomeHeader} />
      )}
    </div>
  );
}

export default BasicHeader;
