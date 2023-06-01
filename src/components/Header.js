import logo from '../images/logo.png';

function Header() {
	return(
		<header className="header header_line">
			<img src={logo} alt="Логотип" className="header__logo"/>
			<a><p className="header__link">Регистрация</p></a>
		</header>
	)
}

export default Header;