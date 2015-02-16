FROM       ubuntu:14.04
MAINTAINER Karun Ramakrishnan <karun.ramakrishnan@live.com>

## Install haskell and basic deps
ENV HOME /root
ENV DEBIAN_FRONTEND noninteractive
WORKDIR /root
RUN apt-get update

RUN echo 'root:docker' |chpasswd
RUN mkdir -p ${HOME}/.ssh/
RUN apt-get install -y apt-utils
RUN apt-get install -y wget libgmp3-dev build-essential
RUN ln -s /usr/lib/x86_64-linux-gnu/libgmp.so.10 /usr/lib/libgmp.so.3
RUN ln -s /usr/lib/x86_64-linux-gnu/libgmp.so.10 /usr/lib/libgmp.so
RUN wget http://downloads.haskell.org/~ghc/7.8.1/ghc-7.8.1-x86_64-unknown-linux-deb7.tar.bz2 -O ghc-7.8.1.tar.bz2
RUN tar xf ghc-7.8.1.tar.bz2 && rm ghc-7.8.1.tar.bz2

WORKDIR /root/ghc-7.8.1
RUN ./configure
RUN make install
RUN rm -rf ghc-7.8.1
WORKDIR /root

RUN wget http://www.haskell.org/cabal/release/cabal-1.20.0.0/Cabal-1.20.0.0.tar.gz
RUN tar xf Cabal-1.20.0.0.tar.gz
RUN rm Cabal-1.20.0.0.tar.gz
WORKDIR Cabal-1.20.0.0
RUN ghc --make Setup
RUN ./Setup configure
RUN ./Setup build
RUN ./Setup install
WORKDIR /root
RUN rm -rf ./Cabal-1.20.0.0

RUN wget http://www.haskell.org/cabal/release/cabal-install-1.20.0.1/cabal-install-1.20.0.1.tar.gz
RUN tar xf cabal-install-1.20.0.1.tar.gz
RUN rm cabal-install-1.20.0.1.tar.gz
WORKDIR cabal-install-1.20.0.1
RUN apt-get install -y zlib1g-dev libtinfo-dev
RUN ./bootstrap.sh
ENV PATH $HOME/.cabal/bin:$PATH
RUN echo "export PATH=~/.cabal/bin:$PATH" >> /root/.profile
WORKDIR /root
RUN rm -rf ./cabal-install-1.20.0.1

## get latest dependencies from hackage
RUN cabal update

RUN cabal install cabal-install

## prep for build
ADD ./yng-backend/yng.cabal /app/yng/yng.cabal

## install dependencies as we will be building and running app from dist
RUN cd /app/yng && cabal sandbox init && cabal clean && cabal install --only-dependencies --max-backjumps=9999

## explicitly add the folders we need
ADD ./yng-backend/src /app/yng/src
ADD ./yng-frontend/lib /app/yng/static/lib
ADD ./yng-frontend/src/js /app/yng/static/js
ADD ./yng-frontend/require.js /app/yng/static/require.js
ADD ./yng-frontend/require-config.js /app/yng/static/require-config.js
ADD ./yng-frontend/src/index.html /app/yng/static/index.html
ADD ./yng-frontend/css /app/yng/static/css
ADD ./yng-frontend/fonts /app/yng/static/fonts
ADD ./yng-frontend/images /app/yng/static/images

## build app
RUN cd /app/yng && cabal install

## expose port 80. Not sure if this is needed as beanstalk would have already exposed it
EXPOSE 80

## run the app
WORKDIR /app/yng
CMD [".cabal-sandbox/bin/yng"]
