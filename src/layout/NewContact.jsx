import React from "react";
import {
  Form,
  Button,
  Grid,
  Header,
  Card,
  Image,
  Icon,
  Select,
} from "semantic-ui-react";
import AppHeader from "../components/common";
import { Prompt } from "react-router-dom";
import "./new-contact.css";
import countries from "../utils/countries";

const NewContact = ({
  formProps: {
    onChange,
    newContactFormValid,
    loading,
    fieldErrors,
    onSubmit,
    form,
    inputRef,
    localURL,
    onImageChange,
  },
}) => {
  const formIsHalfFilledOut =
    Object.values(form).filter((item) => item !== "").length > 1;

  const square = { width: 175, height: 175 };

  return (
    <>
      <AppHeader />

      <Prompt
        when={formIsHalfFilledOut}
        message="You have unsaved changes Are you sure you want to leave?"
      />

      <Grid centered verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 650, marginTop: 50 }}>
          <Header as="h2">New Contact</Header>
          <Card fluid>
            <Card.Content>
              <Form unstackable autoComplete="off">
                <input
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  onChange={onImageChange}
                  style={{ display: "none" }}
                />
                <div className="image-container">
                  <div
                    style={
                      localURL
                        ? square
                        : { ...square, border: "1px solid #ccc" }
                    }
                    onClick={() => {
                      inputRef.current && inputRef.current.click();
                    }}
                  >
                    {localURL && (
                      <Image
                        circular
                        src={localURL}
                        height={175}
                        width={175}
                      ></Image>
                    )}

                    {!localURL && (
                      <h5 style={{ margin: "60px" }}>choose picture</h5>
                    )}
                  </div>
                  <Icon
                    size="large"
                    name="edit"
                    onClick={() => {
                      inputRef.current && inputRef.current.click();
                    }}
                  />
                </div>

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
                    control={Select}
                    options={countries}
                    name="countryCode"
                    label="Country Code"
                    placeholder="Country Code"
                  />
                  <Form.Input
                    onChange={onChange}
                    name="phoneNumber"
                    label="Phone Number"
                    placeholder="Phone Number"
                  />
                </Form.Group>
                <Form.Checkbox
                  name="isFavorite"
                  onChange={(e, data) => {
                    onChange(e, {
                      name: "isFavorite",
                      value: data.checked,
                    });
                  }}
                  label="Add to Favorites"
                />
                <Button
                  disabled={newContactFormValid}
                  onClick={onSubmit}
                  loading={loading}
                  primary
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
