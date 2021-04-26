import { GetStaticProps } from "next";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import ptBR from "date-fns/locale/pt-BR";
import { api } from "../services/api";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";
import { usePlayer } from "../contexts/PlayerContext";

import styles from "./home.module.scss";

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  duration: number;
  durationAsString: string;
  publishAt: string;
  url: string;
};

type HomeProps = {
  // quando declaramos um array, ele pode ser de vários tipos, neste caso estamos definindo que ele é do tipo Episodes.
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
};

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  const { playList } = usePlayer();

  const episodeList = [...latestEpisodes, ...allEpisodes];

  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>
        <ul>
          {/* sempre que queremos retornar uma lista, ou percorrer alguma coisa, vamos utilizar o map, porque o map retornando algo. */}
          {latestEpisodes.map((episode, index) => {
            return (
              // toda primeira propriedade do React precisa ser passado uma key para o primeiro objeto, onde ele identifica cada item com o único.
              <li key={episode.id}>
                {/* adicionando a imagem do episódio */}
                <Image
                  width={192}
                  height={192}
                  src={episode.thumbnail}
                  alt={episode.title}
                  objectFit="cover"
                />
                {/* adicionando os detalhes dos episódios */}
                <div className={styles.episodeDetails}>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>
                <button
                  type="button"
                  onClick={() => playList(episodeList, index)}
                >
                  <img src="/play-green.svg" alt="Tocar episodio" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos episódios</h2>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode, index) => {
              return (
                <tr key={episode.id}>
                  <td style={{ width: 72 }}>
                    <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 100 }}>{episode.publishAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        playList(episodeList, index + latestEpisodes.length)
                      }
                    >
                      <img src="./play-green.svg" alt="Tocar episódio" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes", {
    //colocando os parâmetros direto na sintaxe, pois estamos utilizando o Axios
    // adicionando alguns parâmetros direto na chamada da API para filtrar os resultados.
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });
  // Tratando a formatação dos dados antes de exibir na tela.
  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishAt: format(parseISO(episode.published_at), "d MMM yy", {
        locale: ptBR,
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      description: episode.description,
      url: episode.file.url,
    };
  });

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.lenght);
  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8, // define o intervalo em qua a aplicação fará uma nova chamada para a api e atualizará a pagina de 8 em 8 horas.
  };
};
