import { app } from './app'

const PORT = process.env.APP_PORT || 3000
app.listen(PORT, () => {
  console.log('Server on port 3000 ')
})
