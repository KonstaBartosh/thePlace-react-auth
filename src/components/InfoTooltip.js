import successLogo from '../images/Registration-success.svg';
import deniedLogo from '../images/Registration-denied.svg'

function InfoTooltip({ name, isOpen, onClose, registred }) {
	const successTitle = 'Вы успешно зарегистрировались!';
	const deniedTitle = 'Что-то пошло не так! Попробуйте ещё раз.';

	return (
		<div className={`popup ${isOpen ? "popup_opened" : ""} popup_type_${name}`} >
			<div className="popup__container overlay">
				<button
					className="popup__close-button"
					aria-label="Закрыть"
					type="button"
					onClick={onClose} />
				{registred ? (
					<>
						<img className="popup__image_infotooltip" src={successLogo} />
						<p className="popup__title_infotooltip">{successTitle}</p>
					</>
				) : (
					<>
						<img className="popup__image_infotooltip" src={deniedLogo} />
						<p className="popup__title_infotooltip">{deniedTitle}</p>
					</>
				)
				}
			</div>
		</div>
	)
}

export default InfoTooltip;