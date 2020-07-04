import React from "react";
import PropTypes from "prop-types";
import { Button, Icon, Message as SemanticMessage } from "semantic-ui-react";
import "./index.scss";

const Message = ({
  message,
  color,
  error,
  icon,
  iconSize,
  action,
  info,
  style,
}) => (
  <SemanticMessage
    color={color}
    size="small"
    info={info}
    error={error}
    style={{ ...style }}
  >
    <div
      className="message-component"
      style={{ justifyContent: action ? "space-between" : "center" }}
    >
      <span>
        {icon ? <Icon name={icon} size={iconSize} /> : ""}
        {message}
      </span>
      {action ? (
        <Button
          size="small"
          content={action.content || "Retry"}
          icon={action.icon || "redo"}
          color={action.color || color}
          labelPosition={action.position || "right"}
          onClick={action.onClick}
        />
      ) : (
        ""
      )}
    </div>
  </SemanticMessage>
);

Message.defaultProps = {
  color: "grey",
  icon: "",
  action: null,
  iconSize: "large",
  info: false,
  error: true,
  onClick: () => null,
};

Message.propTypes = {
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
  action: PropTypes.instanceOf(Object),
  error: PropTypes.bool,
  info: PropTypes.bool,
  icon: PropTypes.string,
  iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Message;
