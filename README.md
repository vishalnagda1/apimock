#test-setup

This repo contains a broken server setup you are expected to fix. The server then needs to give the correct responses to the below questions. 

To run the server, invoke
```
$npm install
$npm start
```

Steps to perform:

1. Fork this repo

2. Debug the errors which are causing the server to crash at initialization.

3. Modify the Api endpoint `/hello` to accept an optional query such that
	* if `/hello` is queried, response is `Hello, World`
	* if `/hello?name=harish` is queried, response is `Hello, Harish`

4. Create an api endpoint in `src/api/prodapis/handlers.js` called `/csv2json` which accepts a csv file as an input and then sends a json object as response.
	For eg:
		
        Payload:
	    | Name    | Age  | Sex  |
	    | :---:   | :-:  | :-: |
	    | Harish  | 10   | M 	|
	    | Suresh  | 20   | M 	|
	    | Chanda  | 30   | F 	|
	
    	Response: 
        [
        	{	
        		"name"	: "Harish",
        		"age"	: "10",
        		"sex"	: "M"
        
        	},
        	{	
        		"name"	: "Suresh",
        		"age"	: "20",
        		"sex"	: "M"
        
        	},
        	{	
        		"name"	: "Chanda",
        		"age"	: "30",
        		"sex"	: "F"
        
        	}
        ]

5. Api endpoint `/loop` processes an array and is supposed to reply the output of function `adder`, when the array is serially processed through it. Function `adder` might seem to be performing an overcomplicated addition, but assume it to be a proxy for any asynchronous operation.

We are currently passing an array `[1,2,3,4,5,6,7,8,9,10]` to the function adder. Calling this api will currently give you:

`Response = 0` 
and on the console : 
```
Trying to add 1
Trying to add 2
Trying to add 3
Trying to add 4
Trying to add 5
Trying to add 6
Trying to add 7
Trying to add 8
Trying to add 9
Trying to add 10
Current sum is 1
Current sum is 2
Current sum is 3
Current sum is 4
Current sum is 5
Current sum is 6
Current sum is 7
Current sum is 8
Current sum is 9
Current sum is 10
```

This is obviously incorrect, and the correct method should be:
`Response = 55`
with console printing:
```
Trying to add 1
Current sum is 1
Trying to add 2
Current sum is 3
Trying to add 3
Current sum is 6
Trying to add 4
Current sum is 10
Trying to add 5
Current sum is 15
Trying to add 6
Current sum is 21
Trying to add 7
Current sum is 28
Trying to add 8
Current sum is 36
Trying to add 9
Current sum is 45
Trying to add 10
Current sum is 55
```

Modify ONLY and only the handler `loop` to get the expected response. Do not make any changes to `function adder`. I am interested in receving both the correct response as well as the correct logging on console (showing perfectly that the operation is happening serially, and not parallely). The actual step of addition needs to be performed using `function adder`, and not bypassing it by any means.

6. Create an api GET /dynamicdelay , the response of the api should be 
   2 for the first request from an ip, 
   4 for the second request,
   8 for the third request and so on.
   
   the api should also respond after

   1 second  for the first request,
   3 seconds for the second request,
   5 seconds for the third request and so on.
   
   They whole series should reset after 5 minutes for each ip
   
   Also a brief explanation of how the api will behave based on your implementation 
   
   1. when its used by thousands of clients.
   2. when a single client calls the api concurrently.
   
 7. Write an api / function using JS in Atmost 1000 lines, To show your coding capabilities.
    and an explanation of 
    	1. The input
	2. The output
        3. why that api / function is impressive.
    
    Not the input and output can be anything, there are no restrictions
    

BONUS Question:

Print on console every api call made, along with the response time (in milliseconds) of the API. The log should have the format:
```method=get, path=/loop, responseTimeMs=124, statusCode=200```
Measure response time as the best approximation of the time between server receiving a request and replying to it.


Tip:
1. You are free to use any publicly available npm library
2. This code was tested in `node v8.1.0` and `npm v5.0.3`. Please update node/npm before starting.
3. You may need to remove the node modules folder and reinstall. Perform by:
```
$rm -rf node_modules/
$npm install
```



#### Expolrer API

Endpoint - http://localhost:8001/explorer



##### **Create Dir(s)**

HTTP Method: POST

*Payload* (body)

```json
[
    {
    	"path": "/dirName",
    	"names": [ "newDirName"]
    }
]
```

*path* - path of the directory where you want to create directories.

*names* - array of directory names which you want to create in given path.



##### **List Dir(s) & File(s)**

HTTP Method: GET

**Params**

*path* - To navigate home dir use **/** or you can pass the dir path e.g. to navigate home dir the endpoint will be **http://localhost:8001/explorer?path=/** and to navigate in a particular directory then the endpoint will be like **http://localhost:8001/explorer?path=/dirName/**.



##### Rename Dir(s)

HTTP Method: PUT

**Payload** (body)

```json
[
   {
       "path": "/",
       "names":[ ["dirNameOld", "dirNameNew"] ]
   }
]
```

*path* - path of the directory in which you want to rename directories.

*names* - array of arrays which contains the old name and the new name of the dir.



##### Remove Dir(s)

HTTP Method: DELETE

**Payload** (body)

```json
[
   {
       "path": "/",
       "names":["dirNameToDelete"]
   }
]
```

*path* - path of the directory in which you want to delete directories.

*names* - array of directory names which you want to delete.

