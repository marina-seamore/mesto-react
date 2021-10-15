import React from 'react'
import apiMesto from '../utils/api'
import Card from './Card'
import { CurrectUserContext } from '../contexts/CurrentUserContext'

function Main(props) {

    const currentUser = React.useContext(CurrectUserContext)

    const [cards, setCards] = React.useState([])


    React.useEffect(() => {

        apiMesto.getInitialCards()
            .then((cardData) => {
                setCards(cardData)
            })
            .catch(err => console.log(`Gettings cards: ${err}`))
    }, [])


    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id)
        isLiked ? apiMesto.removeLike(card._id) : apiMesto.addLike(card._id)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
            })
            .catch(err => console.log(`Like function error: ${err}`))
    }

    const [cardToDelete, setCardToDelete] = React.useState(null)
    function handleCardDelete(card) {
        setCardToDelete(card)
        apiMesto.deleteCard(cardToDelete._id)
        .then(() => {
            setCards((state) => state.filter((c) => c._id !== cardToDelete._id))
        })
        .catch(err => console.log(`Deleting card: ${err}`))
    }

    return (
        <>
            <section className="profile">
                <div className="profile__avatar">
                    <img className="profile__avatar profile__avatar_image" src={currentUser.avatar} alt="Фото профиля" />
                    <button className="button profile__avatar profile__avatar_button" onClick={props.onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button type="button" className="button profile__edit-button" aria-label="Редактировать" onClick={props.onEditProfile}></button>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button type="button" className="button profile__add-button" aria-label="Добавить" onClick={props.onAddPlace}></button>
            </section>

            <section className="elements">
                {cards.map((item) => (
                    <Card card={item}
                        key={item._id}
                        onCardClick={props.onCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />
                ))}
            </section>

        </>
    )
}

export default Main