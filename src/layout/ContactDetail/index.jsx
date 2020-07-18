import React, { useState, useContext, useEffect } from "react";
import {
  Modal,
  Button,
  Header,
  Icon,
  Flag,
  Confirm,
  TransitionablePortal,
} from "semantic-ui-react";
import countries from "../../utils/countries";
import Thumbnail from "../../components/common/Thumbnail";
import EditContactContainer from "../../containers/contacts/Edit";
import { GlobalContext } from "../../context/GlobalState";
import {
  deleteContact,
  starContact,
  clearEdit,
} from "../../context/actions/contacts";
import cogoToast from "cogo-toast";

const ContactDetail = ({ open, contact, setOpen, setContact }) => {
  const {
    contactsState: {
      deleteContact: { loading, data },
      starContact: { loading: starLoading, data: newContact },
    },
    contactsDispatch: dispatch,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (starLoading) {
      cogoToast.info("Working...", { hideAfter: 1 });
    }
  }, [starLoading]);

  useEffect(() => {
    if (newContact) {
      cogoToast.success("Success...");
      setContact(newContact);
      clearEdit()(dispatch);
    }
  }, [newContact]);

  useEffect(() => {
    if (data?.status === 204) {
      setContact(null);
      setOpen(false);
      setEditOpen(false);
      cogoToast.success(`Contact deleted successfully`, {
        hideAfter: 10,
      });
    }
  }, [data]);

  const [editOpen, setEditOpen] = useState(false);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleCancel = () => {
    setDeleteConfirmOpen(false);
  };

  const handleConfirm = () => {
    setDeleteConfirmOpen(false);
    deleteContact(contact.id)(dispatch);
  };
  return (
    <>
      <TransitionablePortal
        closeOnDocumentClick={false}
        open={deleteConfirmOpen}
        onClose={handleCancel}
      >
        <Confirm
          closeOnDocumentClick={false}
          open={deleteConfirmOpen}
          centered={false}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      </TransitionablePortal>

      {contact && (
        <EditContactContainer
          contact={contact}
          open={editOpen}
          setContact={setContact}
          setOpen={setEditOpen}
        />
      )}
      <TransitionablePortal
        closeIcon
        open={open}
        closeOnDocumentClick={false}
        onClose={() => {
          setOpen(false);
          setContact(null);
        }}
      >
        <Modal
          closeIcon
          open={open}
          closeOnDocumentClick={false}
          onClose={() => {
            setOpen(false);
            setContact(null);
          }}
          centered={false}
        >
          <Modal.Header
            style={{
              display: "flex",
              alignSelf: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              className="left-bio"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Thumbnail
                name={contact?.first_name}
                secondName={contact?.last_name}
                avatar={contact?.contact_picture}
              />

              <span>
                {contact?.first_name} {contact?.last_name}
              </span>
              <Icon
                color={contact?.is_favorite ? "red" : "grey"}
                name={contact?.is_favorite ? "star" : "star outline"}
              />
            </div>

            <div className="right-icons">
              <Button
                basic
                disabled={starLoading}
                onClick={() =>
                  starContact(contact?.is_favorite, contact?.id)(dispatch)
                }
              >
                {contact?.is_favorite ? "unstar" : "Star"}
              </Button>

              <Button
                icon
                labelPosition="right"
                positive
                basic
                onClick={() => {
                  setEditOpen(true);
                }}
              >
                Edit
                <Icon name="edit" />
              </Button>

              <Button
                icon
                loading={loading}
                disabled={loading}
                basic
                labelPosition="right"
                onClick={() => {
                  setDeleteConfirmOpen(true);
                }}
                negative
              >
                Delete
                <Icon name="delete" />
              </Button>
            </div>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Contact Details</Header>

              <Icon name="phone" inline />

              <Flag
                inline
                name={
                  countries.find((item) => item.value === contact?.country_code)
                    ?.flag
                }
              />

              <span>{contact?.phone_number}</span>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </TransitionablePortal>
    </>
  );
};

export default ContactDetail;
