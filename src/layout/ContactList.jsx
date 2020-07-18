import React from "react";
import { Container, List, Header } from "semantic-ui-react";
import FavoriteContacts from "./Favorite";
import Thumbnail from "../components/common/Thumbnail";
import "./style.css";
import ContactDetailContainer from "../containers/contacts/Detail";
import Message from "../components/common/Message";
import ItemsPlaceholder from "./Favorite/ItemsLoading";
import AppHeader from "../components/common/Header";

const ContactList = ({
  data: {
    fetchContacts,
    contacts: { loading, data, isSearchActive, foundContacts, error },
    detail,
  },
}) => {
  const currentContacts = isSearchActive ? foundContacts : data;
  return (
    <div>
      <AppHeader />
      <Container className="contacts-wrapper">
        <FavoriteContacts
          onItemClick={(item) => {
            detail.onItemClicked(item);
          }}
          favoriteContacts={{
            data: currentContacts,
            loading,
            error,
            isSearchActive,
            fetchContacts,
          }}
        />
        <Header size="medium">ALL </Header>
        {error && !loading && (
          <Message
            error
            message={error.detail ? error.detail : error}
            action={{
              onClick: () => {
                fetchContacts();
              },
            }}
          />
        )}

        {!loading && currentContacts?.length === 0 && (
          <Message error={false} message="No Contacts to show" />
        )}

        {loading && (
          <>
            <ItemsPlaceholder />
            <ItemsPlaceholder />
            <ItemsPlaceholder />
          </>
        )}

        <List>
          {currentContacts?.map((el) => (
            <List.Item
              className="list-item"
              onClick={() => {
                detail.onItemClicked(el);
              }}
            >
              <List.Content floated="right">
                <span className="phone-number">
                  {el.country_code}
                  {el.phone_number}
                </span>
              </List.Content>

              <List.Content className="bio">
                {" "}
                <Thumbnail
                  avatar={el.contact_picture}
                  name={el.first_name}
                  secondName={el.last_name}
                />{" "}
                <span className="name">
                  {el.first_name} {el.last_name}
                </span>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Container>
      <ContactDetailContainer {...detail} />
    </div>
  );
};

export default ContactList;
