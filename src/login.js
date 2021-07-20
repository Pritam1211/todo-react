import React, { useState } from "react";



const Login = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const login = () => {
        if(username !== '' && password !==''){
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(({name}) => name===username);
            if(user){
                if(user.pass === password){
                    props.handleLogin(user);
                }else{
                    setError('Password is incorrect.');
                }
            }else{
                setError('User does not exists.');
            }
        }else{
            setError('Enter username and password');
        }
    }
    
    return (
        <div>
            <div style={{color:"#fff", fontSize:18}}><p>{error}</p></div>
        <div className='login'>
            <h1 className='header'>Login</h1>
            <div className='input-field'>
                <i className='fa fa-user' style={{color: '#c89666', fontSize: 18}}  />
                <input className='input' placeholder='Usernmae' name='username' onChange={handleUsername} value={username} />
            </div>
            <div className='input-field'>
                <i style={{color: '#c89666', fontSize: 18}} className='fa fa-key' />
                <input className='input' type='password' placeholder='Passeord' name='username' onChange={handlePassword} value={password} />
            </div>
            <div>
                <button className='btn' onClick={login} >Login</button>
            </div>
            <button className='btn' onClick={props.change} >Signup</button>
        </div>
        </div>
    )

};


const Signup = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [error, setError] = useState('');
    
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleCpassword = (event) => {
        setCpassword(event.target.value);
    };

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const signup = () => {
        if(username !== '' && password !==''){
            if(password !== cpassword){
                setError("Password and Confirm Password does not match.")
            }else{
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const user = users.find(({name}) => name===username);
                if(user){
                    setError('User already exists.');
                }else{
                    users.push({name:username, pass:password});
                    localStorage.setItem('users', JSON.stringify(users));
                    props.change();
                }
            }   
        }
        else{
            setError('Enter username and password');
        }
    }
    
    return (
        <div>
            <div style={{color:"#fff", fontSize:18}}><p>{error}</p></div>
        <div className='login'>
            <h1 className='header'>Signup</h1>
            <div className='input-field'>
                <i className='fa fa-user' style={{color: '#c89666', fontSize: 18}}  />
                <input className='input' placeholder='Usernmae' name='username' onChange={handleUsername} value={username} />
            </div>
            <div className='input-field'>
                <i style={{color: '#c89666', fontSize: 18}} className='fa fa-key' />
                <input className='input' type='password' placeholder='Password' onChange={handlePassword} value={password} />
            </div>
            <div className='input-field'>
                <i style={{color: '#c89666', fontSize: 18}} className='fa fa-key' />
                <input className='input' type='password' placeholder='Confirm Password'  onChange={handleCpassword} value={cpassword} />
            </div>
            <div>
                <button className='btn' onClick={signup} >Signup</button>
            </div>
            <button className='btn' onClick={props.change} >Login</button>
        </div>
        </div>
    )

};


const User = props =>{
    
    const [nav, setNav] = useState(true);

    const change = () => {
        setNav(nav => !nav);
    }

    return(
        <div>
        {nav ? <Login change={change} handleLogin={props.setuser} /> : <Signup change={change} />}
        </div>
    )
}


export default User;