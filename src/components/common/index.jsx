import React, { useContext } from "react";
import { Menu, Button, Image, Icon, Input } from "semantic-ui-react";
import logo from "./logo.svg";
import { Link, useLocation, useHistory } from "react-router-dom";
import { searchContacts } from "../../context/actions/contacts";
import { GlobalContext } from "../../context/GlobalState";
import { logout } from "../../context/actions/auth";

const AppHeader = () => {
  const location = useLocation();
  const history = useHistory();
  const { contactsDispatch: dispatch } = useContext(GlobalContext);
  const path = location.pathname;
  const onChange = (e, { value }) => {
    searchContacts(value?.trim()?.replace(/" "/g, ""))(dispatch);
  };

  return (
    <Menu pointing={true} secondary={true}>
      <Image src={logo} width={60} />
      <Menu.Item
        as={Link}
        to="/"
        style={{ marginLeft: -35, fontSize: 24, paddingRight: 5 }}
      >
        TrulyContacts
      </Menu.Item>

      {path === "/" && (
        <Menu.Item position="right">
          <Input
            icon="search"
            placeholder="Search..."
            onChange={onChange}
            style={{ width: 300 }}
          />
        </Menu.Item>
      )}
      {localStorage.token && (
        <>
          <Menu.Item position="right">
            <Button
              basic
              as={Link}
              to="/contacts/create"
              primary={true}
              size="tiny"
            >
              <Icon name="add" />
              New Contact
            </Button>
          </Menu.Item>

          <Menu.Item>
            <Button
              color="red"
              icon
              basic
              onClick={() => {
                logout(history)(dispatch);
              }}
              size="tiny"
            >
              <Icon name="log out" />
              Log out
            </Button>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default AppHeader;
