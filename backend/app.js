const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');


const app = express();

connectDB();

app.use(express.json());

app.use('/api/ck', productRoutes);

const PORT =  1337;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
