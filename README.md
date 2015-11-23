# Classbook

## Project Description
CS130 Course Project. Use Mysql+Ruby on rails+AngularJS Stack. You can find the backend code in classbook, the frontend in classbook-frontend

## Members
To be filled...

## First steps
- Start your MySQL database
	- If on Mac, run `sudo mysql.server start`

- Set up the frontend Environment
	- In terminal run: `npm install && bower install`
	- Once that's done run: `grunt `
						  `grunt serve`

	You should see that a port is open for you to access your front-end app

- Set up the backend Environment
	- first run: `bundle install`
	- always apply the database change if there is new models added:
	`rake db:migrate`

##Front-end Architecture Explained
- Big Picture
	In `classbook-frontend` you will find following folders:
		`app` -- our main app
		`bower_components` -- our 3rd party packages
		`node_modules` -- our node packages
		`Gruntfile.js` -- our task manager

- App
	- `scripts`  -- it stores all angular scripts we have for the app
		- `controllers` -- controllers for the page, notice that one controller should correspond to one page in `views` folder
		- `services` -- encapsulation of backend endpoints by `$resource`
		- `app.js` -- where we initialize our angular app and inject dependent packages. For instance, if you want to use 3rd package like ui-calendar, inject it here. Also it is responsible for routing. See how it configures routes and views and controllers.
	- `views` -- store html views

- How the whole thing works?
	When a browser starts, it will load index.html at first. Index.html already bootstraps all dependent angular codes together. When the code is loaded, app.js is run to initialize the whole app as angular app, with the configuration declared in the folder. When you move to specific page, angular will switch your view and controller according to configuration in the app.

	Notice that special tags like ng-view is bundled with the routing function. When you switch to a certain url, angularjs will insert the corresponding template into ng-view.

##Package used and reference
[AngularJS & Rails tutorial](http://www.angularonrails.com/ruby-on-rails-angularjs-single-page-application/) to understand and see what packages are used in this app.

##RESTful API Documentation
Please refer to [this page](http://seas.ucla.edu/~xih/api-doc/index.html)

##RESTful API 
In bare ruby codes now

    scope '/api' do
    resources :groups, except: [:new, :edit]
    resources :discussions, except: [:new, :edit]
    resources :lectures, except: [:new, :edit]

    get 'user/:id/get_friends' => 'users#get_friends'
    get 'user/:id/get_pending_friends' => 'users#get_pending_friends'
    post 'user/request_friend' => 'users#request_friend'
    post 'user/accept_friend_request' => 'users#accept_friend_request'

    # api for getting user infomation
    get 'user/:id/info' => 'users#get_user_info'

    get 'user/:id/getEnrolledClasses' => 'enrollments#get_all_discussion'
    post 'enrollment/enroll' => 'enrollments#enroll'


    get '/search' => 'application#searchClass'

    # post params: user_id, has_dis,want_dis (discussion id)
    post 'swap_request/create/' => 'swap_requests#create'

    # to be changed to get 'message/userMessages' => 'messages#get_user_message'
    get 'message/:user_id/userMessages' => 'messages#get_user_message'
    get 'message/:id/read' => 'messages#read'

