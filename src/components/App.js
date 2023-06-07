import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

/** Импортируем компоненты приложения */
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import * as auth from '../utils/Auth.js'
import { PopupContext } from "../contexts/PopupContext.js";

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
	const [userEmail, setUserEmail] = useState('');
	const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
	const navigate = useNavigate();


	/** Эффект с результатами промиса с сервера о пользователе и карточках */
	useEffect(() => {
		Promise.all([api.getUserDataApi(), api.getInitialCardsApi()])
			.then(([userData, cardsData]) => {
				setCurrentUser(userData);
				setCards(cardsData);
			})
			.catch((err) => alert(`Возникла ошибка ${err}`))
	}, []);

	/** Обработчик логина */
	function handleLogin(email) {
		setLoggedIn(true);
		setUserEmail(email); /** отображение в хедере email'a */
	}

	/** Обработчик логаута */
	function handleLogOut() {
		localStorage.removeItem('token');
		setLoggedIn(false)
		navigate('/sign-in');
	}

	/** Валидность токена */
	function handleTokenCheck() {
		const token = localStorage.getItem('token');

		if (token) {
			auth.checkToken(token)
				.then((user) => {
					if (user) {
						//* Получем данные пользователя */
						const curentUserEmail = user.data.email;
						//* Авторизуем пользователя */
						setLoggedIn(true);
						navigate('/main', { replace: true });
						setUserEmail(curentUserEmail);
					}
				})
				.catch((err) => alert(`Возникла ошибка ${err}`))
		}
	}


	//* Проврека токена, есть ли он? */
	useEffect(() => {
		handleTokenCheck();
	}, [])


	function handleUpdateAvatar(data) {
		api.changeUserAvatarApi(data)
			.then((userData) => {
				setCurrentUser(userData);
				closeAllPopups();
			})
			.catch((err) => alert(`Возникла ошибка ${err}`))
	}


	function handleUpdateUser(data) {
		api.changeUserDataApi(data)
			.then((userData) => {
				setCurrentUser(userData);
				closeAllPopups();
			})
			.catch((err) => alert(`Возникла ошибка ${err}`))
	}


	function handleAddPlaceSubmit(card) {
		api.addCardApi(card)
			.then((newCard) => {
				setCards([newCard, ...cards]);
				closeAllPopups();
			})
			.catch((err) => alert(`Возникла ошибка ${err}`))
	}


	function handleCardLike(card) {
		// Проверяем, есть ли уже лайк на этой карточке
		const isCurrentUserLiked = card.likes.some((like) => like._id === currentUser._id);
		// Отправляем запрос в API и получаем обновлённые данные карточки
		api.changeLikeCardStatus(card._id, !isCurrentUserLiked)
			.then((newCard) => {
				setCards((cards) => cards.map((item) => item._id === card._id ? newCard : item));
			})
			.catch((err) => alert(`Возникла ошибка ${err}`))
	}


	function handleCardDelete(card) {
		api.deleteCardApi(card._id)
			.then(() => {
				setCards((cards) => cards.filter((item) => item._id !== card._id));
			})
			.catch((err) => alert(`Возникла ошибка ${err}`))
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


	//* Закоытие попапов по клику на оверлей*/
	function handleOverlayClick(evt) {
		if (evt.target === evt.currentTarget) {
			closeAllPopups();
		}
	}


	return (
		<div className="page">
			<CurrentUserContext.Provider value={currentUser}>
				<Header loggedIn={loggedIn} userEmail={userEmail} handleLogOut={handleLogOut} />
				<Routes>
					<Route path="/" element={loggedIn ? <Navigate to="/main" /> : <Navigate to="/sign-in" replace />} />
					<Route path="/sign-up" element={
						<Register
							buttonText='Зарегестрироваться'
							setRegister={setRegister}
							setInfoTooltipOpen={setInfoTooltipOpen}
						/>}
					/>
					<Route path="/sign-in" element={
						<Login
							handleLogin={handleLogin}
							buttonText='Войти'
						/>}
					/>
					<Route path="/main" element={
						<ProtectedRoute
							element={Main}
							loggedIn={loggedIn}
							onEditAvatar={handleEditAvatarClick}
							onEditProfile={handleEditProfileClick}
							onAddPlace={handleAddPlaceClick}
							onCardClick={handleCardClick}
							onCardLike={handleCardLike}
							onCardDelete={handleCardDelete}
							cards={cards}
						/>}
					/>
				</Routes>
				<Footer />
				<PopupContext.Provider value={handleOverlayClick}>
					<EditAvatarPopup
						isOpen={isEditAvatarPopupOpen}
						onClose={closeAllPopups}
						onUpdateAvatar={handleUpdateAvatar}
					/>
					<EditProfilePopup
						isOpen={isEditProfilePopupOpen}
						onClose={closeAllPopups}
						onUpdateUser={handleUpdateUser}
					/>
					<AddPlacePopup
						isOpen={isAddPlacePopupOpen}
						onClose={closeAllPopups}
						onAddPlace={handleAddPlaceSubmit}
					/>
				</PopupContext.Provider>
				<InfoTooltip
					name='infoTooltip'
					isOpen={isInfoTooltipOpen}
					onClose={closeAllPopups}
					registred={registred}
					handleOverlayClick={handleOverlayClick}
				/>
				<ImagePopup
					card={selectedCard}
					isOpen={isImagePopupOpen}
					onClose={closeAllPopups}
					handleOverlayClick={handleOverlayClick}
				>
				</ImagePopup>
				{/* <PopupWithForm
					name="delete-card"
					title="Вы уверены?">
					<p className="popup__title">Вы уверены?</p>
				</PopupWithForm> */}
			</CurrentUserContext.Provider>
		</div>
	)
}
export default App;