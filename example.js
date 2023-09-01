import {http_request} from "./index.js";
/*
 * Example with global domain
 * ==========================
 */
http_request.domain('https://jsonplaceholder.typicode.com');

//POST
const submitPost = await http_request.uri('/posts').post().data({
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

//GET
const getPosts = await http_request.uri('/posts/2').get().fetch();
if(getPosts.status === 'success'){
    console.log(http_request.result);
}

/*
* Example with single URL
* ==========================
*/

//POST
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

//GET
const getPost = await http_request.get('https://jsonplaceholder.typicode.com/posts/1').debug().fetch();
if(getPost.status === 'success'){
    console.log(http_request.result);
}
