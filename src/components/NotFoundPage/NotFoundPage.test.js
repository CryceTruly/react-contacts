import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from '.';

describe('<NotFoundPage />', () => {
  test('Should render without crashing', () => {
    global.translate = jest.fn(() => 'text');
    const wrapper = shallow(<NotFoundPage />);
    expect(wrapper).toHaveLength(1);
  });
});
