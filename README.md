# Money Changer Feature Backend

## Overview

This project provides a backend service for a Money Changer feature. It handles requests to provide change for a given amount using predefined denominations and maintains records of transactions. It is built using NestJS with MySQL/Postgres as the database.

## Features

- **Request Change**: Provides change for a given amount using the available denominations.
- **Get Denomination Count**: Retrieves the current count of each denomination available.
- **Get Transactions**: Fetches transaction records for a given mobile number and date range.

## API Endpoints

1. **Request Change**

   - **Endpoint**: `/change`
   - **Method**: `POST`
   - **Input**: Mobile number and amount
   - **Response**: `{20:2, 10:1, 2:1, 1:1}`

2. **Get Denomination Count**

   - **Endpoint**: `/count`
   - **Method**: `GET`
   - **Response**: `{20:99890, 10:5467, 5:7654, 2:9900, 1:5200}`

3. **Get Transactions**

   - **Endpoint**: `/transaction`
   - **Method**: `POST`
   - **Input**: Mobile Number, startDate & endDate
   - **Response**: Transactions in descending order of DateTime

## Setup

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd money-changer
2. **Install Dependencies**

   ````bash
   npm install
3. **Start the Application**
   - Development Mode

      ```bash
      npm run start:dev
      ````
   - Production Mode
      ```bash
      npm run start:prod
3. **Build the Application**
   ```bash
      npm run 
## API Documentation

API documentation is available via Swagger. You can view it at the following link:

[Swagger API Docs](http://localhost:3000/api#/money-changer)

## Screenshots and Documentation

- **API Execution Screenshots**: Available in the `api-execution&schema-screenshots` folder.
- **Postman Collection**: Available in the `postman-collection` folder. This file contains all possible responses for the API, including both success and error cases.
- **DB Schema Screenshots**: Available in the `api-execution&schema-screenshots/schema` folder.






