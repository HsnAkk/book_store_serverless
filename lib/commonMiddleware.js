import middy from 'middy';
import { jsonBodyParser, cors, httpEventNormalizer, httpErrorHandler } from 'middy/middlewares';


export default handler => middy(handler)
  .use(jsonBodyParser())
  .use(httpErrorHandler())
  .use(httpEventNormalizer())
  .use(cors());