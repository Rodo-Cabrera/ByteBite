import React, { useContext } from 'react'
import Panel from '../admin/users/Panel'
import UserList from '../admin/users/UserList'
import { useAuth } from '../../hooks/useAuth'
import { userContext } from '../../context/AuthContext'

const Users = () => {

  const { userId } = useAuth()
  const {token} = useContext(userContext)

  return (
    <div className='container-fluid d-flex'>
      <Panel id={userId} token={token} />
      <UserList />
    </div>
  )
}

export default Users
