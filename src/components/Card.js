import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
	/** Подписка на контекст */
	const currentUser = useContext(CurrentUserContext);

	//** Определяем, являемся ли мы владельцем текущей карточки */
	const isOwn = card.owner._id === currentUser._id;
	// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
	const isLiked = card.likes.some(like => like._id === currentUser._id);
	// Создаём переменную, которую после зададим в `className` для кнопки лайка
	const cardLikeButtonClassName = (`card__like ${isLiked && 'card__like_active'}`); 


	function handleClick() {
		onCardClick(card);
	}

	function handleLikeClick() {
		onCardLike(card);
	}

	function handleDeleteClick() {
		onCardDelete(card);
	}

	return (
		<div className="card">
			{/* Используем переменную для условного рендеринга в разметке */}
			{isOwn && <button className="card__trash-icon" type="button" alt="Удалить" onClick={handleDeleteClick} ></button>}
			<img className="card__image" src={card.link} alt={card.name} onClick={handleClick} />
			<div className="card__header">
				<h2 className="card__title">{card.name}</h2>
				<div className="card__like-wrapper">
					<button 
						className={cardLikeButtonClassName} 
						type="button" 
						alt="Нравится" 
						onClick={handleLikeClick}>
					</button>
					<p className="card__likes">{card.likes.length}</p>
				</div>
			</div>
		</div>
	)
}

export default Card;