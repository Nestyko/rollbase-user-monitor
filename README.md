## Rollbase User Monitor

This is a rollbase user montior, the main usage of this program is to check every certain time if there are still users in a tenant of rollbase

#### How to lauch

```bash
node index.js <loginUser> <password> <?time>
```

> ? : parameter is optional
> time (in minutes): defaults to 5

#### How it works

It fist ask for the sessionId which is like a jwt, then it asks for the lists of users every certain **time**, and logs them in the logs folder.

> the log files have a date, if the program is launched many times in one day, it will use the same log file, but if it's launched in diferent days it will use different log files.

#### TODOS

- [x] Log to file
- [x] Log Error when no users around
- [ ] Send email when the system fails
- [ ] Get the current online users