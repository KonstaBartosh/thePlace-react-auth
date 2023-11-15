import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

/** Импортируем компоненты приложения */
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import { api } from "../utils/Api.js";
import { CurrentUserContext, OverlayClickContext, ShowLoaderContext } from "../contexts/Contexts.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import * as auth from "../utils/Auth.js";

function App() {
const [isEditAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
const [isEditProfilePopupOpen, setProfilePopupOpen] = useState(false);
const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
const [currentUser, setCurrentUser] = useState({});
const [cards, setCards] = useState([]);
const [selectedCard, setSelectedCard] = useState({});
const [registred, setRegister] = useState(false);
const [loggedIn, setLoggedIn] = useState(false);
const [userEmail, setUserEmail] = useState("");
const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
const [isLoading, setLoading] = useState(true);
const [menuOpen, setMenuOpen] = useState(false);
const navigate = useNavigate();
const location = useLocation();
const showFooter = location.pathname !== '/sign-in' && location.pathname !== '/sign-up';

const handleError = (err) => {
  console.error(`Возникла ошибка ${err}`)
}

/** Эффект с результатами промиса с сервера о пользователе и карточках */
useEffect(() => {
  api.getInitialCardsApi()
    .then((cards) => setCards(cards))
    .catch(err => handleError(err))
    .finally(() => setLoading(false))
}, [])

useEffect(() => {
  if (loggedIn) {
    api.getUserDataApi()
      .then((userData) => setCurrentUser(userData))
      .catch(err => handleError(err))
  }
}, [loggedIn])

  //* Проврека токена, есть ли он? */
  useEffect(() => {
    if(loggedIn) {handleTokenCheck()}
  }, []);

/** Обработчик логаута */
function handleLogOut() {
  localStorage.removeItem("token");
  setLoggedIn(false);
  setMenuOpen(!menuOpen);
  navigate("/");
}

const toggleBurgerMenu = () => {
  setMenuOpen(!menuOpen);
};

/** Регистрация */
function handleRegister({ email, password }) {
  auth
    .register(email, password)
    .then(() => {
      setRegister(true);
      setInfoTooltipOpen(true);
      navigate("/sign-in");
    })
    .catch((err) => {
      setInfoTooltipOpen(true);
      console.log(`Возникла ошибка ${err}`);
    });
}

/** Авторизация */
function handleLogin({ email, password }) {
  auth
    .authorize({ email, password })
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        setUserEmail(email); /** отображение в хедере email'a */
        navigate("/");
      }
    })
    .catch((err) => {
      setInfoTooltipOpen(true)
      console.log(err);
    });
}

/** Валидность токена */
function handleTokenCheck() {
  const token = localStorage.getItem("token");

  if (token) {
    auth
      .checkToken(token)
      .then((user) => {
        if (user) {
          //* Получем данные пользователя */
          const curentUserEmail = user.data.email;
          //* Авторизуем пользователя */
          setLoggedIn(true);
          navigate("/", { replace: true });
          setUserEmail(curentUserEmail);
        }
      })
      .catch(err => handleError(err));
  }
}

function handleUpdateAvatar(data) {
  api
    .changeUserAvatarApi(data)
    .then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    })
    .catch(err => handleError(err));
}

function handleUpdateUser(data) {
  api
    .changeUserDataApi(data)
    .then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    })
    .catch(err => handleError(err));
}

function handleAddPlaceSubmit(card) {
  api
    .addCardApi(card)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(err => handleError(err));
}

function handleCardLike(card) {
  // Проверяем, есть ли уже лайк на этой карточке
  const isCurrentUserLiked = card.likes.some(
    (like) => like._id === currentUser._id
  );
  // Отправляем запрос в API и получаем обновлённые данные карточки
  api
    .changeLikeCardStatus(card._id, !isCurrentUserLiked)
    .then((newCard) => {
      setCards((cards) =>
        cards.map((item) => (item._id === card._id ? newCard : item))
      );
    })
    .catch(err => handleError(err));
}

function handleCardDelete(card) {
  api
    .deleteCardApi(card._id)
    .then(() => {
      setCards((cards) => cards.filter((item) => item._id !== card._id));
    })
    .catch(err => handleError(err));
}

function handleCardClick(card) {
  setSelectedCard(card);
  setIsImagePopupOpen(true);
}

/** Открытие попапов */
function handleEditAvatarClick() {
  setAvatarPopupOpen(true);
}

function handleEditProfileClick() {
  setProfilePopupOpen(true);
}

function handleAddPlaceClick() {
  setAddPlacePopupOpen(true);
}

/** Закрытие попапов */
function closeAllPopups() {
  setAvatarPopupOpen(false);
  setProfilePopupOpen(false);
  setAddPlacePopupOpen(false);
  setIsImagePopupOpen(false);
  setInfoTooltipOpen(false);
}

//* Закрытие попапов по клику на оверлей*/
function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeAllPopups();
  }
}

//* Отображение кнопки загрузки*/
function showLoader() {
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
  }, 1500);
}

return (
  <div className="page">
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        loggedIn={loggedIn}
        userEmail={userEmail}
        handleLogOut={handleLogOut}
        toggleMenu={toggleBurgerMenu}
        menuOpen={menuOpen}
      />
      <Routes>
        <Route path="/" element={
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
            isLoading={isLoading}
          />
        }
        
        />
        <Route path="/sign-up" element={
            <Register
              title="Регистрация"
              buttonText="Зарегестрироваться"
              authHandler={handleRegister}
            />
          }
        />
        <Route path="/sign-in" element={
            <Login
              title="Войти"
              buttonText="Войти" 
              authHandler={handleLogin} 
            />
          }
        />
      </Routes>
      {showFooter && <Footer isLoading={isLoading}/>}
      <OverlayClickContext.Provider value={handleOverlayClick}>
        <ShowLoaderContext.Provider value={showLoader}>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />
        </ShowLoaderContext.Provider>
      </OverlayClickContext.Provider>
      <InfoTooltip
        name="infoTooltip"
        successTitle="Вы успешно зарегистрировались!"
        deniedTitle="Что-то пошло не так! Попробуйте ещё раз."
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        registred={registred}
        handleOverlayClick={handleOverlayClick}
      />
      {/* <PopupWithForm
        name="delete-card"
        title="Вы уверены?">
        <p className="popup__title">Вы уверены?</p>
      </PopupWithForm> */}
    </CurrentUserContext.Provider>
  </div>
);
}

export default App;