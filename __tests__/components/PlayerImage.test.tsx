import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PlayerImage from '../../components/PlayerImage';

test('should render the PlayerImage component', () => {
  render(<PlayerImage id='123' fullName='Test Name' />);

  expect(screen.getByAltText('Test Name')).toBeInTheDocument();
});