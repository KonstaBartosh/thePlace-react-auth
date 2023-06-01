import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Component, ...props }) {
	return (
		props.loggedIn ? <Component {...props} /> : <Navigate to="/login" replace />
	);
}

export default ProtectedRoute;