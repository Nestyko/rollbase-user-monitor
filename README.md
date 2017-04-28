## Rollbase User Monitor

This is a rollbase user montior, the main usage of this program is to check every certain time if there are still users in a tenant of rollbase

#### Configure first

First install the dependencies with:

```
npm install
```
or
```
yarn
```

Then add a file called ** .env **, and set the variables as the example below:

```
RB_USERNAME=nestor.tobon.dev3
RB_PASSWORD=******
REFRESH_RATE=5
EMAIL=nltobon@gmail.com
EMAIL_PASSWORD=************
```

#### How to lauch

```bash
node index.js <?refresh rate>
```

> ? : parameter is optional
> refresh rate (in minutes): defaults to 5

#### How it works

It fist ask for the sessionId which is like a jwt, then it asks for the lists of users every certain **time**, and logs them in the logs folder.

> the log files have a date, if the program is launched many times in one day, it will use the same log file, but if it's launched in diferent days it will use different log files.

#### Email

There is a json file called *email_list.json*, in which you can add the emails to send the notification to.

#### TODOS

- [x] Log to file
- [x] Log Error when no users around
- [ ] Send email when the system fails
- [ ] Get the current online users