import React from 'react'
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders todo list', () => {
  render(<App />);
  const headingElement = screen.getByText(/to-do list/i);
  expect(headingElement).toBeInTheDocument();
});
