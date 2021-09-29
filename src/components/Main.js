import React from 'react'
import PopupWithForm from './PopupWithForm.js'
import apiMesto from '../utils/api'
import Card from './Card'

function Main(props) {

    const [userName, setUserName] = React.useState('')
    const [userDescription, setUserDescription] = React.useState('')
    const [userAvatar, setUserAvatar] = React.useState()
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
                console.log([cards])
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
                    />
                ))}
                
            </section>

            <PopupWithForm
                name='profile'
                title='Редактировать профиль'
                children={
                    <>
                        <input type="text" className="popup__field popup__field_type_name" placeholder="Имя" name="name" id="name"
                            value="" minLength="2" maxLength="40" required readOnly={true} />
                        <span id="name-error" className="popup__error"></span>
                        <input type="text" className="popup__field popup__field_type_description" placeholder="Вид деятельности"
                            name="description" id="description" value="" minLength="2" maxLength="200" required readOnly={true} />
                        <span id="description-error" className="popup__error"></span>
                    </>}
                button='Сохранить'
                isOpen={props.isEditProfilePopupOpen}
                onClose={props.onClose}
            />

            <PopupWithForm
                name='photo'
                title='Новое место'
                children={
                    <>
                        <input type="text" className="popup__field popup__field_type_place" placeholder="Название" name="place"
                            id="place" value="" minLength="2" maxLength="30" required readOnly={true} />
                        <span id="place-error" className="popup__error"></span>
                        <input type="url" className="popup__field popup__field_type_photo" name="imageLink" id="image" value=""
                            placeholder="Ссылка на картинку" required readOnly={true} />
                        <span id="image-error" className="popup__error"></span>
                    </>}
                button='Создать'
                isOpen={props.isAddPlacePopupOpen}
                onClose={props.onClose}
            />

            <PopupWithForm
                name='edit-avatar'
                title='Обновить аватар'
                children={
                    <>
                        <input type="url" className="popup__field popup__field_type_photo" name="imageLink" id="image-avatar" value=""
                            placeholder="Ссылка на картинку" required readOnly={true} />
                        <span id="image-avatar-error" className="popup__error"></span>
                    </>}
                button='Сохранить'
                isOpen={props.isEditAvatarPopupOpen}
                onClose={props.onClose}
            />

            <PopupWithForm
                name='edit-confirm'
                title='Вы уверены?'
                button='Да'
                onClose={props.onClose}
            />

        </>
    )
}

export default Main