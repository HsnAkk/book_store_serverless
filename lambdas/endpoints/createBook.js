import { v4 as uuid } from 'uuid';
import createError from 'http-errors';
// import { validator } from 'middy/middlewares';
import AWS from 'aws-sdk';
import commonMiddleware from '../../lib/commonMiddleware';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function createBook(event, context) {
  const { title, author, category, publisher, condition, quantity, image, description, price, shipping, rating } = event.body;
  const now = new Date();
  const book = {
    id: uuid(),
    title,
    author,
    category,
    publisher,
    condition,
    quantity,
    image,
    description,
    price,
    shipping,
    rating,
    createdAt: now.toISOString(),
  };
  try {
    await dynamoDB.put({
      TableName: process.env.BOOKS_TABLE_NAME,
      Item: book
    }).promise();
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
  return {
    statusCode: 201,
    body: JSON.stringify(book),
  };
}

export const handler = commonMiddleware(createBook)
