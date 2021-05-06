import React, { useContext, useEffect} from "react";
import { GameContext } from "./GameProvider.js";
import { useHistory } from 'react-router-dom'

export const GameList = (props) => {
  const { games, getGames } = useContext(GameContext);

    const history = useHistory();

  useEffect(() => {
    getGames();
  }, []);

  return (
    <article className="gameHolder">
    <button
        className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          history.push({ pathname: "/games/new" });
        }}
      >
        Register New Game
      </button>
      <article className="games">
      {games.map((game) => {      
        return (
          <div className="individualGames">
          <section key={`game--${game.id}`} className="game">
            <div className="game__title">
              Name of the Game: {game.name}
            </div>
            <div className="game__players">
              How many players needed? {game.number_of_players}
            </div>
            <div className="game__type">
              What is the type of game? {game.game_type.type}
            </div>
            <div className="game__skillLevel">
              What should the skill level be of the players? {game.skill_level}
            </div>
          </section>
          </div>
        );
      })}</article>
    </article>
  );
};
