import React from "react";
import { Header } from "semantic-ui-react";
import PropTypes from "prop-types";

import RecentlyContactedItems from "./Recent/RecentlyContactedItems";

const FavoriteContacts = ({ favoriteContacts, onItemClick, moreOptions }) => {
  return (
    <>
      <Header size="medium">STARRED</Header>
      <RecentlyContactedItems
        onItemClick={onItemClick}
        items={favoriteContacts}
        moreOptions={moreOptions}
      />
    </>
  );
};

FavoriteContacts.propTypes = {
  favoriteContacts: PropTypes.objectOf(PropTypes.any).isRequired,
  onItemClick: PropTypes.func.isRequired,
  moreOptions: PropTypes.arrayOf(PropTypes.string),
};
FavoriteContacts.defaultProps = {
  moreOptions: [],
};
export default FavoriteContacts;
