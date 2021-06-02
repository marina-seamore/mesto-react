import PopupWithForm from './PopupWithForm.js'
import App from './App.js'
function Main(props) {
    function handleEditProfileClick() {
        document.querySelector('.popup_profile').classList.add('popup_opened')
    }
    function handleEditAvatarClick() {
        document.querySelector('.popup_edit-avatar').classList.add('popup_opened')
    }
    // function handleAddPlaceClick() {
    //     document.querySelector('.popup_photo').classList.add('popup_opened')
    // }

    // const handleAddPlaceClick =() => {
    //     setIsAddPlacePopupOpen(true)
    // }
    // onAddPlace={handleAddPlaceClick}

    return (
        <>
            <section className="profile">
                <div className="profile__avatar">
                    <img className="profile__avatar profile__avatar_image" src="" alt="Фото профиля" />
                    <button className="button profile__avatar profile__avatar_button" onClick={handleEditAvatarClick}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">Жак-Ив-Кусто</h1>
                    <button type="button" className="button profile__edit-button" aria-label="Редактировать" onClick={handleEditProfileClick}></button>
                    <p className="profile__description">Исследователь океана</p>
                </div>
                <button type="button" className="button profile__add-button" aria-label="Добавить" onClick={props.onAddPlace}></button>
            </section>

            <section className="elements">

            </section>

            <template className="element-template">
                <article className="element">
                    <button type="button" className="button element__delete-button"></button>
                    <img className="element__photo" src="<%=require('./images/Горд.jpg')%>" alt="Фото" />
                    <div className="element__name-block">
                        <h2 className="element__name"></h2>
                        <div className="element__likes">
                            <button type="button" className="button element__likes_button" aria-label="нравится"></button>
                            <p className="element__likes_counter"></p>
                        </div>
                    </div>
                </article>
            </template>

            <PopupWithForm
                name='profile'
                title='Редактировать профиль'
                children={
                    <>
                        <input type="text" className="popup__field popup__field_type_name" placeholder="Имя" name="name" id="name"
                            value="" minLength="2" maxLength="40" required />
                        <span id="name-error" className="popup__error"></span>
                        <input type="text" className="popup__field popup__field_type_description" placeholder="Вид деятельности"
                            name="description" id="description" value="" minLength="2" maxLength="200" required />
                        <span id="description-error" className="popup__error"></span>
                    </>}
                button='Сохранить'
                // isOpen={isOpen}
            />

            <PopupWithForm
                name='photo'
                title='Новое место'
                children={
                    <>
                        <input type="text" className="popup__field popup__field_type_place" placeholder="Название" name="place"
                            id="place" value="" minLength="2" maxLength="30" required />
                        <span id="place-error" className="popup__error"></span>
                        <input type="url" className="popup__field popup__field_type_photo" name="imageLink" id="image" value=""
                            placeholder="Ссылка на картинку" required />
                        <span id="image-error" className="popup__error"></span>
                    </>}
                button='Создать'
                // isOpen={isOpen}
            />

            <PopupWithForm
                name='edit-avatar'
                title='Обновить аватар'
                children={
                    <>
                        <input type="url" className="popup__field popup__field_type_photo" name="imageLink" id="image-avatar" value=""
                            placeholder="Ссылка на картинку" required />
                        <span id="image-avatar-error" className="popup__error"></span>
                    </>}
                button='Сохранить'
            />

            <PopupWithForm
                name='edit-confirm'
                title='Вы уверены?'
                button='Да'
            />

            <section className="popup popup_full-photo">
                <div className="full-photo">
                    <button type="button" className="popup__close-button popup__close-button-full-photo"
                        aria-label="закрыть"></button>
                    <img className="full-photo__image" src="" alt="Большое и красивое фото" />
                    <p className="full-photo__place"></p>
                </div>
            </section>
        </>
    )
}

export default Main