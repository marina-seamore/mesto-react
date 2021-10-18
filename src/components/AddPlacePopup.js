import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose}) {


    return(
        <PopupWithForm
        name='photo'
        title='Новое место'
        button='Создать'
        isOpen={isOpen}
        onClose={onClose}
    >
        <input type="text" className="popup__field popup__field_type_place" placeholder="Название" name="place"
            id="place" value="" minLength="2" maxLength="30" required readOnly={true} />
        <span id="place-error" className="popup__error"></span>
        <input type="url" className="popup__field popup__field_type_photo" name="imageLink" id="image" value=""
            placeholder="Ссылка на картинку" required readOnly={true} />
        <span id="image-error" className="popup__error"></span>
    </PopupWithForm>
    )
}

export default AddPlacePopup