import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function Dropdown() {
  return (
    <DropdownButton id="dropdown-basic-button" title="&hellip;" variant="link">
      <Dropdown.Item href="#/action-1" disabled>
        Slideshow
      </Dropdown.Item>
      <Dropdown.Item href="#/action-2">Download</Dropdown.Item>
      <Dropdown.Item href="#/action-3" disabled>
        Rotate Left
      </Dropdown.Item>
      <Dropdown.Item href="#/action-3" disabled>
        Add to Album
      </Dropdown.Item>
      <Dropdown.Item href="#/action-3">Archive</Dropdown.Item>
    </DropdownButton>
  );
}

export default Dropdown;
