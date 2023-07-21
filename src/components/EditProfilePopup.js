import { useContext } from "react";
import { useForm } from "react-hook-form";	

import PopupWithForm from "./PopupWithForm.js"
import { CurrentUserContext, OverlayClickContext, ShowLoaderContext } from "../contexts/Contexts.js";
import TextInput from "./inputs/TextInput"

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  /** Подписка на контекст */
  const currentUser = useContext(CurrentUserContext);
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
    onUpdateUser(data);
		reset();
  }
	
	return (
		<PopupWithForm
			name="profile"
			title="Редактировать профиль"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit(submitData)}
			buttonText="Сохранить"
			handleOverlayClick={handleOverlayClick}
			isLoading={isLoading}
			handleShowLoader={handleShowLoader}
			isValid={!isValid}
			>
				<TextInput
					title='title'
					register={register}
					errors={errors}
					defaultValue={currentUser.name}
				/>
				<TextInput
					title='about'
					register={register}
					errors={errors}
					defaultValue={currentUser.about}
				/>
		</PopupWithForm>
	)
}

export default EditProfilePopup;