import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../../redux/app/hooks'

/**
 * Button to go to the quiz/create page if the user is logged in
 */
function CreateQuizButton() {
  const { isLoggedIn } = useUser()

  if (!isLoggedIn) return <></>

  return (
    <Link to='/quiz/create'>
      <Button variant='contained'>Create quiz</Button>
    </Link>
  )
}

export default CreateQuizButton
