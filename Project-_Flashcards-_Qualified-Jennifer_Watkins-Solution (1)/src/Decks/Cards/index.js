import React from "react";
import { Route, Switch } from "react-router-dom";
import { EditCard } from "./CardEdit";
import { NewCard } from "./CardCreate";

//    New and Edit Card components Routed Here

export function Cards() {
  return (
    <div>
      <Switch>
        <Route path="/decks/:deckId/cards/new">
          <NewCard />
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit">
          <EditCard />
        </Route>
      </Switch>
    </div>
  );
}