{-# LANGUAGE OverloadedStrings #-}
module App where

import Web.Scotty
import Network.Wai
import Network.HTTP.Types

app :: IO Application
app = scottyApp $ do
    get "/" $ do
        status status200
