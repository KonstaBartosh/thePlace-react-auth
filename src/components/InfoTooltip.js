import tooltipLogo from '../images/Registration-success.svg'

function InfoTooltip({ name, title, isOpen, onClose }) {
	return (
		<div className={`popup ${isOpen ? "popup_opened" : ""} popup_type_${name}`} >
			<div className="popup__container overlay">
				<button
					className="popup__close-button"
					aria-label="Закрыть"
					type="button"
					onClick={onClose} />
				<img className="popup__image_infotooltip" src={tooltipLogo} />
				<p className="popup__title_infotooltip">{title}</p>
			</div>
		</div>
	)
}

export default InfoTooltip;