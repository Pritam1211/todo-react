import React, { useState } from "react";
import Task from './task';
import User from './login';

const App = props => {
    const [user, setUser] = useState(null);

    const setuser = newuser => {
        setUser(newuser);
    }

    const logout = () => {
        setUser(null);
    }

    return (
        <div className='container'>
            {user!==null ? <Task user={user} logout={logout} /> : <User setuser={setuser} />}
        </div>
    )

};

export default App;