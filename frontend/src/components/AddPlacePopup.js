import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [imgName, setImgName] = React.useState("");
  const [imgLink, setImgLink] = React.useState("");
  React.useEffect(() => {
    setImgName("");
    setImgLink("");
  }, [props.isOpen]);

  function handleImgName(e) {
    setImgName(e.target.value);
  }

  function handleImgLink(e) {
    setImgLink(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: imgName,
      link: imgLink,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <div className="popup__input-container">
        <input
          value={imgName || ""}
          onChange={handleImgName}
          id="place-input"
          type="text"
          className="popup__input popup__input_type_place"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__input-error place-input-error"></span>
      </div>
      <div className="popup__input-container">
        <input
          value={imgLink || ""}
          onChange={handleImgLink}
          id="url-input"
          type="url"
          className="popup__input popup__input_type_url"
          name="link"
          placeholder="Ссылка"
          required
        />
        <span className="popup__input-error url-input-error"></span>
      </div>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
