import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Redirect } from 'react-router-dom'
import { TextField, Button, Typography, CircularProgress } from '@material-ui/core'
import UserContext from '../context/UserContext'

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL


const Register = () => {
  const [ registerError, setRegisterError ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const { register, handleSubmit, errors, clearErrors } = useForm()
  const { auth, setAuth } = useContext(UserContext)

  document.body.style.backgroundColor = '#FFF'

  const onSubmit = async data => {
    let res
    try {
      if (!data.email) {
        data = { email: 'demo_user@email.com', password: 'password1' }
        res = await fetch(`${apiUrl}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        } else {
          if (data.password !== data.confirmPassword) return setRegisterError('Confirmed password does not match.')
          setLoading(true)
          res = await fetch(`${apiUrl}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
        }

      if (res.ok) {
        let data = await res.json()
        setLoading(false)
        if (data.error) {
          setRegisterError(data.error)
          return
        }
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', data.username)
        localStorage.setItem('id', data.id)
        setAuth(data.token)
        console.log(data)
      } else throw res

    } catch (err) {
      setLoading(false)
      console.error(err)
    }
  }

  const errorStyles = {
    padding: '0 13px',
    backgroundColor: '#f8d7da',
    borderRadius: '4px',
  }

  return (
    <>
      {auth
        ? <Redirect to='/library' />
        : <div
            style={{
              display: 'flex',
              marginTop: '75px',
              paddingTop: '50px',
              alignItems: 'center',
              marginLeft: '-250px',
              flexDirection: 'column',
            }}
          >
          <h1 style={{ fontSize: 22 }}>Registration</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', width: '40ch' }}
            color='primary'
          >
            <TextField
              label='Username'
              name='userName'
              variant='outlined'
              style={{ margin: '10px 0' }}
              inputRef={register({ required: true, maxLength: 50 })}
              onChange={e => { clearErrors(e.target.name) }}
            />
            {errors.userName?.type === 'required' &&
              <Typography style={errorStyles}>
                Username required.
            </Typography>}
            {errors.userName?.type === 'maxLength' &&
              <Typography style={errorStyles}>
                Username cannot exceed 50 characters.
              </Typography>}
            <TextField
              label='First Name'
              name='firstName'
              variant='outlined'
              style={{ margin: '10px 0' }}
              inputRef={register({ required: true, maxLength: 50 })}
              onChange={e => { clearErrors(e.target.name) }}
            />
            {errors.firstName?.type === 'required' &&
              <Typography style={errorStyles}>
                First name required.
              </Typography>}
            {errors.firstName?.type === 'maxLength' &&
              <Typography style={errorStyles}>
                First name cannot exceed 50 characters.
              </Typography>}
            <TextField
              label='Last Name'
              name='lastName'
              variant='outlined'
              style={{ margin: '10px 0' }}
              inputRef={register({ required: true, maxLength: 50 })}
              onChange={e => { clearErrors(e.target.name) }}
            />
            {errors.lastName?.type === 'required' &&
              <Typography style={errorStyles}>
                Last name required.
              </Typography>}
            {errors.lastName?.type === 'maxLength' &&
              <Typography style={errorStyles}>
                Last name cannot exceed 50 characters.
              </Typography>}
            <TextField
              label='Email Address'
              name='email'
              type='email'
              variant='outlined'
              style={{ margin: '10px 0' }}
              inputRef={register({ required: true, maxLength: 50 })}
              onChange={e => { clearErrors(e.target.name) }}
            />
            {errors.email?.type === 'required' &&
              <Typography style={errorStyles}>
                Email required.
              </Typography>}
            {errors.email?.type === 'maxLength' &&
              <Typography style={errorStyles}>
                Email cannot exceed 50 characters.
              </Typography>}
            <TextField
              label='Password'
              name='password'
              type='password'
              variant='outlined'
              style={{ margin: '10px 0' }}
              inputRef={register({ required: true, minLength: 6, pattern: /^(?=.*\d)(?=.*[a-z])/ })}
              onChange={e => { clearErrors(e.target.name) }}
            />
            {errors.password?.type === 'required' &&
              <Typography style={errorStyles}>
                Password required.
              </Typography>}
            {errors.password?.type === 'minLength' &&
              <Typography style={errorStyles}>
                Please provide a password with more than six characters that includes at least one number and one letter.
              </Typography>}
            {errors.password?.type === 'pattern' &&
              <Typography style={errorStyles}>
                Please provide a password with more than six characters that includes at least one number and one letter.
              </Typography>}
            <TextField
              label='Confirm Password'
              name='confirmPassword'
              type='password'
              variant='outlined'
              style={{ margin: '10px 0' }}
              inputRef={register({ required: true, minLength: 6, pattern: /^(?=.*\d)(?=.*[a-z])/ })}
              onChange={e => { clearErrors(e.target.name); setRegisterError('') }}
            />
            {errors.confirmPassword?.type === 'required' &&
              <Typography style={errorStyles}>
                Password required.
              </Typography>}
            {errors.confirmPassword?.type === 'minLength' &&
              <Typography style={errorStyles}>
                Please provide a password with more than six characters that includes at least one number and one letter.
              </Typography>}
            {errors.confirmPassword?.type === 'pattern' &&
              <Typography style={errorStyles}>
                Please provide a password with more than six characters that includes at least one number and one letter.
              </Typography>}
            {registerError &&
              <Typography style={{ ...errorStyles, marginTop: '2px' }}>
                {registerError}
            </Typography>}
            <div style={{ display: 'flex' }}>
              <Button
                variant='outlined'
                type='submit'
                style={{ margin: '20px 5px 0 0' }}
                disabled={loading}
                fullWidth={true}
              >{loading
                ? <CircularProgress size={22} thickness={2} />
                : 'Submit'}
              </Button>
              <Button
                fullWidth={true}
                variant='outlined'
                style={{ margin: '20px 0 0 5px' }}
                disabled={loading}
                onClick={onSubmit}
              >{loading
                ? <CircularProgress size={22} thickness={2} />
                : 'Demo User'}
              </Button>
            </div>
          </form>
        </div>
      }
    </>
  )
}


export default Register
