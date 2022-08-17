import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    let { email, password } = state;
    props.handleRegister(email, password).catch((err) => {
      console.log(err);
    });
  }

  return (
    <section className="entry">
      <form onSubmit={handleSubmit} className="entry__form">
        <h3 className="entry__title">Регистрация</h3>

        <input
          className="entry__input entry__input_type_email"
          name="email"
          placeholder="Email"
          type="email"
          value={state.email}
          onChange={handleChange}
          id="email"
        />
        <input
          className="entry__input entry__input_type_password"
          name="password"
          placeholder="Пароль"
          type="password"
          value={state.password}
          onChange={handleChange}
          id="password"
        />

        <button type="submit" className="entry__link">
          Зарегистрироваться
        </button>
        <p className="entry__login-link">
          <Link to="/sign-in" className="entry__login-link">
            Уже зарегистрировались? Войти
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
