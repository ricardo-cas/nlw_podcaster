// Criando este arquivo para na hora da navegação (roteamento) da aplicação next, ele ficar assim:
// site/episode?slug
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  duration: string;
  durationAsString: string;
  publishAt: string;
  url: string;
  description: string;
};

type EpisodeProps = {
  episode: Episode;
};

export default function Episode({ episode }: EpisodeProps) {
  const router = useRouter();
  return <h1>{router.query.slug}</h1>;
  // return <h1>{episode.title}</h1>;
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: "blocking",
//   };
// };

// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const slug = ctx.params;
//   const { data } = await api.get(`/episodes/${slug}`);

//   const episode = {
//     id: data.id,
//     title: data.title,
//     thumbnail: data.thumbnail,
//     members: data.members,
//     publishAt: format(parseISO(data.published_at), "d MMM yy", {
//       locale: ptBR,
//     }),
//     duration: Number(data.file.duration),
//     durationAsString: convertDurationToTimeString(Number(data.file.duration)),
//     description: data.description,
//     url: data.file.url,
//   };
//   return {
//     props: { episode },
//     revalidate: 60 * 60 * 24, //24 hours
//   };
// };
