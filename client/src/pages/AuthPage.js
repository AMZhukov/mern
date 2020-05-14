import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    });

    useEffect(() => {
        message(error);
        clearError()
    }, [ message, error, clearError]);

    useEffect(() => {
        window.M.updateTextFields()
    }, []);

    const changeHandler = event => {
        setForm({ ...form , [event.target.name]: event.target.value })
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message)
        } catch (e) {

        }
    };

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.user)
        } catch (e) {

        }
    };

    return (
        <div className="row">
            <div className="col s6 offse6-s3">
                <h1>Сократи ссылку</h1>
                <div className="card purple lighten-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input
                                    type="text"
                                    id="email"
                                    placeholder="Введите email"
                                    name="email"
                                    className="gray-input"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div>
                            <div className="input-field">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Введите пароль"
                                    className="gray-input"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="first_name">Пароль</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn pink darken-1"
                            style={{marginRight: 10}}
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Войти
                        </button>
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};
