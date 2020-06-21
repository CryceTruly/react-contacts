import React from "react";
import { Menu, Container, Button, Image } from "semantic-ui-react";
import logo from "./logo.svg";
import { Link, useLocation } from "react-router-dom";

const AppHeader = () => {
  const location = useLocation();
  const url = location.pathname;
  return (
    <Menu pointing={true} secondary={true} size="huge">
      <Image src={logo} width={60} />
      <Menu.Item as="h2" style={{ marginLeft: -35 }}>
        ContactsList
      </Menu.Item>
      {url === "/" && (
        <Menu.Item position="right">
          <Button as={Link} to="/auth/login" inverted={true} primary>
            Log in
          </Button>
          <Button
            as={Link}
            to="/contacts/create"
            inverted={true}
            primary={true}
            style={{ marginLeft: "0.5em" }}
          >
            New Contact
          </Button>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default AppHeader;
