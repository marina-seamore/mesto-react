function PopupWithForm(props) {
    return (
        <section className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <form className='popup__content' name={props.name}>
                <h3 className='popup__header'>{props.title}</h3>
                {props.children}
                <button type="submit" class="popup__submit-button">{props.button}</button>
                <button type="button" class="popup__close-button" aria-label="закрыть"></button>
            </form>
        </section>
    )
}
export default PopupWithForm