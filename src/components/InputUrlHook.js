const InputUrlHook = ( { title, register, errors }) => {
	return(
		<>
			<input
				{...register(title, {
					required: "Заполните это поле.",
					pattern: {
						value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
						message: 'Введите адрес URL, он должен начинаться с https://'
					}
				})}
				id={`${title}-input`}
				type="url"
				placeholder="Ссылка на картинку"
				className="popup__field form__input"
			/>
			<span className="form__error-message form__error-message_active">
				{errors?.[title] && <p>{errors?.[title]?.message}</p>}
			</span>			
		</>
	)
}

export default InputUrlHook;