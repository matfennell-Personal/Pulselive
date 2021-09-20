import React from 'react';
import styled from 'styled-components';
import { PlayerProps, StatProps } from '../types';

const statsToShow = [
  'appearances', 
  'goals', 
  'goal_assist', 
  'goals_per_match', 
  'passes_per_minute',
];

const stringify = (string: string): string => 
  string.toLowerCase().split(' ').join('');

const formatPosition = (position: string): string => {
  switch (position) {
    case 'D':
      return 'Defender';
    case 'M':
      return 'Midfield';
    case 'F':
      return 'Forward';
    default:
      return position;
  }
};

const formatStatName = (name: string): string => {
  switch (name) {
    case 'goal_assist':
      return 'Assist';
    default: 
      return name;
  }
};

const calculateGoalsPerMatch = (stats: Array<StatProps>): string => {
  const getGoals = stats.find(item => item.name === 'goals');

  const getAppearances = stats.find(item => item.name === 'appearances');

  if (getGoals && getAppearances) {
    return (getGoals.value / getAppearances.value).toFixed(2);
  }

  return 'N/A';
}

const calculatePassesPerMinute = (stats: Array<StatProps>): string => {
  const getForwardPasses = stats.find(item => item.name === 'fwd_pass');

  const getBackwardPasses = stats.find(item => item.name === 'backward_pass');

  const getMinutesPlayed = stats.find(item => item.name === 'mins_played');

  if (getForwardPasses && getBackwardPasses && getMinutesPlayed) {
    const passesPerMinute = (getForwardPasses.value + getBackwardPasses.value) / getMinutesPlayed.value;

    return passesPerMinute.toFixed(2);
  }

  return 'N/A';
}

const PlayerContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  background-color: #EC0150;
  padding: 20px;
  color: #FFFFFF;

  h2 {
    font-weight: normal;
    font-size: 30px;
    margin: 0;
    line-height: 1.5;
  }

  p {
    margin: 0 0 20px;
    font-size: 20px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      justify-content: space-between;
      padding: 15px;
      margin-bottom: 3px;
      background: #FFFFFF;
      color: #3f1f43;
      transition: background 0.2s ease-in-out;

      &:hover {
        background: #DEDEDE;
      }

      span {
        font-size: 20px;

        &:first-letter {
          text-transform: capitalize;
        }

        &:last-of-type {
          font-weight: bold;
        }
      }
    }
  }

  .img-badge {
    position: absolute;
    right: 20px;
    top: -20px;
    width: 110px;
    height: 110px;
    background-image: url('/images/badges_sprite.png');
    border-radius: 50%;
    border: 5px solid white;

    &--spurs {
      background-position: 45.5% 100%;
    }

    &--mancity {
      background-position: 72.8% 70%;
    }

    &--manutd {
      background-position: 54.5% 80%;
    }

    &--arsenal {
      background-position: 9.2% 9.8%;
    }

    &--leicester {
      background-position: 0 0;
    }

    @media only screen and (max-width: 440px) {
      top: -90px;
      right: -10px;
    }
  }
`;

const PlayerContent = (indivPlayer: PlayerProps) => {
  const { player: { name, currentTeam, id, info }, stats } = indivPlayer;

  const fullName = `${name.first} ${name.last}`;

  return (
    <PlayerContentWrapper>
      <h2 data-testid="player-full-name">{fullName}</h2>

      <div 
        data-testid="player-badge"
        className={`img-badge img-badge--${stringify(currentTeam.shortName)}`}
        role="presentation"
      ></div>

      <p data-testid="player-position">
        {formatPosition(info.position)}
      </p>

      <ul>
        {Array.isArray(stats) && stats.map((stat: StatProps, index: number) => {
          if (statsToShow.includes(stat.name)) {
            return (
              <li data-testid="player-stats" key={index}>
                <span>{formatStatName(stat.name)}</span>
                <span>{stat.value}</span>
              </li>
            )
          }

          return null;
        })}

        <li>
          <span>Goals per match</span>
          <span data-testid="player-goals-per-match">
            {calculateGoalsPerMatch(stats)}
          </span>
        </li>

        <li>
          <span>Passes per minute</span>
          <span data-testid="player-passes-per-minute">
            {calculatePassesPerMinute(stats)}
          </span>
        </li>
      </ul>
    </PlayerContentWrapper>
  );
};

export default PlayerContent;