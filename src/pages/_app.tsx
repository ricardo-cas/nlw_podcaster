import "../styles/global.scss";

import { Header } from "./../components/header";
import { Player } from "./../components/player";

import styles from "../styles/app.module.scss";
import { PlayerContext } from "../contexts/PlayerContext";

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContext.Provider value={"Ricardo"}>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  );
}

export default MyApp;
