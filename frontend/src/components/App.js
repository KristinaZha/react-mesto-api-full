import React from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import * as Auth from "../utils/Auth";

function App() {
  const [isPopupAvatarOpen, setPopupAvatarOpened] = useState(false);
  const [isPopupProfileOpen, setPopupProfileOpened] = useState(false);
  const [isPopupPlaceOpen, setPopupPlaceOpened] = useState(false);
  const [infoTooltipOpen, setInfoTooltip] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});//
  const [cards, setCards] = useState([]);//
  const [currentUser, setCurrentUser] = useState({});//
  const [loggedIn, setLoggedIn] = useState(false);//
  const [success, setSuccessInfo] = useState(false);
  const [userData, setUserData] = useState(null);//
  const history = useHistory();//
  
 
  function handleLogin(email, password) {
    return Auth.authorize(email, password)
      .then((data) => {
        if (!data.token) {
          setSuccessInfo(false);
          setInfoTooltip(true);
        }
        setUserData({ email });
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
      })
     .catch((err) => {
        console.log(err);
        setSuccessInfo(false);
        setInfoTooltip(true);
      });
  }

  function handleRegister(email, password) {
    return Auth.register(email, password)
      .then((data) => {
        if (!data.token) {
          setSuccessInfo(false);
          setInfoTooltip(true);
        }
        setSuccessInfo(true);
        setInfoTooltip(true);
        history.push("/signin");
      })
      .catch((err) => {
        console.log(err);
        setSuccessInfo(false);
        setInfoTooltip(true);
      });
  }

  function tokenCheck() {
    if (localStorage.getItem("jwt")) {
      let jwt = localStorage.getItem("jwt");
      Auth.getContent(jwt).then((res) => {
        if (res) {
          console.log(res);
          setLoggedIn(true);
          setUserData({ email: res.email });
        }
      });
    }
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/signin");
  }

  //like card
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //delete card
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() =>
        setCards((state) => state.filter((c) => c._id !== card._id && c))
      )
      .catch((err) => {
        console.log(err);
      });
  }
  //
  function handleUpdateUser(user) {//
    api
     .editProfile(user.name, user.about)
      .then((editUser) => {
        setCurrentUser({
          ...currentUser,
          name: editUser.name,
          about: editUser.about,
        });
        closePopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //
  function handleChangeAvatar(data) {//
    api.changeAvatar(data.avatar)
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          avatar: res.avatar,
        });
        closePopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
//
  function handleAddPlace(card) {
    api.addCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closePopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

 useEffect(() => {
 tokenCheck();
 }, []);

  useEffect(() => {
  if (loggedIn) {
  api.getProfile()
  .then(res => {
    setCurrentUser(res);
  })
  .catch(res => {
    console.log(res);
  })

    api.getCards()
    .then(res => {
      console.log('cards res =>', res);   
     setCards(res);
  })
  .catch( res => {
    console.log(res);
  })
history.push("/");
return;
}
}, [loggedIn, history]);
  // open popup

  function handleEditProfileClick() {
    setPopupProfileOpened(true);//
  }
  function handleAddPlaceClick() {
    setPopupPlaceOpened(true);//
  }
  function handleEditAvatarClick() {
    setPopupAvatarOpened(true);//
  }

  function handleCardClick(card) {//обработчик клика по карточке
    setSelectedCard(card);
  }

  function closePopups() {
    setPopupProfileOpened(false);
    setPopupAvatarOpened(false);
    setPopupPlaceOpened(false);
    setSelectedCard({});
    setInfoTooltip(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Switch>
            <ProtectedRoute exact path="/" loggedIn={loggedIn}>
              <Header userData={userData}>
                <button onClick={handleSignOut} className="header__button">
                  Выйти
                </button>
              </Header>

              <Main
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDeleteClick={handleCardDelete}
              />
            </ProtectedRoute>

            <Route path="/signin">
              <Header userData="">
                <Link className="header__button" to="/signup">
                  Регистрация
                </Link>
              </Header>

              <Login handleLogin={handleLogin} />
            </Route>

            <Route path="/signup">
              <Header userData="">
                <Link className="header__button" to="/signin">
                  Войти
                </Link>
              </Header>

              <Register handleRegister={handleRegister} />
            </Route>
          </Switch>

          <Footer />

          <EditProfilePopup
            isOpen={isPopupProfileOpen}
            onClose={closePopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isPopupAvatarOpen}
            onClose={closePopups}
            onUpdateAvatar={handleChangeAvatar}
          />

          <AddPlacePopup
            isOpen={isPopupPlaceOpen}
            onClose={closePopups}
            onAddPlace={handleAddPlace}
          />

          <PopupWithForm
            title="Вы уверены?"
            name="delete"
            onClose={closePopups}
            buttonText="Да"
          />

          <ImagePopup onClose={closePopups} card={selectedCard} />

          <InfoTooltip
            isOpen={infoTooltipOpen}
            onClose={closePopups}
            isSuccess={success}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
