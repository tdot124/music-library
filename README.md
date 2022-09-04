# Music Library API

This Music Library API was built as my first backend project as part of the Manchester Codes software development bootcamp. The objectves were to use what we had learnt to design and implement an API that can perform CRUD (Create, Read, Update, Delete) operations on a database.

This API lets you interact with a database to use CRUD functions on artist and album data. Album data is linked to artists via a foreign key.

## Installation and setup

You will need to have MYSQL2 running in a docker container on your machine to host the database. You can use [Postman](https://www.postman.org) to interact with the database.

Clone the git repository

```bash
git clone https://github.com/tdot124/music-library
```
Move into your cloned directory and install dependencies

```bash
npm install
```
Install Express and MySql2

```bash
npm i -S express mysql2
```

You can then start the application using 

```bash
npm start
```

## Usage

### Artist

To start using this database you must first create an artist.

To create an artist send a POST request to :
```localhost:3000/artist``` with a JSON body in the following format:

``` 
{
    "name": "artist name",
    "genre": "artist genre"
}
```

To read all created artist data send a GET request to:
```localhost:3000/artist```

To read a specific artist's data send a GET request to:
```localhost:3000/artist/:artistId```

To update a specific artist's data send a PATCH request to:
```localhost:3000/artist/:artistId```

To delete a specific artist's data send a DELETE request to:
```localhost:3000/artist/:artistId```

### Album

To create an album you must have first created the artist.

To create an album related to an artist send a post request to the below using the artist's Id:
```localhost:3000/artist/:artistId/album```

To read all created album data send a GET request to:
```localhost:3000/album```

To read a specific album's data send a GET request to:
```localhost:3000/album/:albumId```

To update a specific album's data send a PATCH request to:
```localhost:3000/album/:albumId```

To delete a specific album's data send a DELETE request to:
```localhost:3000/album/:albumId```