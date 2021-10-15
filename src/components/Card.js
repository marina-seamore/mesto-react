import React, { useContext } from "react";
import { CurrectUserContext } from "../contexts/CurrentUserContext";

function Card({ onCardClick, card }) {

    const currentUser = useContext(CurrectUserContext);

    const isOwn = currentUser._id === card.owner._id

    const cardDeleteButtonClassName = (`button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`)

    const handleCardClick = () => {
        onCardClick(card)
    }
    return (
        <article className="element">
            <button type="button" className={cardDeleteButtonClassName}></button>
            <img className="element__photo" src={card.link} alt={card.name} onClick={handleCardClick} />
            <div className="element__name-block">
                <h2 className="element__name">{card.name}</h2>
                <div className="element__likes">
                    <button type="button" className="button element__likes_button" aria-label="нравится"></button>
                    <p className="element__likes_counter">{card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card