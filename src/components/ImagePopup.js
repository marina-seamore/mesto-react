function ImagePopup() {
    return (
        <>
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
export default ImagePopup;