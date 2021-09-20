import React from 'react';
import styled from 'styled-components';

const PlayerImageWrapper = styled.div`
  background-image: url('/images/stats-card-bg.svg');
  background-size: contain;
  background-position: top;
`;

type Props = {
  id: string;
  fullName: string;
}

const PlayerImage = ({ id, fullName }: Props) => {
  return (
    <PlayerImageWrapper>
      <img
        src={`/images/p${id}.png`}
        className="img-player"
        alt={fullName}
        width={220}
        height={280}
      />
    </PlayerImageWrapper>
  );
};

export default PlayerImage;