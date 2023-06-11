	const InputTextHook = ( { title, register, errors, placeholder }) => {
		return(
			<>
				<input
					{...register(title, {
						required: "Заполните это поле.",
						minLength: {
							value: 2,
							message: "Текст должен быть не короче 2 символов",
						},
						maxLength: 40
					})}
					id={`${title}-input`}
					type="text"
					placeholder={placeholder}
					className="popup__field form__input"
				/>
				<span className="form__error-message form__error-message_active">
					{errors?.[title] && <p>{errors?.[title]?.message}</p>}
				</span>			
			</>
		)
	}

	export default InputTextHook;