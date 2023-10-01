const app = require('./app.js')
const router = require('./routes/PaymentRoutes.js')

app.use(router)

const PORT = 3000

app.listen(PORT,()=>console.log('Server running at PORT',PORT))