import React from "react";
import AppHeader from "../components/common";
import {
  Container,
  List,
  Button,
  Image,
  Label,
  Segment,
} from "semantic-ui-react";
import FavoriteContacts from "./Favorite";
import Thumbnail from "../components/common/Thumbnail";
import "./style.css";
import ContactDetailContainer from "../containers/contacts/Detail";

const ContactList = ({
  data: {
    contacts: { loading, data, error },
    detail,
  },
}) => {
  return (
    <div>
      <AppHeader />
      <Container>
        <FavoriteContacts
          onItemClick={(item) => {
            detail.onItemClicked(item);
          }}
          favoriteContacts={{ data, loading, error }}
        />

        <Segment>
          All Contacts
          <List verticalAlign="middle">
            {data?.map((el) => (
              <List.Item
                onClick={() => {
                  detail.onItemClicked(el);
                }}
              >
                <List.Content floated="right">
                  <span>
                    {el.country_code}
                    {el.phone_number}
                  </span>
                </List.Content>

                <List.Content className="bio">
                  {" "}
                  <Thumbnail
                    style={{ width: 55, height: 55 }}
                    avatar={el.contact_picture}
                  />{" "}
                  {el.first_name}
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Segment>
      </Container>

      <ContactDetailContainer {...detail} />
    </div>
  );
};

export default ContactList;
