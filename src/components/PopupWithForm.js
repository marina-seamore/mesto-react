function PopupWithForm(props) {

    const popupClassName = (`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`)

    return (
        <section className={popupClassName}>
            <form className='popup__content' name={props.name} onSubmit={props.onSubmit}>
                <h3 className='popup__header'>{props.title}</h3>
                {props.children}
                <button type="submit" className="popup__submit-button">{props.button}</button>
                <button type="button" className="popup__close-button" aria-label="закрыть" onClick={props.onClose}></button>
            </form>
        </section>
    )
}
export default PopupWithForm