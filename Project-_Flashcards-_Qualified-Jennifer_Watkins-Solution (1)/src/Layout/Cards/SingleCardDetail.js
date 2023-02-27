import React from "react";
import { Link } from "react-router-dom";
import { deleteCard } from "../../utils/api";

function SingleCardDetail({
  card: { front, back, id, deckId },
  renderSingleDeckDetail,
}) {
  function handleDelete(cardId){
    if (
        window.confirm(
            "Delete this card? You will not be able to recover it."
        )
    ) {
        deleteCard(cardId)
        .then(history.go(0))
    }
}

  return (
    <div>
      <p>{front}</p>
      <p>{back}</p>
      <Link to= {`/decks/${deckId}/cards/${id}/edit`} >
         <button>Edit</button>
      </Link>
      <button onClick={() => handleDelete(card.id)}>Delete</button>
    </div>
  );
}

export default SingleCardDetail;