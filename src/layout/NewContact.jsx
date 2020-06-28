import React, { useState } from "react";
import {
  Form,
  Button,
  Grid,
  Header,
  Card,
  Image,
  Popup,
  Segment,
  Icon,
  Select,
} from "semantic-ui-react";
import AppHeader from "../components/common";
import { Prompt } from "react-router-dom";

import "./new-contact.css";
import { useRef } from "react";
import countries from "../utils/countries";

const NewContact = ({
  formProps: {
    onChange,
    newContactFormValid,
    loading,
    fieldErrors,
    onSubmit,
    inputRef,
    localURL,
    onImageChange,
  },
}) => {
  const formIsHalfFilledOut = newContactFormValid;

  const square = { width: 175, height: 175, border: "1px solid #ccc" };

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
                  <Image circular style={square} src={localURL}></Image>
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
