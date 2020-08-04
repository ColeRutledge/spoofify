import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button, Typography } from '@material-ui/core'

import UserContext from '../context/UserContext'

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL


const Register = () => {
  const { users, setUsers } = useContext(UserContext)
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = async data => {
    console.log(data)
    // try {
    //   const res = await fetch(`${apiUrl}/create-user`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data),
    //   })

    //   if (res.ok) {
    //     console.log('Success!')
    //     let data = await res.json()
    //     console.log(data)
    //     setUsers([ data, ...users ])
    //   } else throw res

    // } catch (err) {
    //   console.log(err)
    // }
  }

  const errorStyles = {
    padding: '0 13px',
    backgroundColor: '#f8d7da',
    borderRadius: '4px',
  }

  return (


    <div style={{ display: 'flex', alignItems: 'center', paddingTop: '50px', flexDirection: 'column' }}>
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
        />
        {errors.userName?.type === 'required' &&
          <Typography style={errorStyles}
            >Username required.
          </Typography>}
        {errors.userName?.type === 'maxLength' &&
          <Typography style={errorStyles}
            >Username cannot exceed 50 characters.
          </Typography>}
        <TextField
          label='First Name'
          name='firstName'
          variant='outlined'
          style={{ margin: '10px 0' }}
          inputRef={register({ required: true, maxLength: 50 })}
        />
        {errors.firstName?.type === 'required' &&
          <Typography style={errorStyles}
            >First name required.
          </Typography>}
        {errors.firstName?.type === 'maxLength' &&
          <Typography style={errorStyles}
            >First name cannot exceed 50 characters.
          </Typography>}
        <TextField
          label='Last Name'
          name='lastName'
          variant='outlined'
          style={{ margin: '10px 0' }}
          inputRef={register({ required: true, maxLength: 50 })}
        />
        {errors.lastName?.type === 'required' &&
          <Typography style={errorStyles}
            >Last name required.
          </Typography>}
        {errors.lastName?.type === 'maxLength' &&
          <Typography style={errorStyles}
            >Last name cannot exceed 50 characters.
          </Typography>}
        <TextField
          label='Email Address'
          name='email'
          type='email'
          variant='outlined'
          style={{ margin: '10px 0' }}
          inputRef={register({ required: true, maxLength: 50 })}
        />
        {errors.email?.type === 'required' &&
          <Typography style={errorStyles}
            >Email required.
          </Typography>}
        {errors.email?.type === 'maxLength' &&
          <Typography style={errorStyles}
            >Email cannot exceed 50 characters.
          </Typography>}
        <TextField
          label='Password'
          name='password'
          type='password'
          variant='outlined'
          style={{ margin: '10px 0' }}
          inputRef={register({ required: true, minLength: 6, pattern: /^(?=.*\d)(?=.*[a-z])/ })}
        />
        {errors.password?.type === 'required' &&
          <Typography style={errorStyles}
            >Password required.
          </Typography>}
        {errors.password?.type === 'minLength' &&
          <Typography style={errorStyles}
          >Please provide a password with more than six characters that includes at least one number and one letter.
          </Typography>}
        {errors.password?.type === 'pattern' &&
          <Typography style={errorStyles}
            >Please provide a password with more than six characters that includes at least one number and one letter.
          </Typography>}
        <TextField
          label='Confirm Password'
          name='confirmPassword'
          type='password'
          variant='outlined'
          style={{ margin: '10px 0' }}
          inputRef={register({ required: true, minLength: 6, pattern: /^(?=.*\d)(?=.*[a-z])/ })}
        />
        {errors.confirmPassword?.type === 'required' &&
          <Typography style={errorStyles}
            >Password required.
          </Typography>}
        {errors.confirmPassword?.type === 'minLength' &&
          <Typography style={errorStyles}
            >Please provide a password with more than six characters that includes at least one number and one letter.
          </Typography>}
        {errors.confirmPassword?.type === 'pattern' &&
          <Typography style={errorStyles}
            >Please provide a password with more than six characters that includes at least one number and one letter.
          </Typography>}
        <Button
          variant='outlined'
          type='submit'
          style={{ margin: '10px 0' }}
        >Submit</Button>
      </form>
    </div>
  )
}


export default Register
