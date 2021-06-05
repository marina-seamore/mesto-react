import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm'

function App() {
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false); 

    function handleEditProfileClick() {
        document.querySelector('.popup_profile').classList.add('popup_opened')
    }
    function handleEditAvatarClick() {
        document.querySelector('.popup_edit-avatar').classList.add('popup_opened')
    }
    function handleAddPlaceClick() {
        document.querySelector('.popup_photo').classList.add('popup_opened')
    }

    return (
        <div className="page">
            <Header />
            <Main
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
            />
            <Footer />
        </div>
    );
}

export default App;
