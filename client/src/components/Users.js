import React, { useContext } from 'react'
import UserContext from '../context/UserContext'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    margin: 25,
  }
})


const Users = () => {
  const { users } = useContext(UserContext)
  const classes = useStyles()

  return (
    <>
      {!users
        ? <div>No users</div>
        : <div style={{ display: 'flex', justifyContent: 'center', margin: '0px 25px 25px', paddingTop: '50px' }}>
          <TableContainer component={Paper}>
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
  )
}


export default Users
