import { useContext } from "react";
import { useForm } from "react-hook-form";	

import PopupWithForm from "./PopupWithForm.js"
import { CurrentUserContext, OverlayClickContext, ShowLoaderContext } from "../contexts/Contexts.js";
import InputTextHook from "./hooks/InputTextHook.js"

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
				<InputTextHook
					title='name'
					register={register}
					errors={errors}
					defaultValue={currentUser.name}
				/>
				<InputTextHook
					title='about'
					register={register}
					errors={errors}
					defaultValue={currentUser.about}
				/>
		</PopupWithForm>
	)
}

export default EditProfilePopup;