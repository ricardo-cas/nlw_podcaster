import { GetStaticProps } from "next";

type Episode = {
  id: string;
  title: string;
  member: string;
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
  const response = await fetch(
    "http://localhost:3333/episodes?_limit=12&_sort=published_at&_order=desc"
  ); // adicionando alguns parâmetros direto na chamada da API para filtrar os resultados.
  const data = await response.json(); // dados retornados da API

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8, // define o intervalo em qua a aplicação fará uma nova chamada para a api e atualizará a pagina de 8 em 8 horas.
  };
};
