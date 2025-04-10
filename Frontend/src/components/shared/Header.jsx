import NavBar from "react-bootstrap/NavBar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./SearchBox";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Store } from "../../store";
import { USER_SIGNOUT } from "../../actions";
import Badge from "react-bootstrap/Badge";

const Header = () => {
  const navigate = useNavigate();
  const {
    state: {
      userInfo,
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store);

  const handleLogout = () => {
    dispatch({ type: USER_SIGNOUT });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };

  return (
    <header>
      <NavBar bg="dark" variant="dark">
        <Container>
          {/*TODO: maybe we will implement proper logic*/}
          <Link onClick={() => navigate(-1)}>
            {location.pathname !== "/" && (
              <i className="fas fa-arrow-left text-white align-arrow-right">
                Back
              </i>
            )}
          </Link>
          <Link to="/">
            <NavBar.Brand>
              <img
                src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695"
                width={80}
                alt="amazon logo"
              />
            </NavBar.Brand>
          </Link>{" "}
          <SearchBox />
          <nav className="d-flex align-items-center justify-content-end me-2 ms-4">
            <Link to={'/cart'} className="me-2 nav-link">
              <i className="fas fa-shopping-cart text-white"></i>
              {cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
          </nav>
          {userInfo ? (
            <NavDropdown className="text-white" title={userInfo.name}>
              <LinkContainer to="/profile">
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/orderhistory">
                <NavDropdown.Item>Order History</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <Link
                className="dropdown-item"
                to="#signout"
                onClick={handleLogout}
              >
                Sign Out
              </Link>
            </NavDropdown>
          ) : (
            <NavDropdown className="text-white" title="Sign In">
              <LinkContainer
                className="me-2 ms-2 text-black nav-link"
                to="/signin"
              >
                <NavDropdown.Item>Sign in</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer
                className="me-2 ms-2 text-black nav-link"
                to="/signup"
              >
                <NavDropdown.Item>Sign up</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          )}
        </Container>
      </NavBar>
    </header>
  );
};

export default Header;
