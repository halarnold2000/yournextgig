FROM haskell:7.8

RUN cabal update

ADD ./yng.cabal /opt/yng/yng.cabal

RUN cd /opt/yng && cabal install --only-dependencies --max-backjumps=9999

ADD ./src /opt/yng/src
ADD ./static /opt/yng/static

RUN cd /opt/yng && cabal build

EXPOSE 80

WORKDIR /opt/yng
CMD ["./dist/build/yng/yng"]
