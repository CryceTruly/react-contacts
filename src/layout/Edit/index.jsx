import React from "react";
import {
  Modal,
  Card,
  Form,
  Image,
  Icon,
  Select,
  Button,
} from "semantic-ui-react";
import countries from "../../utils/countries";

import "./style.css";

const EditModal = ({
  open,
  setOpen,
  formProps: {
    onChange,
    newContactFormValid,
    loading,
    fieldErrors,
    onSubmit,
    inputRef,
    localURL,
    onImageChange,
    form: { contactPicture, firstName, phoneNumber, lastName, countryCode },
  },
}) => {
  const square = { width: 175, height: 175, border: "1px solid #ccc" };

  return (
    <Modal
      open={open}
      centered={false}
      closeIcon
      onClose={() => {
        setOpen(false);
      }}
    >
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
              <Image
                circular
                style={square}
                src={contactPicture || localURL}
              ></Image>
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
                value={firstName}
              />
              <Form.Input
                name="lastName"
                onChange={onChange}
                value={lastName}
                label="Last name"
                placeholder="Last name"
              />
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input
                onChange={onChange}
                control={Select}
                options={countries}
                value={countryCode}
                name="countryCode"
                label="Country Code"
                placeholder="Country Code"
              />
              <Form.Input
                onChange={onChange}
                name="phoneNumber"
                label="Phone Number"
                value={phoneNumber}
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
              Save
            </Button>
          </Form>
        </Card.Content>
      </Card>
    </Modal>
  );
};

export default EditModal;
