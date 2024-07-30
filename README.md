
# FLIGHT STATUS NOTIFICATION

A simple application to send notification to subscribed users of updated flight details on their gmail.

I have a created a simple page where all flight details are shown and we can either edit or subscribe to a flight.

* Subscribing to a flight will add the user to subscribe list corresponding to that flight in the firebase store.

* On editing a flight details mimicking an flight webshook response will send a mail to all the user who have subscribed to that flight.



## Run Locally

Clone the project

```bash
git clone https://github.com/rohit27-02/flight-booking
```

Go to the project directory

```bash
cd flight-booking
```

Install dependencies

```bash
pnpm install
```

Start the project

```bash
pnpm run dev
```
cd functions

```
npm install
```

deploy firebase function

```bash
firebase deploy --only functions
```


*Note :- cross check from package json that all the dependencies are installed and all the env variables are added.





## Screenshots
### Home page
![App Screenshot](https://i.postimg.cc/d05sRxdN/Flight-booking-App.png
)

### Edit Flight
![App Screenshot](https://i.postimg.cc/tTf9wnBh/Flight-booking-App-1.png
)

### Subscribe modal
![App Screenshot](https://i.postimg.cc/G29cXxxL/Flight-booking-App-2.png)


## Tech Stack

**Framework:** NextJS

**Client:** React, TailwindCSS

**Server:** Node, Express

**Libraries:** firebase store, firebase admin, firebase functions, sendgrid/mail





## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`FIREBASE_API_KEY`

`FIREBASE_AUTH_DOMAIN`

`FIREBASE_PROJECT_ID`

`FIREBASE_STORAGE_BUCKET`

`FIREBASE_MESSAGING_SENDER_ID`

`FIREBASE_APP_ID`

`VAPID_KEY`


## Contributing

Contributions are always welcome!


Please adhere to this project's `code of conduct`.


## Authors

- [@rohit27-02](https://github.com/rohit27-02/)


## 🛠 Skills
Javascript, HTML, CSS, NextJS, NodeJS, API, REST

