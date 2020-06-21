import React from "react";
import { Form, Button, Grid, Header, Card, Image } from "semantic-ui-react";
import AppHeader from "../components/common";

const NewContact = ({
  formProps: { onChange, newContactFormValid, loading, fieldErrors, onSubmit },
}) => {
  return (
    <>
      <AppHeader />

      <Grid centered verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 650, marginTop: 50 }}>
          <Header as="h2">New Contact</Header>
          <Card fluid>
            <Card.Content>
              <Form unstackable autoComplete="off">
                <Form.Group widths={2}>
                  <Form.Input
                    name="firstName"
                    label="First name"
                    onChange={onChange}
                    placeholder="First name"
                  />
                  <Form.Input
                    name="lastName"
                    onChange={onChange}
                    label="Last name"
                    placeholder="Last name"
                  />
                </Form.Group>
                <Form.Group widths={2}>
                  <Form.Input
                    onChange={onChange}
                    name="countryCode"
                    label="Country Code"
                    placeholder="Country Code"
                  />
                </Form.Group>
                <Form.Group widths={2}>
                  <Form.Input
                    onChange={onChange}
                    name="phoneNumber"
                    label="Phone Number"
                    placeholder="Phone Number"
                  />
                  <Form.Input
                    onChange={onChange}
                    name="contactPicture"
                    label="Contact Picture"
                    placeholder="Contact Picture"
                  />
                </Form.Group>
                <Form.Checkbox
                  name="isFavorite"
                  onChange={(e) => {
                    onChange(e, {
                      name: "isFavorite",
                      value: e.target.checked,
                    });
                  }}
                  label="Add to Favorites"
                />
                <Button
                  disabled={newContactFormValid}
                  onClick={onSubmit}
                  loading={loading}
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default NewContact;
