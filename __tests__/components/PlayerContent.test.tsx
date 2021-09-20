import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PlayerContent from '../../components/PlayerContent';

test('should render the PlayerContent component', () => {
  const indivPlayer = {
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
  };

  render(<PlayerContent {...indivPlayer} />);

  expect(screen.getByTestId('player-full-name')).toHaveTextContent('Toby Alderweireld');

  expect(screen.getByTestId('player-badge')).toHaveClass('img-badge--spurs');

  expect(screen.getByTestId('player-position')).toHaveTextContent('Defender');

  expect(screen.getAllByTestId('player-stats')).toHaveLength(3);

  expect(screen.getByTestId('player-goals-per-match')).toHaveTextContent('0.06');

  expect(screen.getByTestId('player-passes-per-minute')).toHaveTextContent('0.26');
});