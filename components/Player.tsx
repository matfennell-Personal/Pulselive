import React from 'react';
import styled from 'styled-components';
import { DataProps, PlayerProps, StatProps } from '../types';
import PlayerContent from './PlayerContent';
import PlayerImage from './PlayerImage';

const PlayerWrapper = styled.div`
  text-align: left;
  width: 100%;
  max-width: 400px;
  background: #fff;
  padding-top: 20px;
  overflow: hidden;

  .img-player {
    position: relative;
    z-index: 1;
    top: 5px;
    margin: 0 10px;
  }
`;

const Player = (
  indivPlayer: PlayerProps
) => {
  const { player: { name, id } } = indivPlayer;

  const fullName = `${name.first} ${name.last}`;

  return (
    <PlayerWrapper>
      <PlayerImage id={id} fullName={fullName} />

      <PlayerContent {...indivPlayer} />
    </PlayerWrapper>
  )
}

export default Player;