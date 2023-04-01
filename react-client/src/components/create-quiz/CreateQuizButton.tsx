import { Box, Button, Fab } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../../redux/app/hooks'
import AddIcon from '@mui/icons-material/Add'

/**
 * Button to go to the quiz/create page if the user is logged in
 */
function CreateQuizButton() {
  const { isLoggedIn } = useUser()

  if (!isLoggedIn) return <></>

  return (
    <Box
      position='absolute'
      bottom={10}
      left='50%'
      sx={{ transform: 'translate(-50%, 0)' }}
    >
      <Link to='/quiz/create'>
        <Fab color='primary' aria-label='create quiz'>
          <AddIcon />
        </Fab>
      </Link>
    </Box>
  )
}

export default CreateQuizButton
