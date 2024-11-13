# Installation
## 1. Postgresql database
Install a postgresql database.
Create a user named `d0020e_user` with password `pass`.
Create a database named `d0020e_activity_log` with `d0020e_user` as owner.

1. Download Postgresql from [their website](https://www.postgresql.org/download/).
2. Start a `psql` shell and connect to postgres using superuser credentials.
3. Run `CREATE USER d0020e_user WITH PASSWORD 'pass';`
4. Run `CREATE TABLE d0020_activity_log OWNER d0020e_user;`

## 2. Nodejs for ui
To build the web ui, you'll need nodejs installed.
Inside `ui` folder, run `npm install` or `yarn`, depending on which package manager you use.
Run `yarn dev` for a development server and `yarn build` for building static files.