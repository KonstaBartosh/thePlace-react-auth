import { useContext  } from "react";
import { useForm } from "react-hook-form";
import PopupWithForm from "./PopupWithForm";
import { OverlayClickContext, ShowLoaderContext } from "../contexts/Contexts.js";
import InputTextHook from "./hooks/InputTextHook";
import InputUrlHook from "./hooks/InputUrlHook";

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
			<InputTextHook 
				title="name"
				register={register}
				errors={errors}
				placeholder="Название"
			/>
			<InputUrlHook
				title="link"
				register={register}
				errors={errors}
				placeholder="Ссылка на картинку" 			
			/>
		</PopupWithForm>
	)
}
	
export default AddPlacePopup;