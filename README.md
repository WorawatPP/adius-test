# Adius Test

**Back-end Developer**
***
**Build With**

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html) [![Node.js](https://img.shields.io/badge/Node.js-v16.13.0-success)](https://nodejs.org/) [![mongoose](https://img.shields.io/badge/mongoose-%5E6.1.7-brightgreen)](https://www.npmjs.com/search?q=mongoose) [![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-%5E8.5.1-yellow)](https://www.npmjs.com/package/jsonwebtoken) [![bcrypt.js](https://img.shields.io/badge/bcryptjs-%5E2.4.3-red)](https://www.npmjs.com/search?q=bcryptjs) [![@hapi/joi](https://img.shields.io/badge/%40hapi%2Fjoi-%5E17.1.1-critical)](https://www.npmjs.com/package/@hapi/joi)

***
**Requirements**
1. [Node JS](https://nodejs.org/en/)
2. [Express JS](https://expressjs.com/)
3. [Postman](https://www.postman.com/)
4. Web Server (ex. localhost)
***
**User Register & Login**
***
**Register**
* **Request : POST /api/user/register**
* **Respone :**

    ```sh
    {
    "username": "worawat",
    "email": "tri.worawat@gmail.com",
    "password": "$2a$10$IyGe8uKmQJr.BzKvHJWA3uU7NIbEDby6Ecy4KZa00up9guQycTsVq",
    "isAdmin": false,
    "_id": "61ea61819a2f448dafea8957",
    "date": "2022-01-21T07:32:17.847Z"
    }
    ```

**Login**
* **Request : POST /api/user/login**
* **Respone :**

    ```sh
        {
        "message": "Login successfully",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWVhNjE4MTlhMmY0NDhkYWZlYTg5NTciLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NDI3NTA2ODR9.lW3N5AtjtWlYK91J7gMvaib8G3Pjdg_uVBVzLu5gnBM"
        }
    ```
****
**Book API**
****

**Create Book**
 * **Request : POST /api/book**
 * **require isAdmin = true**
 * **Respone :**

    ```sh
        {
        "title": "MERN Stack Course",
        "desc": "Learning MERN Stack",
        "amount": 5,
        "_id": "61ea62e89a2f448dafea895b",
        "date": "2022-01-21T07:38:16.230Z"
        }
    ```

    
**Get Books**
* **Request : GET /api/book**
* **Respone :**
    ```sh
    [
        {
            "_id": "61ea62e89a2f448dafea895b", //Use for rent book
            "title": "MERN Stack Course",
            "desc": "Learning MERN Stack",
            "amount": 5,
            "date": "2022-01-21T07:38:16.230Z"
        }
    ]
    ```
    
**Rent Book**
* **Request : POST /api/book/rent/:id**
* *example id = 61ea62e89a2f448dafea895b*
* **Body :**
    ```sh
    {
        "rentAmount": 1
    }
    ```
* **Respone :**
    ```sh
    {
        "bookId": "61ea62e89a2f448dafea895b",
        "bookTitle": "MERN Stack Course",
        "userId": "61e8fe239167bc9ef52d4aec",
        "rentAmount": 1,
        "status": "rent",
        "rentDate": "2022-01-21T07:46:34.215Z",
        "_id": "61ea64da9a2f448dafea895f" //Use for Return Book
    }
    ```
    
**Return Book**
* **Request : PATCH /api/book/return/:id**
* *example id = 61ea64da9a2f448dafea895f*
* **Respone :**
    ```sh
    {
        Return book successfully
    }
    ```


***
**Rent book history**
***

**Get all log**
* **Request : GET /api/log**
* **Respone :**
    ```sh
    [
        {
            "_id": "61ea64da9a2f448dafea895f",
            "bookId": "61ea62e89a2f448dafea895b",
            "bookTitle": "MERN Stack Course",
            "userId": "61e8fe239167bc9ef52d4aec",
            "rentAmount": 0,
            "status": "return",
            "rentDate": "2022-01-21T07:46:34.215Z",
            "price": 0,
            "returnAt": "2022-01-21T07:50:57.900Z"
        },
        {
            "_id": "61ea67e4806013412f5566c6",
            "bookId": "61ea62e89a2f448dafea895b",
            "bookTitle": "MERN Stack Course",
            "userId": "61ea67c9806013412f5566c2",
            "rentAmount": 1,
            "status": "rent",
            "rentDate": "2022-01-21T07:59:32.993Z"
        }
    ]
    ```


**Get Log By UserID**
* **Request : GET /api/log/user/:id**
* *example1 userId = 61e8fe239167bc9ef52d4aec*
* **Respone :**
    ```sh
    [
        {
            "_id": "61ea64da9a2f448dafea895f",
            "bookId": "61ea62e89a2f448dafea895b",
            "bookTitle": "MERN Stack Course",
            "userId": "61e8fe239167bc9ef52d4aec",
            "rentAmount": 0,
            "status": "return",
            "rentDate": "2022-01-21T07:46:34.215Z",
            "price": 0,
            "returnAt": "2022-01-21T07:50:57.900Z"
        }
    ]
    ```
* *example2 userId = 61ea67c9806013412f5566c2*
* **Respone :**
    ```sh
    [
        {
            "_id": "61ea67e4806013412f5566c6",
            "bookId": "61ea62e89a2f448dafea895b",
            "bookTitle": "MERN Stack Course",
            "userId": "61ea67c9806013412f5566c2",
            "rentAmount": 1,
            "status": "rent",
            "rentDate": "2022-01-21T07:59:32.993Z"
        }
    ]
    ```


**Get Log by status = rent**
* **Request : GET /api/log/rent**
* **Respone :**
    ```sh
    [
        {
            "_id": "61ea67e4806013412f5566c6",
            "bookId": "61ea62e89a2f448dafea895b",
            "bookTitle": "MERN Stack Course",
            "userId": "61ea67c9806013412f5566c2",
            "rentAmount": 1,
            "status": "rent",
            "rentDate": "2022-01-21T07:59:32.993Z"
        }
    ]
    ```
    
    
**Get Log by status = return**
* **Request : GET /api/log/return**
* **Respone :**
    ```sh
    [
        {
            "_id": "61ea64da9a2f448dafea895f",
            "bookId": "61ea62e89a2f448dafea895b",
            "bookTitle": "MERN Stack Course",
            "userId": "61e8fe239167bc9ef52d4aec",
            "rentAmount": 0,
            "status": "return",
            "rentDate": "2022-01-21T07:46:34.215Z",
            "price": 0,
            "returnAt": "2022-01-21T07:50:57.900Z"
        }
    ]
    ```
    ***
