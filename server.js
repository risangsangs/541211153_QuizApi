const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
const quizRoute = require('./router/quiz');
const jobsheetRoute = require('./router/jobsheet');
const authRoute = require('./router/auth');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./models')
db.sequelize.sync()

app.use('/api/quizzes', quizRoute)
app.use('/api/jobsheet', jobsheetRoute)
app.use('/auth', authRoute);

app.listen(port, () => console.log(`App listening on port http://localhost:${port} !`));