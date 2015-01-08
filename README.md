# Coding challenge for Livestream

1) To start the Node server, run
```
node server.js dev
```

2) Testing

Restart the server with 
```
node server.js test
```
and then run 
```
sh test_script.sh
```

3) API endpoints:

### Register a director

    POST /register
    

**Sample Request Body**

```json
{
  "url" : "https://api.new.livestream.com/accounts/6488845"
}
```


**Sample Response Body**

```json
{
   "You've registered Eric Schurch"
}
```


### Update a director's profile

    POST /update
    

**Sample Request Body**

*NOTE*: Include the director's name, favorite camera, and  favorited movies. The latter must be an array. If either the favorite camera or the favorite movies property is omitted, it will not be updated. 

```json
{
  "name" : "Debbie Nalley Hoehn",
  "favorite_camera" : "Leica M9",
  "favorite_movies" : ["Argo", "Gladiator"]
}
```


**Sample Response Body**

```json
{
  "You've updated Debbie Nalley Hoehn's profile!"
}
```

### Get all directors

    GET /getall



**Sample Response Body**

```json
[{
    "full_name": "Martin Scorsese",
    "dob": "1942-11-17T00:00:00.000Z",
    "favorite_movies": []
}, {
    "full_name": "James Cameron",
    "dob": "1954-08-16T00:00:00.000Z",
    "favorite_movies": ["Movie4", "Movie 33", "Movie4", "Movie 33"]
}, {
    "full_name": "Steven Spielberg",
    "dob": "1946-12-18T00:00:00.000Z",
    "favorite_movies": ["Movie1, Movie 2", "Movie1", "Movie 2"]
}, {
    "full_name": "Debbie Nalley Hoehn",
    "dob": "1955-03-18T00:00:00.000Z",
    "favorite_camera": "Leica M4",
    "favorite_movies": ["Grandma's Boy", "Argo"]
}, {
    "full_name": "John Simmons",
    "dob": "1967-07-28T00:00:00.000Z",
    "favorite_movies": []
}, {
    "full_name": "Eric Schurch",
    "dob": null,
    "favorite_movies": []
}]
```