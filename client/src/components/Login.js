import React from "react";
import {axiosWithAuth} from './axiosWithAuth';


class Login extends React.Component {
    state = {
        credentials: {
            username: "",
            password: ""
        },
        isFetching: false
    };

    handleChange = e => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        });
    };

    login = e => {
        e.preventDefault();
        this.setState({
            isFetching: true
        });
        axiosWithAuth()
        .post("/login", this.state.credentials)
        .then(res => {
            console.log(res);
            localStorage.setItem("token", res.data.payload);
            this.props.history.push('/bubblepage');
        })
        .catch((err) => {
            console.error(err.message);
            localStorage.removeItem("authToken");
        });
    };

    render() {
        return (
            <div className="container">
                <h1>Please Login Below</h1>
                <form onSubmit={this.login}>
                    <h3>Username</h3>
                    <input
                        type="text"
                        name="username"
                        value={this.state.credentials.username}
                        onChange={this.handleChange}
                    />
                    <h3>Password</h3>
                    <input
                        type="password"
                        name="password"
                        value={this.state.credentials.password}
                        onChange={this.handleChange}
                    /> 
                    <button>Log in</button>
                    {this.state.isFetching && 'logging in'}
                </form>
            </div>
        );
    }
}

export default Login; 

