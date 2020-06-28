import React from "react";
import { Segment } from "semantic-ui-react";
import PropTypes from "prop-types";

import RecentlyContactedItems from "./Recent/RecentlyContactedItems";

const FavoriteContacts = ({ favoriteContacts, onItemClick, moreOptions }) => {
  const hasLoadedandIsEmpty = () => {
    const { data, loading, error } = favoriteContacts;

    if (!loading && !error) {
      if (Array.isArray(data)) {
        return true;
      }
    }
    return true;
  };
  return (
    <>
      <Segment style={{ marginTop: "-15px" }}>
        <div className="favorite-contacts">Favorite Contacts</div>
        <RecentlyContactedItems
          onItemClick={onItemClick}
          items={favoriteContacts}
          moreOptions={moreOptions}
        />
      </Segment>
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
