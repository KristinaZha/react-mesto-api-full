function ImagePopup({card,onClose}) {
  return (
    <div
      className={`popup popup_type_foto ${card.link ? "popup_opened" : ''}`}
      id="popup_type_foto"
     
    >
      <div className="popup__foto-window">
        <button
          className="popup__close-button"
          type="button"
          title="Закрыть"
          id="button_close_image"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img
            className="popup__figure-foto"
            src={card.link}
            alt={card.name}
          />
          <figcaption className="popup__figcaption">
            {card.name}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
