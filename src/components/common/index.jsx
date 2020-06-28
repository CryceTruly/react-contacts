import React from "react";
import { Menu, Container, Button, Image, Icon } from "semantic-ui-react";
import logo from "./logo.svg";
import { Link, useLocation, useHistory } from "react-router-dom";

const AppHeader = () => {
  const location = useLocation();
  const url = location.pathname;
  const history = useHistory();
  return (
    <Menu pointing={true} secondary={true} size="huge">
      <Image src={logo} width={60} />
      <Menu.Item
        as={Link}
        to="/"
        style={{ marginLeft: -35, fontSize: 24, paddingRight: 5 }}
      >
        ContactsList
      </Menu.Item>
      {url === "/" && (
        <Menu.Item position="right">
          <Button
            as={Link}
            to="/contacts/create"
            inverted={true}
            primary={true}
            size="tiny"
            style={{ marginLeft: "0.5em" }}
          >
            New Contact
          </Button>
          &nbsp; &nbsp; &nbsp;
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              history.push("/auth/login");
            }}
            size="tiny"
            inverted={true}
            content="Log out"
            primary
          />
        </Menu.Item>
      )}
    </Menu>
  );
};

export default AppHeader;
