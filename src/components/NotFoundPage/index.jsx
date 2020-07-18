import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";

import "./NotFoundPage.scss";

const NotFoundPage = () => {
  return (
    <div id="NotFoundPage">
      <div className="not-found-page">
        <div className="not-found-page-404">
          <h3>Oops! {global.translate("Page not found")}</h3>
          <h1>
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h1>
        </div>
        <h2>
          {global.translate(
            "We are sorry, but the page you requested was not found"
          )}
        </h2>
        <div>
          <Button className="primary" as={Link} to="/">
            <Icon name="chevron left" /> <Icon name="home" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
