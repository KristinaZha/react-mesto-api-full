import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
// Отображение иконки удаления
    // console.log('Card =>', props.card);
    //console.log('Card Owner =>', props.card.owner);
   //console.log('currentUser All =>', currentUser);
  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = `element__delete ${isOwn ? 'element__delete_visible' : 'element__delete_hidden' }`;
  const isLiked = props.card.likes.some(i => i === currentUser._id);
  console.log(currentUser._id,props.card.likes,isLiked);
  const cardLikeButtonClassName = (`element__like ${isLiked ?  'element__like-activ' : ''}`);
  
  
  function handleClick() {
    props.onCardClick(props.card);
  }
function handleLikeClick() {
  props.onCardLike(props.card)
}
function handleDeleteClick() {
  props.onCardDeleteClick(props.card)
}

  return (
    <div className="element">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        title="Удалить"
      ></button>
      <img
        className="element__pic"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="element__box">
        <h3 className="element__title">{props.card.name}</h3>
        <div className="element__button">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            title="Нравится"
          ></button>
          <span className="element__like-count">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}
export default Card;
