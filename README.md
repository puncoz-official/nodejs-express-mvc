# Node.js MVC

Simple Node.js MVC architecture with class object implementation using babel.

## Design Pattern
- Repository Design Pattern

## Requirement
This boilerplate uses latest version of Node/NPM. i.e. node v12 and npm v6.9.

## Tech
- [Node.js] - JavaScript Runtime.
- [Express] - Web Application Framework.
- [Knex.js] - A query builder for database
- [ObjectionJs] - ORM for interacting with database on top of [Knex.js].

    [Knex.js]: <http://knexjs.org/>
    [Node.js]: <http://nodejs.org>
    [Express]: <http://expressjs.com>
    [ObjectionJs]: <https://vincit.github.io/objection.js/>

## Installation

1. Clone the repository
2. Copy `.env.example` to `.env`
```
$ cp .env.example .env
```
3. Update the information in `.env` file with your information such as database credentials etc.
4. Install npm packages. I recommend to use `yarn`. 
```
$ yarn
```
or,
```
$ npm install
```
5. Now, start server with following commands.
```
$ yarn start
```

## Other important commands 
1. Create database migration file
```
$ yarn make:migration create_users_table
```
2. Run Migrations
```
$ yarn migrate
```
3. Rollback migration
```
$ yarn migrate:rollback
```
4. Create database seeder file
```
$ yarn make:seed UsersTableSeeder
```
5. Run seeders
```
$ yarn db:seed
```

## Ready for production

To deploy in production, first build app with following command
```
$ yarn build
```
After building app, deploy `build` directory and run like any other node app.

## Support

If you faced any issue with this boilerplate create an issue. Or if you manage to improve it, send pull request.