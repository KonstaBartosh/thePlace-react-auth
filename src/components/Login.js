import { render } from "@testing-library/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

function Login({ buttonText, handleLogin }) {
  const [formValue, setFormValue] = useState({ email: "", password: "" });

  const { register, formState: { errors, isValid } } = useForm({ mode: "onBlur" });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
  const emailMinLengthMessage = "Минимум 6 символов";
  const emailMaxLenghtMessage = "Электронная почта должна содержать не более 40 символов";
  const emailPatternMessage = "Адрес электронной почты должен содержать символ ' @ ' ";

  /** Обновление стейта при вводе в инпут */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin(formValue);
    setFormValue({ email: "", password: "" });
  };

  // const onHookForm = (data) =>{
  //   alert(JSON.stringify(data));
  // }

  // console.log(render)
  return (
    <div className="signup">
      <h2 className="signup__title">Войти</h2>
      <form className="signup__form" name="form__login" onSubmit={handleSubmit} >
        <input
          {...register("email", {
            required: "Заполните это поле.",
            validate: {
              minLength: (value) => value.length > 5 || emailMinLengthMessage,

              maxLength: (value) => value.length <= 40 || emailMaxLenghtMessage,

              matchPattern: (value) => emailRegex.test(value) || emailPatternMessage,
            },
          })}
          id="email"
          type="email"
          value={formValue.email}
          onChange={handleChange}
          placeholder="Email"
          className="signup__input"
        />
        <div className="form__error-message form__error-message_active">
          {errors?.email && <p>{errors?.email?.message}</p>}
        </div>
        <input
          {...register("password", {
            required: "Заполните это поле.",
            minLength: {
              value: 3,
              message: "Минимум 3 символа"
            },
            maxLength: 40,
          })}          
          id="password"
          type="password"
          value={formValue.password}
          onChange={handleChange}
          placeholder="Пароль"
          className="signup__input"
        />
        <div className="form__error-message form__error-message_active">
          {errors?.password && <p>{errors?.password?.message}</p>}
        </div>        
        <button
          className="signup__button"
          type="submit"
          disabled={ !isValid }
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default Login;