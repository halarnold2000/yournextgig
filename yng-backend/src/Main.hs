module Main where

import Network.Wai.Handler.Warp (run)
import App

main :: IO ()
main = app >>= run 8080
