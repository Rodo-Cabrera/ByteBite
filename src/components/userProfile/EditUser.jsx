import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useForm } from 'react-hook-form';

const EditUser = () => {

  const { actualUser } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
    email: actualUser[0].email
    }
  });

  const [userData, setUserData] = useState({
    email: "",
  })


  return (
    <>
      
    </>
  )
}

export default EditUser
