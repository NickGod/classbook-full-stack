class SwapRequest < ActiveRecord::Base
	belongs_to :user
	validates :user_id, uniqueness: {scope: [:has_dis, :want_dis],message: "exists" } 
end
