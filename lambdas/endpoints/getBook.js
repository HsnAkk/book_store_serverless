import AWS from 'aws-sdk';
import createError from 'http-errors';
import commonMiddleware from '../../lib/commonMiddleware';

const dynamoDB = new AWS.DynamoDB.DocumentClient();


export async function getBookById(id) {
  let book;
  try {
    const result = await dynamoDB.get({
      TableName: process.env.BOOKS_TABLE_NAME,
      Key: {id}
    }).promise();

    book = result.Item;

  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  if (!book) {
    throw new createError.NotFound(`Book with ID "${id}" not found!`);
  }
  
  return book;
}


async function getBook(event, context) {
  const { id } = event.pathParameters; 
  
  const book = await getBookById(id);

  return {
    statusCode: 200,
    body: JSON.stringify(book),
  };
}

export const handler = commonMiddleware(getBook)


