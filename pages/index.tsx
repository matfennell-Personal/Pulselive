import Head from 'next/head';
import React, { useState } from 'react';
import styled from 'styled-components';
import Player from '../components/Player';
import { DataProps, PlayerProps } from '../types';

const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
`;

const Select = styled.div`
  position: relative;
  text-align: left;
  width: 100%;
  max-width: 400px;
  background: #FFFFFF;
  padding: 20px;

  select {
    width: 100%;
    padding: 10px 20px;
    background-color: #EAEAEA;
    border: none;
    font-size: 18px;
    appearance: none;
    cursor: pointer;
  }

  &::before {
    content: '';
    position: absolute;
    right: 35px;
    top: 30px;
    height: 10px;
    width: 10px;
    border-style: solid;
    border-width: 0.1rem 0.1rem 0 0;
    display: inline-block;
    transform: rotate(135deg);
    vertical-align: top;
  }
`;

const Index = (data: DataProps) => {
  const [activePlayer, setActivePlayer] = useState('');

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
  
    setActivePlayer(e.target.value);
  }

  return (
    <>
      <Head>
        <title>Pulselive - Player Stats Card</title>
        <meta name="description" content="Pulselive - Player Stats Card" />
      </Head>

      <Container>
        <Select>
          <select data-testid="select" onChange={e => handleOptionChange(e)}>
            <option>Select a player...</option>
            {Array.isArray(data?.players) && data.players.map((player: PlayerProps) => {
              const { player: { name, id } } = player;

              const fullName = `${name.first} ${name.last}`;

              return (
                <option
                  data-testid={`select-option-${id}`}
                  key={id}
                  value={id}
                >{fullName}</option>
              )
            })}
          </select>
        </Select>

        {Array.isArray(data?.players) && data.players.map((indivPlayer: PlayerProps) => {
          const { player: { id } } = indivPlayer;

          return (
            <React.Fragment key={id}>
              {activePlayer == id && (
                <Player data-testid={id} {...indivPlayer} />
              )}
            </React.Fragment>
          )
        })}
      </Container>
    </>
  )
};

Index.getInitialProps = async function() {
  const res = await fetch('http://localhost:3000/data/player-stats.json');
  const data = await res.json();

  return data;
};

export default Index;
