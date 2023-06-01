function Login() {
	return(
		<div className="signup">
			<h2 className="signup__title">Вход</h2>
			<form className="signup__form" name="login-form">
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
			<button className="signup__button" type="submit">Войти</button>
		</div>
	)
}

export default Login;