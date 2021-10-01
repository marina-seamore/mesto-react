import React from 'react'
import apiMesto from '../utils/api'
import Card from './Card'

function Main(props) {

    const [userName, setUserName] = React.useState('')
    const [userDescription, setUserDescription] = React.useState('')
    const [userAvatar, setUserAvatar] = React.useState('')
    const [cards, setCards] = React.useState([])


    React.useEffect(() => {
        apiMesto.getUserInfo()
            .then((data) => {
                setUserName(data.name)
                setUserDescription(data.about)
                setUserAvatar(data.avatar)
            })
            .catch(err => console.log(`Getting user info: ${err}`))

        apiMesto.getInitialCards()
            .then((cardData) => {
                setCards(cardData)
            })
            .catch(err => console.log(`Gettings cards: ${err}`))
    }, [])

    return (
        <>
            <section className="profile">
                <div className="profile__avatar">
                    <img className="profile__avatar profile__avatar_image" src={userAvatar} alt="Фото профиля" />
                    <button className="button profile__avatar profile__avatar_button" onClick={props.onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button type="button" className="button profile__edit-button" aria-label="Редактировать" onClick={props.onEditProfile}></button>
                    <p className="profile__description">{userDescription}</p>
                </div>
                <button type="button" className="button profile__add-button" aria-label="Добавить" onClick={props.onAddPlace}></button>
            </section>

            <section className="elements">
                {cards.map((item) => (
                    <Card card={item}
                        key={item._id}
                        onCardClick={props.onCardClick}
                    />
                ))}
            </section>

        </>
    )
}

export default Main