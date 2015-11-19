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
	{ name: 'CS130', begTime: '12:00P', endTime: '1:50P', days:'13', location: 'BOELTER'},
	{ name: 'CS31', begTime: '4:00P', endTime: '5:50P', days:'24', location: 'BOELTER'},
	{ name: 'CS32', begTime: '8:00A', endTime: '9:50A', days:'13', location: 'BOELTER'},
	{ name: 'CS35L', begTime: '12:00P', endTime: '1:50P', days:'24', location: 'BOELTER'},
	{ name: 'CS111', begTime: '2:00P', endTime: '3:50P', days:'24', location: 'BOELTER'},
	{ name: 'CS112', begTime: '12:00P', endTime: '1:50P', days:'13', location: 'BOELTER'},
	{ name: 'CS118', begTime: '12:00P', endTime: '1:50P', days:'13', location: 'BOELTER'},
	{ name: 'CS131', begTime: '12:00P', endTime: '1:50P', days:'24', location: 'BOELTER'},
	{ name: 'CS143', begTime: '8:00A', endTime: '9:50P', days:'13', location: 'BOELTER'},
	{ name: 'CS144', begTime: '10:00P', endTime: '11:50P', days:'13', location: 'BOELTER'},
	{ name: 'CS161', begTime: '12:00P', endTime: '1:50P', days:'24', location: 'BOELTER'},
	{ name: 'CS170A', begTime: '2:00P', endTime: '3:50P', days:'13', location: 'BOELTER'},
	{ name: 'CS174A', begTime: '4:00P', endTime: '5:50P', days:'13', location: 'BOELTER'},
	{ name: 'CS180', begTime: '6:00P', endTime: '7:50P', days:'24', location: 'BOELTER'},
	{ name: 'CS181', begTime: '12:00P', endTime: '1:50P', days:'13', location: 'BOELTER'},
	{ name: 'MATH131A', begTime: '12:00P', endTime: '12:50P', days:'135', location: 'MATH&SCIENCE'},
	{ name: 'MATH132', begTime: '2:00P', endTime: '3:50P', days:'24', location: 'MATH&SCIENCE'},
	{ name: 'MATH110', begTime: '4:00P', endTime: '4:50P', days:'135', location: 'MATH&SCIENCE'},
	{ name: 'MUSIC110', begTime: '4:00P', endTime: '4:50P', days:'24', location: 'ART BUILDING'},
	{ name: 'ART998', begTime: '10:00A', endTime: '11:50A', days:'135', location: 'ART BUILDING'},
])

Discussion.create([
	{ lectureId: 1, begTime: '10:00A', endTime: '11:50A', days:'2', location: 'BOELTER'},
	{ lectureId: 1, begTime: '2:00P', endTime: '3:50P', days:'5', location: 'BOELTER'},
	{ lectureId: 2, begTime: '4:00P', endTime: '4:50P', days:'5', location: 'BOELTER'},
	{ lectureId: 3, begTime: '10:00A', endTime: '11:50A', days:'5', location: 'BOELTER'},
	{ lectureId: 4, begTime: '2:00P', endTime: '3:50P', days:'3', location: 'BOELTER'},
	{ lectureId: 4, begTime: '2:00P', endTime: '3:50P', days:'3', location: 'BOELTER'},
	{ lectureId: 16, begTime: '1:00P', endTime: '1:50P', days:'4', location: 'BOELTER'},
	{ lectureId: 17, begTime: '3:00P', endTime: '3:50P', days:'5', location: 'BOELTER'},
	{ lectureId: 19, begTime: '8:00A', endTime: '8:50A', days:'5', location: 'BOELTER'},
	{ lectureId: 20, begTime: '6:00P', endTime: '6:50P', days:'2', location: 'MATH&SCIENCE'},
])

User.create([
	{uid: 1, email: 'guanshen@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now},
	{uid: 2, email: 'hanshen@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now},
	{uid: 3, email: 'sunshen@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now},
	{uid: 4, email: 'gaoshen@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now},
	{uid: 5, email: 'yushen@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now},
	{uid: 6, email: 'panshen@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now},
	{uid: 7, email: 'wangshen@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now},
	{uid: 8, email: 'xiashen@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now},
	{uid: 9, email: 'xiaobai@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now},
])


# i = 1
# for user in User.all do 
# 	user.discussions << Discussion.find(i%5+1)
# 	i += 1
# end

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
