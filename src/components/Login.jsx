import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../utils/api'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!email || !password) return setError('Please fill email & password')
    setLoading(true)
    const res = await login(email, password)
    setLoading(false)
    if (res.error) {
      setError(res.error || 'Login failed')
      return
    }
    // expected { token, user }
    if (res.token && res.user) {
      onLogin(res.user, res.token)
    } else {
      setError('Unexpected server response')
    }
  }

  // quick demo accounts note: you can add demo credentials here or show a small hint
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={{marginBottom:10}}>Login</h2>
        <form onSubmit={submit}>
          <label style={styles.label}>Email</label>
          <input style={styles.input} value={email} onChange={e=>setEmail(e.target.value)} type="email" />
          <label style={styles.label}>Password</label>
          <input style={styles.input} value={password} onChange={e=>setPassword(e.target.value)} type="password" />
          {error && <div style={styles.error}>{error}</div>}
          <button style={styles.btn} type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
        </form>

        <div style={{marginTop:12}}>
          <small>New patient? <Link to="/register">Register here</Link></small>
        </div>

        <div style={{marginTop:10}}>
          <small>Doctor accounts are pre-created. Use the doctor credentials from README.</small>
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#f5f7fb' },
  card: { width: 360, padding:20, background:'#fff', borderRadius:8, boxShadow:'0 4px 14px rgba(0,0,0,0.08)' },
  label: { display:'block', fontSize:13, marginTop:10 },
  input: { width:'100%', padding:'8px 10px', marginTop:6, borderRadius:6, border:'1px solid #ddd' },
  btn: { width:'100%', marginTop:14, padding:10, borderRadius:6, background:'#2563eb', color:'#fff', border:'none' },
  error: { marginTop:8, color:'#b00020' }
}
