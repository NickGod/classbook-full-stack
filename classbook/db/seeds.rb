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
	{ name: 'CS130', begTime: '12:00P', endTime: '1:50P', days:'MW', location: 'BOELTER'},
	{ name: 'CS31', begTime: '4:00P', endTime: '5:50P', days:'MW', location: 'BOELTER'},
	{ name: 'CS32', begTime: '8:00A', endTime: '9:50A', days:'MW', location: 'BOELTER'},
	{ name: 'CS35L', begTime: '12:00P', endTime: '1:50P', days:'TR', location: 'BOELTER'},
	{ name: 'CS111', begTime: '2:00P', endTime: '3:50P', days:'TR', location: 'BOELTER'},
	{ name: 'CS112', begTime: '12:00P', endTime: '1:50P', days:'MW', location: 'BOELTER'},
	{ name: 'CS118', begTime: '12:00P', endTime: '1:50P', days:'MW', location: 'BOELTER'},
	{ name: 'CS1131', begTime: '12:00P', endTime: '1:50P', days:'TR', location: 'BOELTER'},
	{ name: 'CS143', begTime: '8:00A', endTime: '9:50P', days:'MW', location: 'BOELTER'},
	{ name: 'CS144', begTime: '10:00P', endTime: '11:50P', days:'MW', location: 'BOELTER'},
	{ name: 'CS161', begTime: '12:00P', endTime: '1:50P', days:'TR', location: 'BOELTER'},
	{ name: 'CS170A', begTime: '2:00P', endTime: '3:50P', days:'MW', location: 'BOELTER'},
	{ name: 'CS174A', begTime: '4:00P', endTime: '5:50P', days:'MW', location: 'BOELTER'},
	{ name: 'CS180', begTime: '6:00P', endTime: '7:50P', days:'TR', location: 'BOELTER'},
	{ name: 'CS181', begTime: '12:00P', endTime: '1:50P', days:'MW', location: 'BOELTER'}
])

Discussion.create([
	{ lectureId: 1, begTime: '10:00A', endTime: '11:50P', days:'F', location: 'BOELTER'},
	{ lectureId: 1, begTime: '2:00P', endTime: '3:50P', days:'F', location: 'BOELTER'},
	{ lectureId: 1, begTime: '4:00P', endTime: '5:50P', days:'F', location: 'BOELTER'},
	{ lectureId: 2, begTime: '12:00A', endTime: '11:50P', days:'F', location: 'BOELTER'},
	{ lectureId: 2, begTime: '2:00P', endTime: '3:50P', days:'F', location: 'BOELTER'}

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

i = 1
for user in User.all do 
	user.discussions << Discussion.find(i%5+1)
	i += 1
end

guanshen = User.first
Discussion.all.each do |dis|
	if(! guanshen.discussions.exists? dis)
		guanshen.discussions << dis
	end
end
