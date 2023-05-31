import { useContext, useEffect, useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
	const currentUser = useContext(CurrentUserContext);
	const input = useRef();

	/** С помощью эффекта отображаем пустые поля после ввода ссылки */
	useEffect(() => {
		input.current.value = ''
	}, [currentUser])

	function handleSubmit(evt) {
		evt.preventDefault();
		onUpdateAvatar({
			avatar: input.current.value,
		});
	}


	return (
		<PopupWithForm
			name="userpic"
			title="Обновить аватар"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			buttonText="Обновить">
			<input
				name="avatar"
				id="avatar-input"
				type="url"
				className="popup__field form__input"
				placeholder="Ссылка на картинку"
				ref={input}
				required
			/>
			<span className="avatar-input-error form__error-message"></span>
		</PopupWithForm>
	)
}

export default EditAvatarPopup;