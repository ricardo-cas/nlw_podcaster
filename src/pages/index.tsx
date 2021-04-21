import { GetStaticProps } from "next";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { api } from "../services/api";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  members: string;
  duration: string;
  durationAsString: string;
  published_at: string;
  url: string;
};

type HomeProps = {
  // quando declaramos um array, ele pode ser de vários tipos, neste caso estamos definindo que ele é do tipo Episodes.
  episodes: Episode[];
};

export default function Home(props: HomeProps) {
  return (
    <>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes", {
    //collocando os parametros direto na syntaxe, pois estamos utilizando o Axios
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

  return {
    props: {
      episodes,
    },
    revalidate: 60 * 60 * 8, // define o intervalo em qua a aplicação fará uma nova chamada para a api e atualizará a pagina de 8 em 8 horas.
  };
};
