import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm'

function App() {
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    // const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    // const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false); 

    const handleAddPlaceClick =() => {
        setIsAddPlacePopupOpen(true)
    }

    return (
        <div className="page">
            <Header />
            <Main
            onAddPlace={handleAddPlaceClick}
             />
            <Footer />
        </div>
    );
}

export default App;
