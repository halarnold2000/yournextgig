#Your Next Gig

##Running the server
Run the following commands in the folder yng-backend
```
#!shell
cabal sandbox init
cabal install
.cabal-sandbox/bin/yng
```

If the install fails with a "Backjump limit reached" error, use
#!shell
cabal install --max-backjumps=9999
```

##Get to the index page
```
http://localhost:8080/
```
