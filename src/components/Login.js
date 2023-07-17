import AuthForm from "./AuthForm";

function Login( { title, buttonText, authHandler }) {
	return(
		<AuthForm
			title={title}
			buttonText={buttonText}
			authHandler={authHandler}
		/>
	)
}

export default Login;