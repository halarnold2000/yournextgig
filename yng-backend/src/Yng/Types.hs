module Yng.Types where

data GithubUser = GithubUser {
    handle :: String,
    repositories :: [String]
} deriving (Show, Eq)
