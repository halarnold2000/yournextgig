{-# LANGUAGE OverloadedStrings #-}
module App where

import Web.Scotty
import Network.Wai
import Network.HTTP.Types

import qualified Yng.Routes as Routes

app :: IO Application
app = scottyApp $ do
    get "/" $ Routes.getRoot
    get "/user/github/:handle" $ Routes.getGithubUser
