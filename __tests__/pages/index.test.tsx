import * as React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Index from '../../pages/index';

test('should render the Index page', () => {
  render(<Index players={
    [{
      player: { 
        age: "27 years 139 days",
        currentTeam: {
          id: 21,
          name: "Tottenham Hotspur",
          shortName: "Spurs",
          teamType: "FIRST"
        },
        id: "4916",
        info: {
          position: "D",
          positionInfo: "Centre/Right Central Defender",
          shirtNum: 4
        },
        name: {
          first: "Toby",
          last: "Alderweireld"
        },
        nationalTeam: {
          country: "Belgium",
          demonym: "Belgian"
        }      
      },
      stats: [
        {name: 'goals', value: 5},
        {name: 'losses', value: 20},
        {name: 'wins', value: 48},
        {name: 'draws', value: 23},
        {name: 'fwd_pass', value: 1533},
        {name: 'goal_assist', value: 2},
        {name: 'appearances', value: 80},
        {name: 'mins_played', value: 6953},
        {name: 'backward_pass', value: 308},
      ]
    }]
  } />);

  expect(screen.queryByTestId('player-4916')).toBeNull();

  const dropdown = screen.getByTestId('select') as HTMLSelectElement;

  expect(dropdown.value).toEqual('Select a player...');

  fireEvent.change(dropdown, { target: { value: '4916' } });

  expect(dropdown.value).toEqual('4916');
});