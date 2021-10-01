function ImagePopup({ card, onClose }) {
    return (
        <section className={`popup popup popup_full-photo ${card && 'popup_opened'}`}>
            <div className="full-photo">
                <button type="button" className="popup__close-button popup__close-button-full-photo"
                    aria-label="закрыть"
                    onClick={onClose}
                ></button>
                <img className="full-photo__image" src={card?.link} alt={card?.name} />
                <p className="full-photo__place">{card?.name}</p>
            </div>
        </section>
    )
}
export default ImagePopup;