import dotenv from 'dotenv';

import app from './app.js';
import connectDb from './config/database.js';

dotenv.config();

connectDb(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
