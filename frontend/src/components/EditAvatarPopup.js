import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const currentAvatar = React.useRef("");
  React.useEffect(() => {
    currentAvatar.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: currentAvatar.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <div className="popup__input-container">
        <input
          ref={currentAvatar}
          id="avatar-input"
          type="url"
          className="popup__input popup__input_type_avatar"
          name="avatar"
          placeholder="Ссылка"
          required
        />
        <span className="popup__input-error avatar-input-error"></span>
      </div>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;