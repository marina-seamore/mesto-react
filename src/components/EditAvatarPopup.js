import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose}) {

    return (
        <PopupWithForm
            name='edit-avatar'
            title='Обновить аватар'
            button='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
        >
            <input type="url" className="popup__field popup__field_type_photo" name="imageLink" id="image-avatar" value=""
                placeholder="Ссылка на картинку" required readOnly={true} />
            <span id="image-avatar-error" className="popup__error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup