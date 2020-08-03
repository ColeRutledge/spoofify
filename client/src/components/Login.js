import React from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button } from '@material-ui/core'

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL


const Login = () => {
  const { register, handleSubmit } = useForm()

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
      } else throw res

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', width: '40ch' }}
        color='primary'
      >
        <TextField
          label='Name'
          name='name'
          variant='outlined'
          style={{ margin: '7px 0' }}
          inputRef={register({ required: true })}
        />
        <TextField
          label='Email Address'
          name='email'
          type='email'
          variant='outlined'
          style={{ margin: '7px 0' }}
          inputRef={register({ required: true })}
        />
        <TextField
          label='Password'
          name='password'
          type='password'
          variant='outlined'
          style={{ margin: '7px 0' }}
          inputRef={register({ required: 'Please include a password.', minLength: 6 })}
        />
        <Button
          variant='outlined'
          type='submit'
          style={{ margin: '10px 0' }}
        >Submit</Button>
      </form>
    </div>
  )
}


export default Login
