import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { deleteCard, deleteDeck, readDeck } from "../../utils/api";
import CardList from "../Cards/CardList";

function SingleDeckDetail({ renderHomePage }) {
  const history = useHistory();
  const {deckId} = useParams();

  const [deck, setDeck] = useState({});

  const { name, description, cards = [], id } = deck;

  useEffect(() => {
    async function loadDeck() {
        const response = await readDeck(deckId)
        setDeck(response)
    }
    loadDeck()
}, [deckId])

  const renderSingleDeckDetail = () => {
    readDeck(deckId).then((result) => setDeck(result));
  };

  function handleDelete(deckId) {
    if (
      window.confirm(
        "Delete this deck? You will not be able to recover it."
      )
    ) {
      deleteDeck(deckId)
      .then(history.go(0));
    }
  }

  return (
    <>
      <div>
        <ol>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>{deck.name}</li>
        </ol>
      </div>

      <div>
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
        <Link to={`/decks/${id}/edit`}>
          <button>Edit</button>
        </Link>
        <Link to={`/decks/${id}/study`}>
          <button>Study</button>
        </Link>
        <Link to={`/decks/${id}/cards/new`}>
          <button>Add Cards</button>
        </Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <div>
        <h2>Cards</h2>
        <CardList
          cards={cards}
          renderSingleDeckDetail={renderSingleDeckDetail}
        />
      </div>
    </>
  );
}

export default SingleDeckDetail;