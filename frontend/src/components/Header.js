import logo from '../images/logo.svg';
function Header(props) {
  return (
    <header className="header">
      <img src={logo} className="header__logo"/>
      <div className='header__email-container'>
      <p className="header__email-text"> {props.userData.email}</p>
       {props.children}
       </div>
     
   </header>
  );
}

export default Header;
