import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js'
import apiMesto from '../utils/api'
import { CurrectUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';

function App() {

    //popups
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isDeleteCardPopupOpen, setisDeleteCardPopupOpen] = React.useState(false);

    // cards
    const [selectedCard, setSelectedCard] = React.useState(null)
    const [cards, setCards] = React.useState([])
    const [cardToDelete, setCardToDelete] = React.useState(null)

    //User info
    const [currentUser, setCurrentUser] = React.useState('')


    //popups functions
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setisDeleteCardPopupOpen(false)
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


    // User info functions
    React.useEffect(() => {
        apiMesto.getUserInfo()
            .then((userData) => {
                setCurrentUser(userData)
            })
            .catch(err => console.log(`Getting user info: ${err}`))
    }, [])


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

    //cards functions

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
        if (!isLiked) {
            apiMesto.addLike(card._id)
                .then((newCard) => {
                    const newCards = cards.map(c => c._id === card._id ? newCard : c)
                    setCards(newCards)
                })
                .catch(err => console.log(`Like function error: ${err}`))
        } else {
            apiMesto.removeLike(card._id)
                .then((newCard) => {
                    const newCards = cards.map(c => c._id === card._id ? newCard : c)
                    setCards(newCards)
                })
                .catch(err => console.log(`Dislike function error: ${err}`))
        }

    }

    function setCardToBeDeleted(cardToDelete) {
        setCardToDelete(cardToDelete)
        setisDeleteCardPopupOpen(true)
        console.log(cardToDelete._id)
    }


    function handleCardDelete(e) {
        e.preventDefault();
        apiMesto.deleteCard(cardToDelete._id)
            .then(() => {
                const newCards = cards.filter(c => c._id !== cardToDelete._id)
                setCards(newCards)
                setisDeleteCardPopupOpen(false)
            })
            .catch(err => console.log(`Deleting card: ${err}`))
    }


    function handleAddPlace(placeInfo) {
        apiMesto.addCard(placeInfo)
            .then((newCard) => {
                setCards([newCard, ...cards])
                closeAllPopups()
            })
            .catch(err => console.log(`Adding Place: ${err}`))
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
                    onCardDelete={setCardToBeDeleted}
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
                    onAddPlace={handleAddPlace}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <DeleteCardPopup
                    onClose={closeAllPopups}
                    isOpen={isDeleteCardPopupOpen}
                    onSubmit={handleCardDelete}
                />

                <Footer />
            </div>
        </CurrectUserContext.Provider>
    );
}

export default App;
