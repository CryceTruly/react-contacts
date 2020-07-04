import React from "react";
import { Modal, Form, Image, Icon, Select, Button } from "semantic-ui-react";
import countries from "../../utils/countries";

import "./style.css";

const EditModal = ({
  open,
  setOpen,
  setContact,
  formProps: {
    onChange,
    newContactFormValid,
    loading,
    fieldErrors,
    onSubmit,
    inputRef,
    localURL,
    onImageChange,
    form: {
      contactPicture,
      firstName,
      phoneNumber,
      lastName,
      countryCode,
      isFavorite,
    },
  },
}) => {
  const square = { width: 175, height: 175 };


  return (
    <Modal
      open={open}
      centered={false}
      closeIcon
      onClose={() => {
        setOpen(false);
      }}
    >
      <Modal.Header>Edit Contact</Modal.Header>
      <Modal.Content>
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
                localURL || contactPicture
                  ? square
                  : { ...square, border: "1px solid #ccc" }
              }
              onClick={() => {
                inputRef.current && inputRef.current.click();
              }}
            >
              {localURL && (
                <Image circular src={localURL} height={175} width={175}></Image>
              )}
              {contactPicture && !localURL && (
                <Image
                  circular
                  src={contactPicture}
                  height={175}
                  width={175}
                ></Image>
              )}

              {!localURL && !contactPicture && (
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
            defaultChecked={isFavorite}
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
            Save
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default EditModal;
