import AuthForm from "./AuthForm";

function Login( { title, buttonText, handler }) {
	return(
		<AuthForm
			title={title}
			buttonText={title}
			handler={handler}
		/>
	)
}

export default Login;