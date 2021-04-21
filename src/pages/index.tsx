export default function Home(props) {
  return (
    <>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </>
  );
}

export async function getStaticProps() {
  const response = await fetch("http://localhost:3333/episodes");
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8, // define o intervalo em qua a aplicação fará uma nova chamada para a api e atualizará a pagina de 8 em 8 horas.
  };
}
