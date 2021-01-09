import React from 'react';
import StyledTextInput from './index';
import { create } from 'react-test-renderer';

test('it renders name correctly', async () => {
  const inputName = 'Mock Input';

  const tree = create(<StyledTextInput name={inputName} />);

  const inputNameComponent = tree.root.findByProps({ testID: 'inputName' }).props;

  expect(inputNameComponent.children).toEqual(inputName);
});
