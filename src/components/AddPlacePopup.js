import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
	const [title, setTitle] = useState('')
	const [link, setLink] = useState('')
	const handleTitleChange = (evt) => setTitle(evt.target.value);
	const handleLinkChange = (evt) => setLink(evt.target.value);

	/** С помощью эффекта обновляем в инпутах поля */
	useEffect(() => {
		setTitle('');
		setLink('');
	}, [isOpen])

	function handleSubmit(evt) {
		evt.preventDefault();
		onAddPlace({
			name: title,
			link: link
		})
	}

	return (
		<PopupWithForm
			name="add"
			title="Новое место"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			buttonText="Создать">
			<input
				value={title ?? ''}
				name="add__title"
				id="title-input"
				type="text"
				className="popup__field form__input"
				placeholder="Название"
				minLength="2" maxLength="30"
				onChange={handleTitleChange}
				required
			/>
			<span className="title-input-error form__error-message"></span>
			<input
				value={link ?? ''}
				name="add__link"
				id="link-input"
				type="url"
				className="popup__field form__input"
				placeholder="Ссылка на картинку"
				onChange={handleLinkChange}
				required
			/>
			<span className="link-input-error form__error-message"></span>
		</PopupWithForm>
	)
}
	
export default AddPlacePopup;