import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";
import Thumbnail from "../../../components/common/Thumbnail";
import "./style.css";
import useWindowSize from "../../../utils/useWindowSize";
import ItemsPlaceholder from "../ItemsLoading";
import Message from "../../../components/common/Message";

const RecentlyContactedItems = ({
  items: { data, loading, error, fetchContacts, isSearchActive },
  onItemClick,
}) => {
  const { width } = useWindowSize();

  const userFavorites = data?.filter((item) => item.is_favorite) || [];

  const toShowIconsCheck = (items = []) => {
    return width < 700 || items?.length > 4;
  };

  const showScrollIcons = () => toShowIconsCheck(userFavorites);

  const listContainerRef = useRef(null);

  const onArrowRightClick = () => {
    listContainerRef.current.scrollBy({
      top: 0,
      left: 300,
      behavior: "smooth",
    });
  };

  const onArrowLeftClick = () => {
    listContainerRef.current.scrollBy({
      top: 0,
      left: -1000,
      behavior: "smooth",
    });
  };

  return (
    <>
      {!loading && data?.length === 0 && (
        <Message error={false} message="No Contacts to show" />
      )}
      {!loading &&
        data &&
        !isSearchActive &&
        userFavorites?.length === 0 &&
        data?.length !== 0 && (
          <Message
            error={false}
            message="Your favorite Contacts will appear here"
          />
        )}
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
      <div className="slide-container">
        {showScrollIcons() && (
          <Icon
            onClick={onArrowLeftClick}
            disabled={data?.length < 3}
            className="prevNextIcon"
            name="caret left"
            size="big"
          />
        )}
        <div className="items-container" ref={listContainerRef}>
          {loading && !data && !error ? (
            <>
              <ItemsPlaceholder />
              <ItemsPlaceholder />
              <ItemsPlaceholder />
              <ItemsPlaceholder />
              <ItemsPlaceholder />
              <ItemsPlaceholder />
              <ItemsPlaceholder />
            </>
          ) : (
            userFavorites &&
            userFavorites.map((user) => (
              <div
                className="single-item-container"
                onClick={() => onItemClick(user)}
              >
                <Thumbnail
                  circular
                  height={75}
                  width={75}
                  className="userpic"
                  style={{
                    height: 75,
                    width: 75,
                    fontSize: 27,
                    margin: "auto",
                    borderRadius: "50%",
                  }}
                  avatar={user.contact_picture}
                  name={user.first_name}
                  secondName={user.last_name}
                  alt={user.last_name}
                />
                <p className="single-line username">
                  {`${user.first_name} ${user.last_name}`}
                </p>
              </div>
            ))
          )}
        </div>
        {showScrollIcons() && (
          <Icon
            onClick={onArrowRightClick}
            disabled={data?.length < 3}
            className="prevNextIcon"
            name="caret right"
            size="big"
          />
        )}
      </div>
    </>
  );
};

RecentlyContactedItems.propTypes = {
  items: PropTypes.objectOf(PropTypes.any).isRequired,
  retryFn: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default RecentlyContactedItems;
