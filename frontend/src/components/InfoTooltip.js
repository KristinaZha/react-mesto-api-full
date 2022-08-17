import React from 'react';

function InfoTooltip(props){
return(
    <div className={`popup popup_type_info ${props.isOpen && "popup_opened"}`}>
    <div className="popup__window">
      <button className="popup__close-button" type="button"onClick={props.onClose}/>
      <div className={props.isSuccess ?  "popup__info-image popup__info-image_success" : "popup__info-image popup__info-image_fail"}></div>
        <p className='popup__info_title popup__info_title_success'>
        {props.isSuccess ? 'Вы успешно \ зарегистрировались!' : 'Что-то пошло не так! \ Попробуйте ещё раз.'}
        </p>
        </div>
</div>
);
}
export default InfoTooltip;