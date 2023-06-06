import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.png';

function Header({ loggedIn, userEmail, handleLogOut }) {
	const locationUrl = useLocation();
	const path = (locationUrl.pathname === '/sign-in') ? '/sign-up' : '/sign-in';
	const linkTitle = (locationUrl.pathname === '/sign-in') ? 'Регистрация' : 'Войти';

	return (
		<header className="header header_line">
			<img src={logo} alt="Логотип" className="header__logo" />
			{loggedIn ? (
				<div className='header__container' >
					<p className="header__email">{userEmail}</p>
					<button className="header__link" onClick={handleLogOut}>Выйти</button>
				</div>
			) : (
				<Link className="header__link" to={path}>{linkTitle}</Link>
			)}
		</header>
	)
}

export default Header;