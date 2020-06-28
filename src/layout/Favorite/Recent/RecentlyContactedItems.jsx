import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";
import Thumbnail from "../../../components/common/Thumbnail";
import "./style.css";
import useWindowSize from "../../../utils/useWindowSize";
import ItemsPlaceholder from "../ItemsLoading";

const RecentlyContactedItems = ({
  items: { data, loading, error },
  onItemClick,
}) => {
  const { width } = useWindowSize();

  const userFavorites = () => data?.filter((item) => item.is_favorite);


  const toShowIconsCheck = (items = []) => {
    if (items) {
      return width < 700 || items.length > 0;
    }
    return false;
  };

  const showScrollIcons = () => toShowIconsCheck(data) && !loading;

  const listContainerRef = useRef(null);

  const onArrowRightClick = () => {
    listContainerRef.current.scrollBy({
      top: 0,
      left: 200,
      behavior: "smooth",
    });
  };

  const onArrowLeftClick = () => {
    listContainerRef.current.scrollBy({
      top: 0,
      left: -200,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="slide-container">
        {showScrollIcons() && (
          <Icon
            onClick={onArrowLeftClick}
            disabled={data.length < 0}
            className="prevNextIcon"
            name="caret left"
            size="big"
          />
        )}
        <div className="items-container" ref={listContainerRef}>
          {loading && !data && !error ? (
            <ItemsPlaceholder />
          ) : (
            userFavorites() &&
            userFavorites().map((user) => (
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
            disabled={data.length < 3}
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
