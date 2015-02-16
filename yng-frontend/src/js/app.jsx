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
            var self = this;
            if (event.key !== "Enter") {
                return;
            }

            http({
                uri: _s.sprintf('/user/github/%s', this.state.handle),
                method: 'GET'
            }).done(function (data) {
                self.props.searchResultsCallback(data);
            });
        },
        render: function () {
            return <div>
                       <input ref="searchBar" value={this.state.handle} type="text" onChange={this.textUpdated} onKeyDown={this.handleKeyDown}/>
            </div>;
        }
    });

    var Project = React.createClass({
        getInitialState: function () {
            return this.props;
        },
        render: function () {
            return <li className='project'>{this.state.text}</li>;
        }
    });

    var ProjectList = React.createClass({
        getInitialState: function () {
            return { data: [] };
        },
        render: function () {
            var id = 0;
            var projects = this.props.data.map(function (project) {
                id++;
                console.log(project);
                return <Project key={id} id={id} text={project} />;
            });
            return <ul ref='projectList' className='project-list'>{projects}</ul>;
        }
    });

    var App = React.createClass({
        getInitialState: function () {
            return { data: [] };
        },
        refreshProjectList: function (data) {
            this.state.data.push(data.repositories);
        },
        render: function () {
            return <section>
                <SearchBar searchResultsCallback={this.refreshProjectList}></SearchBar>
                <ProjectList data={this.state.data}></ProjectList>
            <section>;
        }
    });

    var app = function app(parameters) {
        return {
            searchBar: SearchBar,
	    projectList: ProjectList,
            app: App
        };
    };

    return app;
});

