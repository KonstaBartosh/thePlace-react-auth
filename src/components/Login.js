import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import * as auth from '../utils/Auth.js'

function Login({ handleLogin, buttonText }) {
	const [formValue, setFormValue] = useState({email: '', password: ''});
	const navigate = useNavigate();

	const handleChange = (evt) => {
    const {name, value} = evt.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

	const handleSubmit = (evt) => {
    evt.preventDefault();
    auth.authorize(formValue.email, formValue.password)
      .then((data) => {
        if(data.token) {
          setFormValue({
            email: '',
            password: ''
          })
				handleLogin(formValue.email);
        navigate('/main');
        }
      })
      .catch(err => console.log(err));
  }

	return (
		<div className="signup">
			<h2 className="signup__title">Войти</h2>
			<form className="signup__form" name="form__login" onSubmit={handleSubmit}>
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
				<button className="signup__button" type="submit" onSubmit={handleSubmit} >{buttonText}</button>
			</form>
		</div>
	)
}

export default Login;