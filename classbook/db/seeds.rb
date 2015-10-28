# db/seeds.rb
 
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
 
Group.create([
  { name: 'Ben Franklin Labs' },
  { name: 'Snip Salon Software' },
  { name: 'GloboChem' },
  { name: 'TechCorp' },
])


Lecture.create([
	{ name: 'CS130', begTime: '12:00P', endTime: '1:50P', days:'13', location: 'BOELTER'}
])

Discussion.create([
	{ lectureId: 1, begTime: '10:00A', endTime: '11:50A', days:'5', location: 'BOELTER'}
])