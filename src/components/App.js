import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null)

    function onCardClick(selectedCard) {
        setSelectedCard(selectedCard)
    }

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

    return (
        <div className="page">
            <Header />
            <Main
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                isEditProfilePopupOpen={isEditProfilePopupOpen}
                isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                isAddPlacePopupOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                selectedCard={selectedCard}
                onCardClick={onCardClick}
            />
            <Footer />
        </div>
    );
}

export default App;
