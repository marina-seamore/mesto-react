
function Card({card}) {
    return (
    <article className="element">
        <button type="button" className="button element__delete-button"></button>
        <img className="element__photo" src={card.link} alt="Фото" />
        <div className="element__name-block">
            <h2 className="element__name">{card.name}</h2>
            <div className="element__likes">
                <button type="button" className="button element__likes_button" aria-label="нравится"></button>
                <p className="element__likes_counter">{card.likes.length}</p>
            </div>
        </div>
    </article>
    )}

export default Card