define(['react', 'http', 'underscore', 'underscore.string'], function (React, http, _, _s) {
    'use strict';

    var ENTER_KEY = 13;

    var SearchBar = React.createClass({
        getInitialState: function () {
            return {handle: ''};
        },
        textUpdated: function (event) {
            this.setState({ handle: event.target.value });
        },
        handleKeyDown: function (event) {
            if (event.key !== "Enter") {
                return;
            }

            http({
                uri: _s.sprintf('/user/github/%s', this.state.handle),
                method: 'GET'
            });
        },
        render: function () {
            return <div>
                       <input ref="searchBar" value={this.state.handle} type="text" onChange={this.textUpdated} onKeyDown={this.handleKeyDown}/>
            </div>;
        }
    });

    var app = function app(parameters) {
        return {
            searchBar: SearchBar
        };
    };

    return app;
});
/*
 * {
        handle: "karun012",
        repositories: [
            "ishtar",
            "backbone-connect-four",
            "bslider",
            "cabal-scripts",
            "cis194",
            "course",
            "creddit",
            "doctest-discover",
            "dotfiles",
            "es-monitor",
            "experiments",
            "frozen-fire",
            "gnome-shell-extension-prototype",
            "haskellconcepts",
            "haskellcourse",
            "haskellcourse-notes",
            "invisiblepixel",
            "kivuli",
            "oshaberi",
            "projecteuler-haskell",
            "scotty-todo-sample",
            "scraper",
            "select2",
            "shadower",
            "substitutor",
            "tetrix.scala",
            "timedspecs",
            "transmat",
            "vim-scala",
            "javascript-todo-samples"
        ]
   }
 */
