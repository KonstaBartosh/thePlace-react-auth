import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import * as auth from '../utils/Auth.js'

function Register({ buttonText }) {
	const [formValue, setFormValue] = useState({email: '', password: ''});
	const navigate = useNavigate();

	/** Обновление стейта при вводе в инпут */
  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }


	function handleRegister(evt) {
		evt.preventDefault();
		/** здесь обработчик регистрации */
		auth.register(formValue.email, formValue.password)
			.then(() => {
				navigate('/sign-in');
			})
	}

	return(
		<div className="signup">
			<h2 className="signup__title">Регистрация</h2>
			<form className="signup__form" name="form__register" onSubmit={handleRegister} >
				<input
					id="email"
					name="email"
					type="email"
					value={formValue.email}
					onChange={handleChange}
					className="signup__input"
					placeholder="Email"
					minLength="2" maxLength="40"
					required
				/>
				<input
					id="password"
					name="password"
					type="password"
					value={formValue.password}
					onChange={handleChange}
					className="signup__input"
					placeholder="Пароль"
					minLength="2" maxLength="40"
					required
				/>
			<button 
				className="signup__button" 
				type="submit"
				onSubmit={handleRegister}
				>{buttonText}
			</button>
			</form>
			<p className="signup__question">Уже зарегестрированы?
				<Link to={"/sign-in"} className="signup__link"> Войти</Link>
			</p>
		</div>
	)
}

export default Register;