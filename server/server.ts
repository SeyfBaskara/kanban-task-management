import 'dotenv/config'
import app from './src/index'

const PORT = process.env.PORT || 5001

app.listen(PORT, (): void => {
   console.log(`Server is listening on port ${PORT}`)
})
