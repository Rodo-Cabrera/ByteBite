import React from 'react'
import Panel from '../admin/users/Panel'
import UserList from '../admin/users/UserList'
import UserPanel from '../userProfile/UserPanel'

const Users = () => {

  return (
    <div className='container-fluid d-flex'>
      <Panel />
      <UserList />
    </div>
  )
}

export default Users
