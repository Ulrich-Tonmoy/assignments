## Problem

### Problem Statement

From the given story i got the idea that a newspaper publisher has a situation where they publish 10 to 15 articles a day. They hire a new Editor every month and when a new Editor join the old editor leave so there is always only one active Editor at the same time. And the Editor's job is to publish these articles. And the Administrators can add or delete the Editor.

### Solution of the Problem

For the solution i created a backend RestAPI where there are two kinds of user Admin and Editor. Admin have the Authorization to get, add, delete and edit the Editor user, type, author, tag and there can only be one active editor at a time. So to add a new editor the admin will have to deactivate the current editor or delete the editor and the add a new editor. The Editor will have the Authorization to get, add, delete and edit Articles but cant edit his profile information. Before either the editor or the Admin get to access these privilege they will have to be authenticated and their account have to be active.

## Diagram

 <img alt="diagram" src="https://raw.githubusercontent.com/Ulrich-Tonmoy/assignments/main/newspaper-api/Diagram.png" width="360px"/>

## To start the server

    npm run dev

## API Endpoints

    /user
        /get (Auth route)
        /post/signin
        /post/signup (Auth route)
        /get/:id (Auth route)
        /put/:id (Auth route)
        /delete/:id (Auth route)
    /articles
        /get
        /post (Auth route)
        /get/:id
        /put/:id (Auth route)
        /delete/:id (Auth route)
    /tag
        /get (Auth route)
        /post (Auth route)
        /get/:id (Auth route)
        /put/:id (Auth route)
        /delete/:id (Auth route)
    /type
        /get (Auth route)
        /post (Auth route)
        /get/:id (Auth route)
        /put/:id (Auth route)
        /delete/:id (Auth route)
    /author
        /get (Auth route)
        /post (Auth route)
        /get/:id (Auth route)
        /put/:id (Auth route)
        /delete/:id (Auth route)
