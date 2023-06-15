import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar
      bg="white"
      expand="lg"
      className="border-bottom"
      style={{ height: "64px" }}
    >
      <Container fluid>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Navbar.Brand
            style={{ width: "250px" }}
            className="ms-2 d-flex flex-row align-items-center"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png"
              alt="logo"
              style={{ height: "22px" }}
              className="img img-fluid"
            />
            <h5 className="ms-1 mb-0 text-muted fw-normal">Photos</h5>
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse
          className="d-flex flex-row justify-content-between  "
          id="navbarScroll"
        >
          <Form className="d-flex " style={{ width: "50%", maxWidth: "700px" }}>
            <Form.Control
              type="search"
              placeholder="   Search your photos"
              className="me-2 py-2"
              aria-label="Search"
              style={{
                border: "none",
                background: "rgb(241,243,244)",
                height: "50px",
              }}
            />
          </Form>

          <Nav
            className="my-2 my-lg-0 me-3 w-25 d-flex fs-6 flex-row text-secondary justify-content-between align-items-center"
            style={{ maxHeight: "100px", maxWidth: "250px" }}
            navbarScroll
          >
            <span className="upload hover-pointer">
              <i className="fa-solid fa-upload me-2"></i>
              Upload
            </span>

            <i className="fa-regular fa-circle-question hover-pointer"></i>

            <i className="fa-solid fa-gear hover-pointer"></i>

            <div className="profile hover-pointer" style={{ width: "50px" }}>
              <img
                src="https://media.licdn.com/dms/image/C5603AQFniDLv2JCakw/profile-displayphoto-shrink_200_200/0/1639730969038?e=1692230400&v=beta&t=ASCa0waPnzbJ9o8LW93Uj9oPepsuBNkgOkTvkYurrpg"
                alt="profile"
                className="profile-link-img img-fluid rounded-5"
              />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
