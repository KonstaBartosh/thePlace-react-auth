import { useContext } from "react";
import { useForm } from "react-hook-form";

import PopupWithForm from "./PopupWithForm";
import InputUrlHook from "./hooks/InputUrlHook";
import { OverlayClickContext, ShowLoaderContext } from "../contexts/Contexts";


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
	/** Подписка на контекст */
	const handleOverlayClick = useContext(OverlayClickContext);
	const handleShowLoader = useContext(ShowLoaderContext);

	const { 
		register,
		reset, 
		handleSubmit,
		isValid,
		formState: { errors } 
	} = useForm({ mode: "onChange" });

	function submitData(data) {
		onUpdateAvatar(data);
		reset();
	}

	return (
		<PopupWithForm
			name="userpic"
			title="Обновить аватар"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit(submitData)}
			buttonText="Обновить"
			handleOverlayClick={handleOverlayClick}
			isLoading={isLoading}
			handleShowLoader={handleShowLoader}
			isValid={!isValid}
			>
			<InputUrlHook
				title="avatar" 
				register={register} 
				errors={errors}
				placeholder="Ссылка на картинку" 
			/>
		</PopupWithForm>
	)
}

export default EditAvatarPopup;