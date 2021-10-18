import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js'
import apiMesto from '../utils/api'
import { CurrectUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

function App() {

    //popups

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null)
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    //User info

    const [currentUser, setCurrentUser] = React.useState('')

    React.useEffect(() => {
        apiMesto.getUserInfo()
            .then((userData) => {
                setCurrentUser(userData)
            })
            .catch(err => console.log(`Getting user info: ${err}`))
    }, [])

    // User info updates

    function handleUpdateUser(newUserInfo) {
        apiMesto.setUserInfo(newUserInfo)
            .then((newData) => {
                setCurrentUser(newData)
                closeAllPopups()
            })
            .catch(err => console.log(`Updating UserInfo: ${err}`))
    }

    function handleUpdateAvatar(newUserInfo) {
        apiMesto.setUserAvatar(newUserInfo.avatar)
            .then((newAvatar) => {
                setCurrentUser(newAvatar)
                closeAllPopups()
            })
            .catch(err => console.log(`Updating avatar: ${err}`))
    }

    // сards

    const [selectedCard, setSelectedCard] = React.useState(null)
    const [cards, setCards] = React.useState([])


    React.useEffect(() => {

        apiMesto.getInitialCards()
            .then((cardData) => {
                setCards(cardData)
            })
            .catch(err => console.log(`Gettings cards: ${err}`))
    }, [])

    function onCardClick(selectedCard) {
        setSelectedCard(selectedCard)
    }

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
        <CurrectUserContext.Provider value={currentUser}>
            <div className="page">
                <Header />
                <Main
                    onEditProfile={handleEditProfileClick}
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={onCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />


                <PopupWithForm
                    name='edit-confirm'
                    title='Вы уверены?'
                    button='Да'
                    onClose={closeAllPopups}
                />
                <Footer />
            </div>
        </CurrectUserContext.Provider>
    );
}

export default App;
