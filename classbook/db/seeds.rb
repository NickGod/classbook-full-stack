# db/seeds.rb
 
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
 
# Group.create([
#   { name: 'Ben Franklin Labs' },
#   { name: 'Snip Salon Software' },
#   { name: 'GloboChem' },
#   { name: 'TechCorp' },
# ])


Lecture.create([
	{ name: 'CS130', begTime: '12:00P', endTime: '1:50P', days:'13', location: 'BOELTER',term: 'Fall', department: "ComputerScience"},
	{ name: 'CS31', begTime: '4:00P', endTime: '5:50P', days:'24', location: 'BOELTER',term: 'Fall', department: "ComputerScience"},
	{ name: 'CS32', begTime: '8:00A', endTime: '9:50A', days:'13', location: 'BOELTER',term: 'Fall', department: "ComputerScience"},
	{ name: 'CS35L', begTime: '12:00P', endTime: '1:50P', days:'24', location: 'BOELTER',term: 'Fall', department: "ComputerScience"},
	{ name: 'CS111', begTime: '2:00P', endTime: '3:50P', days:'24', location: 'BOELTER',term: 'Fall', department: "ComputerScience"},
	{ name: 'CS112', begTime: '12:00P', endTime: '1:50P', days:'13', location: 'BOELTER',term: 'Fall', department: "ComputerScience"},
	{ name: 'CS118', begTime: '12:00P', endTime: '1:50P', days:'13', location: 'BOELTER',term: 'Fall', department: "ComputerScience"},
	{ name: 'CS131', begTime: '12:00P', endTime: '1:50P', days:'24', location: 'BOELTER',term: 'Fall', department: "ComputerScience"},
	{ name: 'CS143', begTime: '8:00A', endTime: '9:50P', days:'13', location: 'BOELTER',term: 'Fall', department: "ComputerScience"},
	{ name: 'CS144', begTime: '10:00P', endTime: '11:50P', days:'13', location: 'BOELTER',term: 'Fall', department: "ComputerScience"},
	{ name: 'CS161', begTime: '12:00P', endTime: '1:50P', days:'24', location: 'BOELTER',term: 'Fall', department: "ComputerScience"},
	{ name: 'CS170A', begTime: '2:00P', endTime: '3:50P', days:'13', location: 'BOELTER',term: 'Fall', department: "ComputerScience"},
	{ name: 'CS174A', begTime: '4:00P', endTime: '5:50P', days:'13', location: 'BOELTER',term: 'Fall', department: "ComputerScience"},
	{ name: 'CS180', begTime: '6:00P', endTime: '7:50P', days:'24', location: 'BOELTER',term: 'Fall', department: "ComputerScience"},
	{ name: 'CS181', begTime: '12:00P', endTime: '1:50P', days:'13', location: 'BOELTER',term: 'Fall', department: "ComputerScience"},
	{ name: 'MATH131A', begTime: '12:00P', endTime: '12:50P', days:'135', location: 'MATH&SCIENCE',term: 'Fall', department: "Math"},
	{ name: 'MATH132', begTime: '2:00P', endTime: '3:50P', days:'24', location: 'MATH&SCIENCE', term: 'Fall', department: "Math"},
	{ name: 'MATH110', begTime: '4:00P', endTime: '4:50P', days:'135', location: 'MATH&SCIENCE', term: 'Fall', department: "Math"},
	{ name: 'MUSIC110', begTime: '4:00P', endTime: '4:50P', days:'24', location: 'ART BUILDING', term: 'Fall', department: "Music"},
	{ name: 'ART998', begTime: '10:00A', endTime: '11:50A', days:'135', location: 'ART BUILDING', term: 'Fall', department: "Art"},
	{ name: 'ETHNOMU 25', begTime: '9:00A', endTime: '10:50A', days:'24', location: 'Schoenberg Music Building', term: 'Fall', department: "Ethnomusicology"}
])

Discussion.create([
	{ lectureId: 1, begTime: '10:00A', endTime: '11:50A', days:'2', location: 'BOELTER', className:'1A'},
	{ lectureId: 1, begTime: '2:00P', endTime: '3:50P', days:'5', location: 'BOELTER', className:'1B'},
	{ lectureId: 2, begTime: '4:00P', endTime: '4:50P', days:'5', location: 'BOELTER', className:'1A'},
	{ lectureId: 3, begTime: '10:00A', endTime: '11:50A', days:'5', location: 'BOELTER', className:'1A'},
	{ lectureId: 4, begTime: '2:00P', endTime: '3:50P', days:'3', location: 'BOELTER', className:'1A'},
	{ lectureId: 4, begTime: '2:00P', endTime: '3:50P', days:'3', location: 'BOELTER', className:'1B'},
	{ lectureId: 16, begTime: '1:00P', endTime: '1:50P', days:'4', location: 'BOELTER', className:'1A'},
	{ lectureId: 17, begTime: '3:00P', endTime: '3:50P', days:'5', location: 'BOELTER', className:'1A'},
	{ lectureId: 19, begTime: '8:00A', endTime: '8:50A', days:'5', location: 'BOELTER', className:'1A'},
	{ lectureId: 20, begTime: '6:00P', endTime: '6:50P', days:'2', location: 'MATH&SCIENCE', className:'1A'},
	{ lectureId: 21, begTime: '3:00P', endTime: '4:50P', days:'2', location: 'Schoenberg Music Building', className:'1A'}
])

User.create([
	{uid: 1, email: 'guanshen@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now, year: '2012', major: 'CS', sex: 'Male', name: 'Guan Beiqi'},
	{uid: 2, email: 'hanshen@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now, year: '2012', major: 'CS', sex: 'Male', name: 'Han Xi'},
	{uid: 3, email: 'sunshen@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now, year: '2012', major: 'CS', sex: 'Male', name: 'Sun Shuo' },
	{uid: 4, email: 'gaoshen@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now, year: '2012', major: 'CS', sex: 'Male', name: 'Gao Yuanzhi'},
	{uid: 5, email: 'yushen@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now, year: '2012', major: 'CS', sex: 'Female', name: 'Yu Mengyuan'},
	{uid: 6, email: 'panshen@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now, year: '2012', major: 'CS', sex: 'Male', name: 'Pan Pengchen'},
	{uid: 7, email: 'wangshen@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now, year: '2012', major: 'CS', sex: 'Male', name: 'WangShen'},
	{uid: 8, email: 'xiashen@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now, year: '2012', major: 'CS', sex: 'Male', name: 'Xia Tianyi'},
	{uid: 9, email: 'xiaobai@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now, year: '2012', major: 'CS', sex: 'Male', name: 'Wu Zhengliang'},
])

SwapRequest.create([
	{user_id: 8, has_dis: 11, want_dis: 5},
	{user_id: 2, has_dis: 7, want_dis: 10},
	{user_id: 1, has_dis: 6, want_dis: 10}
])

guanshen = User.first
Discussion.first(6).each do |dis|
	if(! guanshen.discussions.exists? dis)
		guanshen.discussions << dis
	end
end

hanshen = User.find(2)
Discussion.find([7,8]).each do |dis|
	if(! hanshen.discussions.exists? dis)
		hanshen.discussions << dis
	end
end

sunshen = User.find(3)
Discussion.find([9,10]).each do |dis|
	if(! sunshen.discussions.exists? dis)
		sunshen.discussions << dis
	end
end

yushen = User.find(5)
Discussion.find([7,8,9,10]).each do |dis|
	if(! yushen.discussions.exists? dis)
		yushen.discussions << dis
	end
end


#Helper function =====================
	def match(selfRequest)
		selfRequest
		matchedRequests = SwapRequest.where(has_dis: selfRequest.want_dis, want_dis: selfRequest.has_dis,current_match_user_id: nil)
		if(matchedRequests != [])
			matchedRequest = matchedRequests[0]
			if(selfRequest.update(current_match_user_id: matchedRequest.user_id)&&
				matchedRequest.update(current_match_user_id: selfRequest.user_id))
				if(!add_message(selfRequest))
					return false
				end
				# gan hen duo shi qing
			else
				return false
			end

		end
		return true
	end

    def add_message(swap_request)
    	user1_msg = Message.new
    	user1_msg.user_id = swap_request.user_id
    	user1_msg.category = "swap_request"
    	user1_msg.context = {has_dis: swap_request.has_dis, want_dis: swap_request.want_dis,
    						 match_user_id: swap_request.current_match_user_id}.to_json

    	user2_msg = Message.new	 
    	user2_msg.user_id = swap_request.current_match_user_id
    	user2_msg.category = "swap_request"
    	user2_msg.context = {has_dis: swap_request.want_dis, want_dis: swap_request.has_dis,
    						 match_user_id: swap_request.user_id}.to_json
    	if(user1_msg.save && user2_msg.save)
    		return true;
    	else
    		return false;
    	end

    end

#==================================

SwapRequest.create([
	{user_id: 1, has_dis: 1, want_dis: 7},
	{user_id: 1, has_dis: 1, want_dis: 8},
	{user_id: 1, has_dis: 2, want_dis: 8},
	{user_id: 1, has_dis: 3, want_dis: 8},
	{user_id: 1, has_dis: 4, want_dis: 8},
])
sr = SwapRequest.create({user_id: 2, has_dis: 7, want_dis: 1})
match(sr)
SwapRequest.create([
	{user_id: 2, has_dis: 8, want_dis: 9},
	{user_id: 1, has_dis: 4, want_dis: 9},
])
sr = SwapRequest.create({user_id: 3, has_dis: 9, want_dis: 4})
match(sr)
sr = SwapRequest.create({user_id: 5, has_dis: 9, want_dis: 4})
match(sr)

# at this point, user 1 match user 2 for dis 7 <=> 8
# 				 user 1 match user 3 for dis 9 <=> 4


xiashen = User.find(8)
xiashen.discussions << Discussion.find_by_id(11)
xiashen.discussions << Discussion.find_by_id(6)

xiaobai = User.find(9)


#front-end team are all friends
guanshen.following << hanshen
guanshen.following << sunshen
guanshen.following << yushen

hanshen.following << guanshen
hanshen.following << sunshen
hanshen.following << yushen

yushen.following << guanshen
yushen.following << sunshen
yushen.following << hanshen

sunshen.following << guanshen
sunshen.following << hanshen
sunshen.following << yushen
