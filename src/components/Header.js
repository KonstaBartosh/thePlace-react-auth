import logo from '../images/logo.png';

function Header() {
	return(
		<header className="header header_line">
			<img src={logo} alt="Логотип" className="header__logo"/>
		</header>
	)
}

export default Header;