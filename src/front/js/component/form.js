import React, { useState } from 'react';

export const Form = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function sendData(e) {
        e.preventDafault()
        console.log('SendData')
        console.log('email, password')
    }
    return (
    <nav className= "">
        <div ClassName="container">
            <h1>Formulario</h1>
            <form onSubmit={sendData}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} class="form-control" id="exampleInputEmail1" input />
                </div>
                <div class="mb-3" >
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} class="form-control" id="exampleInputPassword1" input />
                </div >
                <button type="submit" class="btn btn-primary">Ingresar</button>
            </form>

        </div>
    </nav>
    );
};
