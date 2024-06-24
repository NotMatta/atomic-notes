# Documentations
This project is a way to test myself and find my weaknesses, This is a note taking app that uses an external database and uses JWT tokens for athentication, it's built on Next.js and uses primsa for database management,it also uses some of shadcn/ui componenets.

## What I've achieved and learnt
Well I managed to make some simple authentication with storing jwt tokens and using them for validating requests and also added a timestamp to prevent hijacking, I learnt how to use multiple http methods and their purposesj.
I also learnt how to make my own custom hook and finally understood the purpose of useContext that I wish I knew about it earlier before starting the project, I also learnt about using localStorage in the browser .

## My weaknesses
Once the codebase started getting bigger and bigger, I started feeling frustrated and if I get an error I would spend too much time looking for it that's why I need a better management of my code base by planning stuff before hand and adding comments and writing reusable clean code, another thing that I'm using is interface in typescript, which is a type safety method to insure integrity and prevent errors and also help in auto complete and I should learn how to use it and implement it in my next project.
As for the backend I should learn about status codes and respond with them instead of simple messages so I can interpret them in my client side.
And finally the more you know the dumper you feel

## What now?
This project is not ready for production and I'm improving my skills on the next project but it can still be used if you want to look into it simply clone the repo, and have a .env file with your database link (mysql or adjust it to your preference) and also setup your secret key for the jwt token generation and also run this command to install the packages:
```
npm install
```
and for development:
```
npm run dev
```
and as for production:
```
npm run build
npm run start
```
