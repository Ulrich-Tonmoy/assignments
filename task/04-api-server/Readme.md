<img alt="Preview" src="https://github.com/Ulrich-Tonmoy/assignments/blob/main/task/04-api-server/Preview (1).png" />

### Server Start

    npm i
    npm run dev

### For Swagger doc

    url: "http://localhost:5000/docs"

### API endpoints

    user:
        post:"http://localhost:5000/user/signup"
        post:"http://localhost:5000/user/signin"
    stations:
        get:"http://localhost:5000/stations"
        post:"http://localhost:5000/stations"
        patch:"http://localhost:5000/stations/:id"
        delete:"http://localhost:5000/stations/:id"
