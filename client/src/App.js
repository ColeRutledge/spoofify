// import React from 'react';
import React, { useState, useEffect } from 'react';
import Login from './components/Login'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core'


const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    width: '90%',
  }
});

function App() {
  const [users, setUsers] = useState(null)
  const classes = useStyles();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(`${apiUrl}/users`)

        if (res.ok) {
          const data = await res.json()
          setUsers([...data])
        }
      } catch (err) {
        console.error(err)
      }
    }

    getUsers()
  }, [])


  return (
    <>
      <h1 style={{ fontFamily: 'Roboto', textAlign: 'center' }}>Hello from the React App!</h1>
      <Login />
      {!users
        ? <div>No users</div>
        : <div style={{ display: 'flex', justifyContent: 'center' }}>
          <TableContainer className={classes.container} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">ID</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Password</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, idx) => (
                  <TableRow key={user.name}>
                    <TableCell align="right">{user.id}</TableCell>
                    <TableCell align="right">{user.name}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.password.slice(0, 40)}</TableCell>
                  </TableRow>
                )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      }
    </>
  );
}

export default App;
