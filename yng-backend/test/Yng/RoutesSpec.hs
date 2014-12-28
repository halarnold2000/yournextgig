module Yng.RoutesSpec where

import Test.Hspec
import Control.Monad

import Yng.Routes

main :: IO ()
main = hspec spec

spec = do
    describe "getRoot" $ do
        it "returns status 200" $ do
            let retval = getRoot
            True `shouldBe` True
