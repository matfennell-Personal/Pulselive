export type PlayerProps = {
  player: {
    age: string;
    name: {
      first: string;
      last: string;
    };
    currentTeam: {
      id: number;
      name: string;
      shortName: string;
      teamType: string;
    }; 
    id: string; 
    info: {
      position: string;
      positionInfo: string;
      shirtNum: number;
    }; 
    nationalTeam: {
      country: string;
      demonym: string;
    },
  },
  stats: Array<StatProps>
};
  
export type StatProps = {
  name: string;
  value: number;
};

export type DataProps = {
  players: Array<PlayerProps>,
}