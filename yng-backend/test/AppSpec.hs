{-# LANGUAGE OverloadedStrings #-}
module AppSpec where

import Test.Hspec
import TestHelper
import Control.Applicative
import Network.Wai.Test (SResponse)
import Data.ByteString (ByteString)

import App

main :: IO ()
main = hspec spec

get :: ByteString -> IO SResponse
get path = app >>= getPath path

spec = do
    describe "GET /" $ do
        it "responds with HTTP 200" $ do
            get "/" `shouldRespondWith` 200
