import { storage } from "../../../firebase";

import { createContact } from "../../../context/actions/contacts";

export default async (file, form, dispatch) => {
  storage
    .ref(`/images/${file.name}`)
    .put(file)
    .on(
      "state_changed",
      (snapShot) => { },
      async (err) => {
        //catches the errors
        return err;
      },
      async () => {
        // gets the functions from storage references the image storage in firebase by the children
        const url = await storage
          .ref("images")
          .child(file.name)
          .getDownloadURL();

        if (url) {
          createContact({ ...form, contactPicture: url })(dispatch);
        }
      }
    );
};
