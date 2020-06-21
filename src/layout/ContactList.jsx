import React from "react";
import AppHeader from "../components/common";
import { Container, List, Button, Image, Label } from "semantic-ui-react";

const ContactList = ({ data: { loading, data, error } }) => {
  return (
    <div>
      <AppHeader />
      <Container>
        <List divided verticalAlign="middle">
          {data?.map((el) => (
            <List.Item>
              <List.Content floated="right">
                <Label>
                  {el.country_code}
                  {el.phone_number}
                </Label>
              </List.Content>
              <Image avatar src={el.contact_picture} />
              <List.Content>{el.first_name}</List.Content>
            </List.Item>
          ))}
        </List>
      </Container>
    </div>
  );
};

export default ContactList;
