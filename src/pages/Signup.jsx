import React, { useState } from 'react';
import { signup } from '../api/auth';


export default function Signup() {
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [msg, setMsg] = useState('');


const onSubmit = async (e) => {
e.preventDefault();
const res = await signup({ username, email, password });
if (res.error) setMsg(res.error);
else {
localStorage.setItem('token', res.token);
setMsg('Signup successful — token saved to localStorage');
}
};


return (
<form onSubmit={onSubmit}>
<div>
<label>Username</label><br />
<input value={username} onChange={e => setUsername(e.target.value)} />
</div>
<div>
<label>Email</label><br />
<input value={email} onChange={e => setEmail(e.target.value)} />
</div>
<div>
<label>Password</label><br />
<input type="password" value={password} onChange={e => setPassword(e.target.value)} />
</div>
<button type="submit">Signup</button>
<div style={{ marginTop: 12 }}>{msg}</div>
</form>
);
}