import { createServer } from './create-server';

const port = 4000;
createServer().listen(port, () => {
  console.log(`Running API at port: ${port}`);
});
