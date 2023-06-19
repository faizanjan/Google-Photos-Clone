import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function MoreInfo() {
  return (
    <DropdownButton
      className="d-inline custom-dropdown"
      id="dropdown-basic-button"
      title="&#8942;"
      variant="link"
    >
        <Dropdown.Item className="px-4 py-3"  disabled>
          Slideshow
        </Dropdown.Item>
        <Dropdown.Item className="px-4 py-3" >Download</Dropdown.Item>
        <Dropdown.Item className="px-4 py-3"  disabled>
          Rotate Left
        </Dropdown.Item>
        <Dropdown.Item className="px-4 py-3"  disabled>
          Add to Album
        </Dropdown.Item>
        <Dropdown.Item className="px-4 py-3" >Archive</Dropdown.Item>
    </DropdownButton>
  );
}

export default MoreInfo;
