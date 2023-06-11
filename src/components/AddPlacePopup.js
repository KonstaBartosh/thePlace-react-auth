import { useContext  } from "react";
import { useForm } from "react-hook-form";

import { OverlayClickContext, ShowLoaderContext } from "../contexts/Contexts.js";
import PopupWithForm from "./PopupWithForm";
import TextInput from "./inputs/TextInput";
import UrlInput from "./inputs/UrlInput";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
	/** Подписка на контекст */
	const handleOverlayClick = useContext(OverlayClickContext);
	const handleShowLoader = useContext(ShowLoaderContext);

	const { 
    register,
    handleSubmit,
		reset,
		isValid, 
    formState: { errors } 
  } = useForm({ mode: "onChange" });

  function submitData(data) {
    onAddPlace(data);
		reset();
  }

	return (
		<PopupWithForm
			name="add"
			title="Новое место"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit(submitData)}
			buttonText="Создать"
			handleOverlayClick={handleOverlayClick}
			isLoading={isLoading}
			handleShowLoader={handleShowLoader}
			isValid={!isValid}
		>
			<TextInput 
				title="name"
				register={register}
				errors={errors}
				placeholder="Название"
			/>
			<UrlInput
				title="link"
				register={register}
				errors={errors}
				placeholder="Ссылка на картинку" 			
			/>
		</PopupWithForm>
	)
}
	
export default AddPlacePopup;