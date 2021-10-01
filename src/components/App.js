import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js'

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
                onCardClick={onCardClick}
            />
            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
            />

            <PopupWithForm
                name='profile'
                title='Редактировать профиль'
                button='Сохранить'
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
            >
                <input type="text" className="popup__field popup__field_type_name" placeholder="Имя" name="name" id="name"
                    value="" minLength="2" maxLength="40" required readOnly={true} />
                <span id="name-error" className="popup__error"></span>
                <input type="text" className="popup__field popup__field_type_description" placeholder="Вид деятельности"
                    name="description" id="description" value="" minLength="2" maxLength="200" required readOnly={true} />
                <span id="description-error" className="popup__error"></span>
            </PopupWithForm>

            <PopupWithForm
                name='photo'
                title='Новое место'
                button='Создать'
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
            >
                <input type="text" className="popup__field popup__field_type_place" placeholder="Название" name="place"
                    id="place" value="" minLength="2" maxLength="30" required readOnly={true} />
                <span id="place-error" className="popup__error"></span>
                <input type="url" className="popup__field popup__field_type_photo" name="imageLink" id="image" value=""
                    placeholder="Ссылка на картинку" required readOnly={true} />
                <span id="image-error" className="popup__error"></span>
            </PopupWithForm>

            <PopupWithForm
                name='edit-avatar'
                title='Обновить аватар'
                button='Сохранить'
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
            >
                <input type="url" className="popup__field popup__field_type_photo" name="imageLink" id="image-avatar" value=""
                    placeholder="Ссылка на картинку" required readOnly={true} />
                <span id="image-avatar-error" className="popup__error"></span>
            </PopupWithForm>

            <PopupWithForm
                name='edit-confirm'
                title='Вы уверены?'
                button='Да'
                onClose={closeAllPopups}
            />
            <Footer />
        </div>
    );
}

export default App;
