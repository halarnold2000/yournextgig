{-# LANGUAGE OverloadedStrings #-}
module App where

import Web.Scotty
import Network.Wai
import Network.HTTP.Types
import Network.Wai.Middleware.Static

import qualified Yng.Routes as Routes

app :: IO Application
app = scottyApp $ do
    middleware $ staticPolicy (noDots >-> addBase "static")
    get "/" $ Routes.getRoot
    get "/user/github/:handle" $ Routes.getGithubUser
