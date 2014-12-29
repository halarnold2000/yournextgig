{-# LANGUAGE OverloadedStrings #-}
module Yng.Routes where

import Web.Scotty
import Network.Wai
import Network.HTTP.Types
import Control.Monad.IO.Class
import Control.Monad

import Yng.Services.GithubService
import Yng.Types

getRoot :: ActionM ()
getRoot = file "./static/index.html"

getGithubUser :: ActionM ()
getGithubUser = param "handle" >>= findGithubUser >>= toJson

toJson :: Either GithubError GithubUser -> ActionM ()
toJson (Left _) = status status404
toJson (Right user) = do
                status status200
                json user
        


