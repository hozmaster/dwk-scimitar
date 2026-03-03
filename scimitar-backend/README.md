
 #### scimitar-backend
 
 Ping-Pong backend. Responsible to keep track the pingpong count.

 This backend service responds only request on port 3010 to next paths:

**API**: 


|Route   |Method | Description                                            |
| :---------- | :--------- |:-------------------------------------------------------|
| /pingpong | GET      | Return count of pingpongs starting from 0 |
| /pings    | GET      | Increase ping counter by 1                             |
