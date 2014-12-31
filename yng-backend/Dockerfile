FROM       ubuntu.04

## custom apt-get install options
ENV OPTS_APT        -y --no-install-recommends

## ensure locale is set during build
ENV LANG            C.UTF-8

## configure apt to use the haskell repository
RUN echo 'deb     http://deb.haskell.org/stable/ ./' >> /etc/apt/sources.list.d/haskell.list\
 && echo 'deb-src http://deb.haskell.org/stable/ ./' >> /etc/apt/sources.list.d/haskell.list

## set ghc upstream package versions and ghc deb revisions
ENV MAJOR_GHC       7.8
ENV MINOR_GHC       .3
ENV DEB_REV_GHC     -1

## install ghc
RUN apt-get update\
 && apt-get install ${OPTS_APT}\
      ghc-7.8.3="${MAJOR_GHC}""${MINOR_GHC}""${DEB_REV_GHC}"

ENV MAJOR_ALEX      3.1
ENV MAJOR_CABAL     1.20
ENV MAJOR_HAPPY     1.19

ENV MINOR_ALEX      .3
ENV MINOR_CABAL     .0.3
ENV MINOR_HAPPY     .4

ENV DEB_REV_ALEX    -1
ENV DEB_REV_CABAL   -1
ENV DEB_REV_HAPPY   -1

## install minimal set of haskell packages
RUN apt-get update\
 && apt-get install ${OPTS_APT}\
      alex="${MAJOR_ALEX}""${MINOR_ALEX}""${DEB_REV_ALEX}"\
      cabal-install-"${MAJOR_CABAL}"="${MAJOR_CABAL}""${MINOR_CABAL}""${DEB_REV_CABAL}"\
      happy="${MAJOR_HAPPY}""${MINOR_HAPPY}""${DEB_REV_HAPPY}"

## set PATH for tools not installed to /usr/{bin,/local/bin}
ENV PATH /opt/cabal/$MAJOR_CABAL/bin:$PATH
ENV PATH /opt/ghc/$MAJOR_GHC$MINOR_GHC/bin:$PATH

## install additional libs typically needed by hackage packages
RUN apt-get update\
 && apt-get install ${OPTS_APT} zlib1g-dev libtinfo-dev

## get latest dependencies from hackage
RUN cabal update

## prep for build
ADD ./yng.cabal /app/yng/yng.cabal

## install dependencies as we will be building and running app from dist
RUN cd /app/yng && cabal install --only-dependencies --max-backjumps=9999

## explicitly add the folders we need
ADD ./src /app/yng/src
ADD ./static /app/yng/static

## build app
RUN cd /app/yng && cabal build

## expose port 80. Not sure if this is needed as beanstalk would have already exposed it
EXPOSE 80

## run the app
WORKDIR /app/yng
CMD ["./dist/build/yng/yng"]
