import { render } from "@testing-library/react";
import { useForm } from "react-hook-form";

function Login({ buttonText, handleLogin }) {
  const requiredMessage = "Заполните это поле.";
  const minLengthMessage = "Минимум 3 символа";
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
  const emailMinLengthMessage = "Минимум 6 символов";
  const emailMaxLenghtMessage = "Электронная почта должна содержать не более 40 символов";
  const emailPatternMessage = "Адрес электронной почты должен содержать символ ' @ ' ";

  const {
    register, 
    handleSubmit, 
    formState: { errors, isValid } 
  } = useForm({ mode: "onChange" });

  //* Отправка данных на сервер */
  const submitData = (data) => {
    handleLogin(data);
  };

  return (
    <div className="signup">
      <h2 className="signup__title">Войти</h2>
      <form className="signup__form" name="form__login" onSubmit={handleSubmit(submitData)} >
        <input
          {...register("email", {
            required: requiredMessage,
            validate: {
              minLength: (value) => value.length > 5 || emailMinLengthMessage,
              maxLength: (value) => value.length <= 40 || emailMaxLenghtMessage,
              matchPattern: (value) => emailRegex.test(value) || emailPatternMessage,
            },
          })}
          id="email"
          type="email"
          placeholder="Email"
          className="signup__input"
        />
        <div className="form__error-message form__error-message_active">
          {errors?.email && <p>{errors?.email?.message}</p>}
        </div>
        <input
          {...register("password", {
            required: requiredMessage,
            minLength: {
              value: 3,
              message: minLengthMessage
            },
            maxLength: 40,
          })}          
          id="password"
          type="password"
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