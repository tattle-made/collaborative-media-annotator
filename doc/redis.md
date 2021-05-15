# Keys Indiex

App Data Model

```
Exercise :
  Hash

Users :
  user:*

Posts :
  post:<exercise_id>:*

Schema :
  Hash
    key : schema:<exercise_id>:field_a:label
    returns string or int stored there
  JSON
  key : schema:<exercise_id>:*
  once added this is hardly accessed or edited. If that changes in the future, we could store a stringified version

Data :
  string
  key : data:<post_id>:<field_id>
  value : string representation of value


activity:<post_id>:*


comment:<exercise_id>:*
data:<exercise_id>:<post_id>:*

post:*
exercise:*

JSON
exercise:* - store data dump basically
schema:
```
