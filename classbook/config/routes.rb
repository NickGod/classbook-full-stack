Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: '/api/user/auth'
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
    post 'user/info' => 'users#update_user_info'

    get 'discussion/get_discussions' => 'enrollments#get_discussions'

    get 'user/:id/getEnrolledClasses' => 'enrollments#get_all_enrolled_discussion'
    get 'user/:id/getEnrolledClassesForDrop' => 'enrollments#get_enrolled_for_drop_use'
    post 'enrollment/enroll' => 'enrollments#enroll'
    post 'enrollment/drop' => 'enrollments#drop'

    get '/search' => 'application#searchClass'

    # post params: user_id, has_dis,want_dis (discussion id)
    post 'swap_request/create/' => 'swap_requests#create'

    # to be changed to get 'message/userMessages' => 'messages#get_user_message'
    get 'message/:user_id/userMessages' => 'messages#get_user_message'
    post 'message/:id/read' => 'messages#read'

  end
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'



  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
