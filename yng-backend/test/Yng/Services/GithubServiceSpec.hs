{-# LANGUAGE TypeSynonymInstances #-}
{-# LANGUAGE FlexibleInstances #-}
module Yng.Services.GithubServiceSpec (main, spec) where

import Test.Hspec

import Yng.Services.GithubService
import Yng.Types

import qualified Github.Repos as G
import Control.Monad.State.Lazy
import Control.Applicative

main :: IO ()
main = hspec spec

spec = do
    describe "Github API service" $ do
        it "allows us to get a GithubUser given a user handle if the github user exists" $ do
            let sampleHandle = "test-user"
                expected = Right $ GithubUser { handle = sampleHandle, repositories = ["My awesome repo A", "My awesome repo B"] }
                mockGithubResponse = map githubRepoWithName ["My awesome repo A", "My awesome repo B"]

            let actual = evalState (findGithubUser sampleHandle) (MockResponse $ Right mockGithubResponse)
            actual `shouldBe` expected

        it "returns an error if an exception occurs in the github api" $ do
            let sampleHandle = "some user that does not exist"
                expected = Left GithubError
                mockGithubError = G.ParseError "Error parsing json"

            let actual = evalState (findGithubUser sampleHandle) (MockResponse $ Left mockGithubError)
            actual `shouldBe` expected

-- Test helpers
data MockGithubApiResponse = MockResponse { getResponse :: Either G.Error [G.Repo] }

instance GithubMonad (State MockGithubApiResponse) where
    userRepos handle publicity = do
                        response <- getResponse <$> get
                        return response

githubRepoWithName :: String -> G.Repo
githubRepoWithName name = G.Repo { 
                                G.repoSshUrl = Nothing,
                                G.repoDescription = Nothing,
                                G.repoCreatedAt = Nothing,
                                G.repoHtmlUrl = "htmlUrl",
                                G.repoSvnUrl = Nothing,
                                G.repoForks = Nothing,
                                G.repoHomepage = Nothing,
                                G.repoFork = Nothing,
                                G.repoGitUrl = Nothing,
                                G.repoPrivate = False,
                                G.repoCloneUrl = Nothing,
                                G.repoSize = Nothing,
                                G.repoUpdatedAt = Nothing,
                                G.repoWatchers = Nothing,
                                G.repoOwner = G.GithubUser "" "" "" 123 Nothing,
                                G.repoName = name,
                                G.repoLanguage = Nothing,
                                G.repoMasterBranch = Nothing,
                                G.repoPushedAt = Nothing,
                                G.repoId = 0,
                                G.repoUrl = "repoUrlSample",
                                G.repoOpenIssues = Nothing,
                                G.repoHasWiki = Nothing,
                                G.repoHasIssues = Nothing,
                                G.repoHasDownloads = Nothing,
                                G.repoParent = Nothing,
                                G.repoHooksUrl = "hooks",
                                G.repoSource = Nothing 
                        }
