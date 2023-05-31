import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm.js"
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
	/** Подписка на контекст */
	const currentUser = useContext(CurrentUserContext);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const handleNameChange = (evt) => setName(evt.target.value);
	const handleAboutChange = (evt) => setDescription(evt.target.value);
	
	/** С помощью эффекта отображаем в инпутах данные юзера с сервера */
	useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser, isOpen])

	function handleSubmit(evt) {
		evt.preventDefault();
		/** Передаём значения управляемых компонентов во внешний обработчик */
		onUpdateUser({
			name: name,
			about: description
		});
	}

	return (
		<PopupWithForm
			name="profile"
			title="Редактировать профиль"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			buttonText="Сохранить">
			<input
				value={name ?? ''}
				onChange={handleNameChange}
				name="name"
				id="name-input"
				className="popup__field form__input popup__field_type_profile-name"
				type="text"
				minLength="2" maxLength="40"
				required
			/>
			<span className="name-input-error form__error-message"></span>
			<input
				value={description ?? ''}
				onChange={handleAboutChange}
				name="about"
				id="occupation-input"
				className="popup__field form__input popup__field_type_profile-occupation"
				type="text"
				minLength="2" maxLength="200"
				required
			/>
			<span className="occupation-input-error form__error-message"></span>
		</PopupWithForm>
	)
}

export default EditProfilePopup;