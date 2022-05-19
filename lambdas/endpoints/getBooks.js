import AWS from 'aws-sdk';
import createError from 'http-errors';
// import { validator } from 'middy/middlewares';
import commonMiddleware from '../../lib/commonMiddleware';
// import getAuctionsSchema from '../lib/schemas/getAuctionsSchema';


const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function getBooks(event, context) {
  let books;
  // const { status } = event.queryStringParameters;
  

  const params = {
    TableName: process.env.BOOKS_TABLE_NAME,
    // IndexName: 'statusAndEndDate',
    // KeyConditionExpression: '#status = :status',
    // ExpressionAttributeValues: {
    //   ':status': status,
    // },
    // ExpressionAttributeNames: {
    //   '#status': 'status'
    // }
  }
  
  try {
    const result = await dynamoDB.scan(params).promise();

    books = result.Items;

  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(books),
  };
}

export const handler = commonMiddleware(getBooks)
  // .use(
  //   validator({
  //     inputSchema: getAuctionsSchema,
  //     ajvOptions: {
  //       useDefaults: true,
  //       strict: false,
  //     },
  //   })
  // );


