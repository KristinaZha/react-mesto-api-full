import React, { useState } from "react";


function Login(props){
  const [inputs, setInputs] = useState({
      email: '',
      password: '',
  });

  function handleChange(e){
      const {name, value} = e.target;
      setInputs((prev) => ({
          ...prev,
          [name]: value,
      }));
  }

  function handleSubmit(e){
      e.preventDefault();
      if (!inputs.email || !inputs.password) {
          return;
      }

      props.handleLogin(inputs.email, inputs.password)
          .catch((err) => {
              console.log(err);
          })
  }

  return (
    <div className="entry">
      <form className="entry__form" onSubmit={handleSubmit}>
        <h3 className="entry__title">Вход</h3>
 
          <input
            className="entry__input entry__input_type_email"
            onChange={handleChange}
            required
            type="email"
            value={inputs.email}
            placeholder="Email"
            name="email"
            id="email" 
          ></input>
          <input
            className="entry__input entry__input_type_password"
            onChange={handleChange}
            required
            type="password"
            value={inputs.password}
            placeholder="Пароль"
            name="password"
            id="password"
          ></input>
      
        <button type="submit" className="entry__link">
          Войти
        </button>
      </form>
    </div>
  );
}
export default Login;
