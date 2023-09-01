# http-request-lib
A library for GET, POST, DELETE and PUT Requests using Fetch API and simplify the usage.

## Installation

```bash
npm i http-request-lib
```

## Usage

### Import library:
```javascript
import {http_request} from "http-request-lib";
```

### Basic example
```javascript
const sendPost = await http_request.post('https://jsonplaceholder.typicode.com/posts')
    .data({
        title:'foo',
        body: 'bar',
        userId: 1
    })
    .fetch();
if(sendPost.status === 'success'){
    console.log(sendPost.result);
    //or you can use
    console.log(http_request.result);
}
```


### Using global domain

If you are going to make multiple requests to the same URL with different URI then you can use this to register the
domain as global.

```javascript
http_request.domain('https://jsonplaceholder.typicode.com');
```

**POST request**
```javascript

const submitPost = await http_request.uri('/posts')
    .post()
    .data({
        title:'foo',
        body: 'bar',
        userId: 1
    })
    .fetch();

if(submitPost.status === 'success'){
    console.log(submitPost.result);
    //or you can use
    console.log(http_request.result);
}else{
    console.log('Error submitting data.')
}
```

**GET request**

```javascript
const getPosts = await http_request.uri('/posts/2')
    .get()
    .fetch();

if(getPosts.status === 'success'){
    console.log(http_request.result);
}
```

### Result Data
All requests (POST, GET, PUT or DELETE) will return a json data

**Success response**

```json
{
  "status": "success",
  "result": "RESULT_FROM_SERVER"
}
```
**Error response**

```json
{
  "status": "fail",
  "result": "RESULT_FROM_SERVER"
}
```

### Debug Mode
```javascript
const getPost = await http_request.get('https://jsonplaceholder.typicode.com/posts/1')
    .debug()
    .fetch();

if(getPost.status === 'success'){
    console.log(http_request.result);
}
```