/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Placeholder } from 'semantic-ui-react';
import './style.css';

const ItemsPlaceholder = props => (
  <Placeholder className="itemsLoading" {...props}>
    <Placeholder.Header image>
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Header>
    <Placeholder.Paragraph>
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Paragraph>
  </Placeholder>
);
export default ItemsPlaceholder;
