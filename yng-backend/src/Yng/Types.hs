{-# LANGUAGE DeriveGeneric #-}
module Yng.Types where

import Data.Aeson (ToJSON)
import GHC.Generics

data GithubUser = GithubUser {
    handle :: String,
    repositories :: [String]
} deriving (Show, Eq, Generic)

instance ToJSON GithubUser

data GithubError = GithubError deriving (Show, Eq)
