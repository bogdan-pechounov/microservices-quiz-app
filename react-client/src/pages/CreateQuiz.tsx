import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'

export default function CreateQuiz() {
  return (
    <div>
      <Box component='form' p={2}>
        <Stack spacing={2} width={500}>
          <TextField label='name'></TextField>
          <TextField label='description' rows={3} multiline></TextField>
        </Stack>
      </Box>
    </div>
  )
}
