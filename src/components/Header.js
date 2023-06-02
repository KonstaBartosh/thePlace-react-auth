import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.png';

function Header({ loggedIn }) {
	const locationUrl = useLocation();
	const path = (locationUrl.pathname === '/sign-in') ? '/sign-in' : '/sign-up';
	const linkTitle = (locationUrl.pathname === '/sign-in') ? 'Регистрация' : 'Войти';

	console.log(locationUrl.pathname);

	return (
		<header className="header header_line">
			<img src={logo} alt="Логотип" className="header__logo" />
			{loggedIn ? (
				<Link className="header__link" to="/sign-up">Заглушка</Link>
			) : (
				<Link className="header__link" to={path}>{linkTitle}</Link>
			)}
		</header>
	)
}

export default Header;