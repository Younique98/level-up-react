import React from "react";
import { Route } from "react-router-dom";
import { GameList } from "./game/GameList.js";
import { GameProvider } from "./game/GameProvider.js";
import { GameForm } from "./game/GameForm";
import { EventProvider } from "./game/EventProvider";
import { EventList } from "./game/EventList";
import { ProfileProvider } from "./auth/ProfileProvider"
import { Profile } from "./auth/Profile"

export const ApplicationViews = () => {
  return (
    <>
      <main
        style={{
          margin: "5rem 2rem",
          lineHeight: "1.75rem",
        }}
      >
        <GameProvider>
          <Route exact path="/">
            <GameList />
          </Route>
          <Route exact path="/games/new">
            <GameForm />
          </Route>
        </GameProvider>

        <EventProvider>
          <Route exact path="/events">
            <EventList />
          </Route>
          <Route exact path="/event/new">
            <GameForm />
          </Route>
        </EventProvider>

        <ProfileProvider>
          <Route exact path="/profile">
            <Profile />
          </Route>
        </ProfileProvider>
      </main>
    </>
  );
};
