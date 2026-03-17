import { app } from './src/app.js';

app.listen(process.env.APP_RUNNING_PORT, () => {
  console.log(`App listening on port ${process.env.APP_RUNNING_PORT}`);
});
