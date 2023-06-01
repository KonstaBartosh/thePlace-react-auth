function Register() {
	return(
		<div className="signup">
			<h2 className="signup__title">Регистрация</h2>
			<form className="signup__form" name="register-form">
				<input
					type="email"
					className="signup__input"
					placeholder="Email"
					minLength="2" maxLength="40"
					required
				/>
				<input 
					type="password"
					className="signup__input"
					placeholder="Пароль"
					minLength="2" maxLength="40"
					required
				/>
			</form>
			<button className="signup__button" type="submit">Зарегистрироваться</button>
			<p className="signup__question">Уже зарегестрированы?<a className="signup__link"> Войти</a></p>
		</div>
	)
}

export default Register;