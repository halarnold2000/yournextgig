module Yng.Services.GithubService where

import qualified Github.Repos as G
import Control.Applicative

import Yng.Types


class (Monad m) => GithubMonad m where
    userRepos :: String -> G.RepoPublicity -> m (Either G.Error [G.Repo])

instance GithubMonad IO where
    userRepos = G.userRepos

findGithubUser :: (GithubMonad m) => String -> m (Either GithubError GithubUser)
findGithubUser handle = do
                possibleRepos <- userRepos handle G.All
                case possibleRepos of
                    Right repos -> let repositories = G.repoName <$> repos
                                   in return (Right $ GithubUser { handle = handle, repositories = repositories })
                    Left _ -> return (Left GithubError)
