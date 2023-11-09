import { Link, useLocation, useNavigate } from "react-router-dom";
import burgerIcon from '../images/burger_white.png';
import closeIcon from '../images/cloese_white.png';
import { useState } from "react";

function Header({ loggedIn, userEmail, handleLogOut, toggleMenu, menuOpen }) {
  const navigate = useNavigate();
  const url = useLocation();
  const path = url.pathname === "/sign-in" ? "/sign-up" : "/sign-in";
  const linkTitle = url.pathname === "/sign-in" ? "Регистрация" : "Войти";
  const [isClicked, setIsClicked] = useState(false);

  const toggle = () => {
    toggleMenu();
    setIsClicked(!isClicked);
  }

	return (
    <>
      {loggedIn && (
        <div className={`header_line header__mobile-container ${!menuOpen ? "hidden" : ""}`}>
          <p className="header__email">{userEmail}</p>
          <button className="header__link" onClick={handleLogOut} style={{ fontSize: 18 }}>
            Выйти
          </button>
        </div>
      )}
      <header className="header header_line">
        <h1 className="header__logo" onClick={() => navigate('/')}>The Place</h1>
        {loggedIn && (
          <>
            <div className="burger-menu" onClick={toggle}>
              {isClicked ? (
                <img src={closeIcon} alt="Закрыть меню" />
              ) : (
                <img src={burgerIcon} alt="Открыть меню" />
              )}
            </div>
            <div className={`header__container ${!menuOpen && "hidden"}`}>
              <p className="header__email">{userEmail}</p>
              <button className="header__link" onClick={handleLogOut} style={{ fontSize: 18 }}>
                Выйти
              </button>
            </div>
          </>
        )}
        {!loggedIn && (<Link className="header__link" to={path}>{linkTitle}</Link>)}
      </header>
    </>
  );
}

export default Header;