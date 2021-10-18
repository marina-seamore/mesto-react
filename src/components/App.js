import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js'
import apiMesto from '../utils/api'
import { CurrectUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null)

    const [currentUser, setCurrentUser] = React.useState('')

    React.useEffect(() => {
        apiMesto.getUserInfo()
            .then((userData) => {
                setCurrentUser(userData)
            })
            .catch(err => console.log(`Getting user info: ${err}`))
    }, [])

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

    function handleUpdateUser(newUserInfo) {
        apiMesto.setUserInfo(newUserInfo)
            .then((newData) => {
                setCurrentUser(newData)
                closeAllPopups()
            })
            .catch(err => console.log(`Updating UserInfo: ${err}`))
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
        </CurrectUserContext.Provider>
    );
}

export default App;
