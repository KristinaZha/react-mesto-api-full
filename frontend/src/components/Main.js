import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <img
          className="profile__avatar"
          src={currentUser.avatar}
          alt="аватар"
        />
        <button
          className="profile__avatar-button"
          type="button"
          onClick={props.onEditAvatar}
        ></button>
        <div className="profile__box">
          <div className="profile__text">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              title="Редактировать профиль"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>

        <button
          className="profile__button"
          type="button"
          title="Добавить фотографию"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements">
      {props.cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDeleteClick={props.onCardDeleteClick}
              />
          );
        })}
      </section>
    </main>
  );
}
export default Main;
