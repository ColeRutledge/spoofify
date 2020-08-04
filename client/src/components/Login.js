import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button, Typography } from '@material-ui/core'

import UserContext from '../context/UserContext'

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL


const Login = () => {
  const { users, setUsers } = useContext(UserContext)
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = async data => {
    console.log(data)
    try {
      const res = await fetch(`${apiUrl}/create-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        console.log('Success!')
        let data = await res.json()
        console.log(data)
        setUsers([ data, ...users ])
      } else throw res

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', width: '40ch' }}
        color='primary'
      >
        <TextField
          label='User Name'
          name='userName'
          variant='outlined'
          style={{ margin: '15px 0' }}
          inputRef={register({ required: true, maxLength: 50 })}
        />
        {errors.userName?.type === 'required' && <Typography style={{ backgroundColor: '#f8d7da' }}>Username required.</Typography>}
        {errors.userName?.type === 'maxLength' && <Typography style={{ backgroundColor: '#f8d7da' }}>Username cannot exceed 50 characters.</Typography>}
        <TextField
          label='Email Address'
          name='email'
          type='email'
          variant='outlined'
          style={{ margin: '15px 0' }}
          inputRef={register({ required: true, maxLength: 255 })}
        />
        {errors.email?.type === 'required' && <Typography style={{ backgroundColor: '#f8d7da' }}>Email required.</Typography>}
        {errors.email?.type === 'maxLength' && <Typography style={{ backgroundColor: '#f8d7da' }}>Email cannot exceed 50 characters.</Typography>}
        <TextField
          label='Password'
          name='password'
          type='password'
          variant='outlined'
          style={{ margin: '15px 0' }}
          inputRef={register({ required: true, minLength: 6, pattern: /^(?=.*\d)(?=.*[a-z])$/ })}
        />
        {errors.password?.type === 'required' && <Typography style={{ backgroundColor: '#f8d7da' }}>Invalid password.</Typography>}
        {errors.password?.type === 'minLength' && <Typography style={{ backgroundColor: '#f8d7da' }}>Invalid password.</Typography>}
        {errors.password?.type === 'pattern' && <Typography style={{ backgroundColor: '#f8d7da' }}>Invalid password.</Typography>}
        <Button
          variant='outlined'
          type='submit'
          style={{ margin: '20px 0' }}
        >Submit</Button>
      </form>
    </div>
  )
}


export default Login
