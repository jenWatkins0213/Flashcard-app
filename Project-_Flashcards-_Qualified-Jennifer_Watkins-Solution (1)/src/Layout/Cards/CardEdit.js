import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../../utils/api";
import CardForm from "./CardForm";

function CardEdit() {
  const history = useHistory();
  const {deckId, cardId} = useParams();

  const [deck, setDeck] = useState({});
  const [card, setCard] = useState([]);

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    setCard({ ...card, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    async function loadDeck() {
        const response = await readDeck(deckId)
        setDeck(response)
        // console.log(response)
    }
    loadDeck()
}, [deckId])

useEffect(() => {
  async function loadCard() {
      const response = await readCard(cardId)
      setCard(response)
      // console.log('set card', response)
  }
  loadCard()
}, [cardId, setCard])

const cancelButtonHandler = () => {
  history.push(`/decks/${deckId}`)
}


  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard({...card})
    history.push(`/decks/${deckId}`);
  };

  const inputChangeHandler = (event) => {
    setCard({
        ...card,
        [event.target.name]: event.target.value
    })
} 

  return (
    <>
      <div>
        <ol>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li>Study Cards</li>
        </ol>
      </div>
      <form name="name" onSubmit={handleSubmit}>
        <fieldset>
          <h2> Edit Card </h2>
          <CardForm
            front={card.front}
            back={card.back}
            // handleFrontChange={handleInputFrontChange}
            // handleBackChange={handleInputBackChange}
            handleChange = {handleChange}
          />
          <div>
            <button
              onClick={() => {
                history.push(`/decks/${deckId}`);
              }}
            >
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default CardEdit;