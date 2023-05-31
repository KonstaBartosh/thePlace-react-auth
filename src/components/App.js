import { useState, useEffect } from "react";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";

function App() {
	const [isEditAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
	const [isEditProfilePopupOpen, setProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
	const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
	const [currentUser, setCurrentUser] = useState({});
	const [cards, setCards] = useState([]);
	const [selectedCard, setSelectedCard] = useState({});

	/** Эффект с результатами промиса с сервера о пользователе и карточках */
	useEffect(() => {
		Promise.all([api.getUserDataApi(), api.getInitialCardsApi()])
			.then(([userData, cardsData]) => {
				setCurrentUser(userData);
				setCards(cardsData);
			})
			.catch((err) => alert(`Возникла ошибка ${err}`))
	}, []);


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
	}

	return (
		<div className="page">
			<CurrentUserContext.Provider value={currentUser}>
				<Header />
				<Main
					onEditAvatar={handleEditAvatarClick}
					onEditProfile={handleEditProfileClick}
					onAddPlace={handleAddPlaceClick}
					onCardClick={handleCardClick}
					onCardLike={handleCardLike}
					onCardDelete={handleCardDelete}
					cards={cards}
				/>
				<Footer />

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

				<PopupWithForm
					name="delete-card"
					title="Вы уверены?">
					<p className="popup__title">Вы уверены?</p>
				</PopupWithForm>

				<ImagePopup
					card={selectedCard}
					isOpen={isImagePopupOpen}
					onClose={closeAllPopups}>
				</ImagePopup>

			</CurrentUserContext.Provider>
		</div>
	)
}
export default App;