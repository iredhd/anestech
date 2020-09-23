<h1 align="center">
  <a href="https://anestech.vercel.app">
    <img alt="Anestech" src="https://res.cloudinary.com/iredhd/image/upload/v1600820150/anestech/logo.png" width=300 />
  </a>
</h1>

<p align="center">
  <a href="#technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#installation">Installation</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#configuration">Configuration</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#license">License</a>
</p>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/iredhd/anestech.svg">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/iredhd/anestech.svg">

  <a href="https://github.com/iredhd/anestech/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/iredhd/anestech.svg">
  </a>
</p>

The application consists of a task managment system with two simple CRUDs: tasks and users.

To test the project already configured and running [click here.](https://anestech.vercel.app)

<img alt="Login Image" src="https://res.cloudinary.com/iredhd/image/upload/v1600820180/anestech/home.png"/>

<img alt="Home Image" src="https://res.cloudinary.com/iredhd/image/upload/v1600820941/anestech/tasks.png"/>

## Technologies
- [React](https://github.com/facebook/react)
- [Prop-Types](https://github.com/facebook/prop-types)
- [Yup](https://github.com/jquense/yup)
- [Material UI](https://github.com/mui-org/material-ui)
- [Axios](https://github.com/axios/axios)
- [JWT](https://github.com/auth0/node-jsonwebtoken)
- [Redux](https://github.com/reduxjs/redux)
- [Redux Thunk](https://github.com/reduxjs/redux-thunk)
- [Redux Persist](https://github.com/rt2zz/redux-persist)
- [Redux Persist Transform Encrypt](https://github.com/maxdeviant/redux-persist-transform-encrypt)
- [AdonisJS](https://github.com/adonisjs)
- [Moment](https://github.com/moment/moment)
- [Formik](https://github.com/formium/formik)
- [Docker Compose](https://github.com/docker/compose)
- [Docker](https://www.docker.com/)
- [Husky](https://github.com/typicode/husky)
- [ESLint](https://github.com/eslint/eslint)


## Installation
```
git clone https://github.com/iredhd/anestech.git
cd anestech
```
### Backend
```
cd backend
cp .env.example .env
npm install
docker-compose up
docker exec -it anestech_api npm run db:migrate
```
### Frontend
```
cd frontend
cp .env.example .env
npm install
docker-compose up
```

## Configuration
Please, before executing `docker-compose up`, fill in the environment variables inside the `.env` files.

### Backend
The APP_KEY can be generated with `adonis key:generate`

| VARIABLE  |  DESCRIPTION  |
| ------------------- | ------------------- |
| APP_KEY |  Adonis App Key |
| DB_HOST |  DB Host |
| DB_PASSWORD | Database password |
| DB_DATABASE | Database name |

### Frontend
| VARIABLE  |  DESCRIPTION  |
| ------------------- | ------------------- |
| REACT_APP_API_URL |  API URL |
| REACT_APP_REDUX_SECRET_KEY |  REDUX Secret Key |

## License
This project is under the MIT license. See the [LICENSE](https://github.com/iredhd/anestech/blob/master/LICENSE) for more information.
