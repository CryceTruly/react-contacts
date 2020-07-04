import React, { useState } from "react";
import PropTypes from "prop-types";
import { Image, Placeholder } from "semantic-ui-react";
import abName from "../../../utils/abName";
import randomColor from "../../../utils/randomColor";
import "./index.css";

const Thumbnail = React.memo(
  ({ avatar, name, height, secondName, style, className }) => {
    const [hasError, setHasError] = useState(false);
    const [Load, setLoad] = useState(true);

    return (
      <>
        {avatar && !hasError ? (
          <Placeholder style={{ ...style }}>
            <Image
              src={avatar}
              alt=""
              className={`thumbnail ${className}`}
              circular
              height={height}
              onError={() => setHasError(true)}
              style={{ ...style }}
              onLoad={() => setLoad(false)}
              hidden={Load}
            ></Image>
          </Placeholder>
        ) : (
          <div
            className={`thumbnail ${className}`}
            style={{ ...style, backgroundColor: randomColor() }}
          >
            {name !== "" || secondName !== "" ? (
              <span>
                {!secondName ? abName(name) : abName(name, secondName)}
              </span>
            ) : (
              <span>{abName("Not", "Applicable")}</span>
            )}
          </div>
        )}
      </>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.avatar !== nextProps.avatar) {
      return false;
    }
    return true;
  }
);

Thumbnail.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string,
  secondName: PropTypes.string,
  style: PropTypes.objectOf(Object),
  height: PropTypes.number,
};

Thumbnail.defaultProps = {
  secondName: null,
  style: { width: 45, height: 45, marginRight: 15 },
};

export default Thumbnail;
