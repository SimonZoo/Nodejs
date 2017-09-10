```javascript
events.js:182
      throw er; // Unhandled 'error' event


Error: listen EADDRINUSE :::8080
    at Object.exports._errnoException (util.js:1026:11)
    at exports._exceptionWithHostPort (util.js:1049:20)
    at Server.setupListenHandle [as _listen2] (net.js:1305:14)
    at listenInCluster (net.js:1353:12)
    at Server.listen (net.js:1453:7)
    at Object.<anonymous> (/Users/Simon/Desktop/Nodejs/file_server.js:27:8)
    at Module._compile (module.js:569:30)
    at Object.Module._extensions..js (module.js:580:10)
    at Module.load (module.js:503:32)
    at tryModuleLoad (module.js:466:12)
```

  8080端口已被占用

``` shell
 lsof -i TCP:8080
```

查询占用该端口的进程

得到PID

```shell
 kill -9 PID
```

