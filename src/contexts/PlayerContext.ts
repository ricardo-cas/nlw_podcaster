import { createContext } from "react";

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

// criando a tipagem das informações que irei salvar dentro do contexto
type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number; // vai ser o índice que aponta em qual posição da lista é o episodio que está tocando atualmente.
  isPlaying: boolean;
  play: (episode: Episode) => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
};

// exportando o contexto com um valor default
export const PlayerContext = createContext({} as PlayerContextData);
