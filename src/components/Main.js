import { useContext } from "react";
import { CurrentUserContext } from "../contexts/Contexts.js";

import Card from "./Card.js";
import defaultUserPic from '../images/custou.jpeg';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
  isLoading
}) {
  const currentUser = useContext(CurrentUserContext); /** Подписка на контекст */

  return (
    isLoading ? 
    <p style={{color: 'white', textAlign: 'center', padding: '100px 0', fontSize: '20px'}}>Loading...</p>
    : (<main className="main">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-container">
            <div
              style={{ backgroundImage: `url(${currentUser.avatar || defaultUserPic})` }}
              className="profile__avatar"
              onClick={onEditAvatar}
            ></div>
          </div>
          <div className="profile__info">
            <h1 className="profile__info-title">{currentUser.name || 'Jacques Cousteau'}</h1>
            <p className="profile__info-subtitle">{currentUser.about || 'Sailor, researcher, diver'}</p>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            ></button>
          </div>
        </div>
        <button
          className="profile__button"
          aria-label="Добавить"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="cards">  {/* <--- Здесь карточки --- */}
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>)
  );
}

export default Main;
