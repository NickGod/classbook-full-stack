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
	{ name: 'CS130', begTime: '12:00P', endTime: '1:50P', days:'13', location: 'BOELTER',term: 'Fall15', department: "Computer Science"},
	{ name: 'CS31', begTime: '4:00P', endTime: '5:50P', days:'24', location: 'BOELTER',term: 'Fall15', department: "Computer Science"},
	{ name: 'CS32', begTime: '8:00A', endTime: '9:50A', days:'13', location: 'BOELTER',term: 'Fall15', department: "Computer Science"},
	{ name: 'CS35L', begTime: '12:00P', endTime: '1:50P', days:'24', location: 'BOELTER',term: 'Fall15', department: "Computer Science"},
	{ name: 'CS111', begTime: '2:00P', endTime: '3:50P', days:'24', location: 'BOELTER',term: 'Fall15', department: "Computer Science"},
	{ name: 'CS112', begTime: '12:00P', endTime: '1:50P', days:'13', location: 'BOELTER',term: 'Fall15', department: "Computer Science"},
	{ name: 'CS118', begTime: '12:00P', endTime: '1:50P', days:'13', location: 'BOELTER',term: 'Fall15', department: "Computer Science"},
	{ name: 'CS131', begTime: '12:00P', endTime: '1:50P', days:'24', location: 'BOELTER',term: 'Fall15', department: "Computer Science"},
	{ name: 'CS143', begTime: '8:00A', endTime: '9:50P', days:'13', location: 'BOELTER',term: 'Fall15', department: "Computer Science"},
	{ name: 'CS144', begTime: '10:00P', endTime: '11:50P', days:'13', location: 'BOELTER',term: 'Fall15', department: "Computer Science"},
	{ name: 'CS161', begTime: '12:00P', endTime: '1:50P', days:'24', location: 'BOELTER',term: 'Fall15', department: "Computer Science"},
	{ name: 'CS170A', begTime: '2:00P', endTime: '3:50P', days:'13', location: 'BOELTER',term: 'Fall15', department: "Computer Science"},
	{ name: 'CS174A', begTime: '4:00P', endTime: '5:50P', days:'13', location: 'BOELTER',term: 'Fall15', department: "Computer Science"},
	{ name: 'CS180', begTime: '6:00P', endTime: '7:50P', days:'24', location: 'BOELTER',term: 'Fall15', department: "Computer Science"},
	{ name: 'CS181', begTime: '12:00P', endTime: '1:50P', days:'13', location: 'BOELTER',term: 'Fall15', department: "Computer Science"},
	{ name: 'MATH131A', begTime: '12:00P', endTime: '12:50P', days:'135', location: 'MATH&SCIENCE',term: 'Fall15', department: "Math"},
	{ name: 'MATH132', begTime: '2:00P', endTime: '3:50P', days:'24', location: 'MATH&SCIENCE', term: 'Fall15', department: "Math"},
	{ name: 'MATH110', begTime: '4:00P', endTime: '4:50P', days:'135', location: 'MATH&SCIENCE', term: 'Fall15', department: "Math"},
	{ name: 'MUSIC110', begTime: '4:00P', endTime: '4:50P', days:'24', location: 'ART BUILDING', term: 'Fall15', department: "Music"},
	{ name: 'ART998', begTime: '10:00A', endTime: '11:50A', days:'135', location: 'ART BUILDING', term: 'Fall15', department: "Art"},
	{ name: 'ETHNOMU 25', begTime: '9:00A', endTime: '10:50A', days:'24', location: 'Schoenberg Music Building', term: 'Fall15', department: "Ethnomusicology"}
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
	{uid: 1, email: 'guanshen@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now, year: '2012', major: 'Computer Science', sex: 'Male', name: 'Guan Beiqi'},
	{uid: 2, email: 'hanshen@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now, year: '2012', major: 'Computer Science', sex: 'Male', name: 'Han Xi'},
	{uid: 3, email: 'sunshen@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now, year: '2012', major: 'Computer Science', sex: 'Male', name: 'Sun Shuo' },
	{uid: 4, email: 'gaoshen@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now, year: '2012', major: 'Computer Science', sex: 'Male', name: 'Gao Yuanzhi'},
	{uid: 5, email: 'yushen@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now, year: '2012', major: 'Computer Science', sex: 'Female', name: 'Yu Mengyuan'},
	{uid: 6, email: 'panshen@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now, year: '2012', major: 'Computer Science', sex: 'Male', name: 'Pan Pengchen'},
	{uid: 7, email: 'wangshen@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now, year: '2012', major: 'Computer Science', sex: 'Male', name: 'WangShen'},
	{uid: 8, email: 'xiashen@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now, year: '2012', major: 'Computer Science', sex: 'Male', name: 'Xia Tianyi'},
	{uid: 9, email: 'xiaobai@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now, year: '2012', major: 'Computer Science', sex: 'Male', name: 'Wu Zhengliang'},
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








Lecture.create([
{  id: 1001,  name: "PSYCH 250B",  begTime: "3:00P",  endTime: "4:15P",  days: "13",  location: "FRANZ 3534",  term: "Fall",  department: "Psychology"},
{  id: 1002,  name: "I A STD 33",  begTime: "12:30P",  endTime: "1:45P",  days: "13",  location: "PUB AFF 1222",  term: "Fall",  department: "International and Area Studies"},
{  id: 1003,  name: "CHEM CM160B",  begTime: "2:00P",  endTime: "3:50P",  days: "13",  location: "BOELTER 5249",  term: "Fall",  department: "Chemistry and Biochemistry"},
{  id: 1004,  name: "MATH 132",  begTime: "10:00A",  endTime: "10:50A",  days: "135",  location: "MS 5137",  term: "Fall",  department: "Mathematics"},
{  id: 1005,  name: "PHYSICS 11",  begTime: "1:00P",  endTime: "1:50P",  days: "135",  location: "KNSY PV 1220B",  term: "Fall",  department: "Physics"},
{  id: 1006,  name: "LIFESCI 2",  begTime: "11:00A",  endTime: "11:50A",  days: "135",  location: "LAKRETZ 110",  term: "Fall",  department: "Life Sciences"},
{  id: 1007,  name: "HIN",  begTime: "12:30P",  endTime: "1:45P",  days: "24",  location: "ROYCE 190",  term: "Fall",  department: "Hindi-Urdu"},
{  id: 1008,  name: "CHEM 153A",  begTime: "10:00A",  endTime: "10:50A",  days: "1245",  location: "WGYOUNG CS76",  term: "Fall",  department: "Chemistry and Biochemistry"},
{  id: 1009,  name: "EPIDEM 200B",  begTime: "9:00A",  endTime: "10:50A",  days: "24",  location: "HLTHSCI 33105A",  term: "Fall",  department: "Epidemiology"},
{  id: 1010,  name: "PHYSICS 6B",  begTime: "12:00P",  endTime: "12:50P",  days: "135",  location: "PAB 1425",  term: "Fall",  department: "Physics"},
{  id: 1011,  name: "CHICANO CM106",  begTime: "3:00P",  endTime: "5:50P",  days: "2",  location: "HAINES A18",  term: "Fall",  department: "Chicana and Chicano Studies"},
{  id: 1012,  name: "COM SCI 152B",  begTime: "2:00P",  endTime: "3:50P",  days: "24",  location: "BOELTER 3436",  term: "Fall",  department: "Computer Science"},
{  id: 1013,  name: "JAPAN 2",  begTime: "9:30A",  endTime: "10:45A",  days: "24",  location: "ROYCE 190",  term: "Fall",  department: "Japanese"},
{  id: 1014,  name: "EPS SCI M140",  begTime: "2:00P",  endTime: "3:15P",  days: "24",  location: "GEOLOGY 3645",  term: "Fall",  department: "Earth, Planetary, and Space Sciences"},
{  id: 1015,  name: "COM SCI CM222",  begTime: "2:00P",  endTime: "3:50P",  days: "13",  location: "BOELTER 5249",  term: "Fall",  department: "Computer Science"},
{  id: 1016,  name: "SOCIOL 20",  begTime: "3:30P",  endTime: "4:45P",  days: "24",  location: "HAINES 118",  term: "Fall",  department: "Sociology"},
{  id: 1017,  name: "MATH 151A",  begTime: "10:00A",  endTime: "10:50A",  days: "135",  location: "MS 6229",  term: "Fall",  department: "Mathematics"},
{  id: 1018,  name: "ANTHRO 124P",  begTime: "8:00A",  endTime: "9:15A",  days: "13",  location: "FOWLER A103B",  term: "Fall",  department: "Anthropology"},
{  id: 1019,  name: "ASTR 3",  begTime: "12:00P",  endTime: "12:50P",  days: "135",  location: "KNSY PV 1220B",  term: "Fall",  department: "Astronomy"},
{  id: 1020,  name: "NURSING 3",  begTime: "8:00A",  endTime: "9:20A",  days: "24",  location: "FACTOR 3648",  term: "Fall",  department: "Nursing"},
{  id: 1021,  name: "GREEK 2",  begTime: "",  endTime: "",  days: "VA4",  location: "ONLINE",  term: "Fall",  department: "Greek"},
{  id: 1022,  name: "COMM ST 160",  begTime: "12:30P",  endTime: "1:45P",  days: "24",  location: "PUB AFF 1234",  term: "Fall",  department: "Communication Studies"},
{  id: 1023,  name: "MAT SCI 143A",  begTime: "4:00P",  endTime: "5:50P",  days: "24",  location: "BOELTER 9436",  term: "Fall",  department: "Materials Science and Engineering"},
{  id: 1024,  name: "URBN PL M236A",  begTime: "2:00P",  endTime: "4:50P",  days: "4",  location: "PUB AFF 4320B",  term: "Fall",  department: "Urban Planning"},
{  id: 1025,  name: "ASTR 115",  begTime: "2:00P",  endTime: "2:50P",  days: "135",  location: "PAB 2748",  term: "Fall",  department: "Astronomy"},
{  id: 1026,  name: "GE CLST 21B",  begTime: "11:00A",  endTime: "12:15P",  days: "13",  location: "DE NEVE P350",  term: "Fall",  department: "General Education Clusters"},
{  id: 1027,  name: "MATH 134",  begTime: "9:00A",  endTime: "9:50A",  days: "135",  location: "MS 5137",  term: "Fall",  department: "Mathematics"},
{  id: 1028,  name: "ANTHRO M148W",  begTime: "10:00A",  endTime: "11:50A",  days: "13",  location: "DODD 170",  term: "Fall",  department: "Anthropology"},
{  id: 1029,  name: "EDUC 132",  begTime: "1:00P",  endTime: "1:50P",  days: "3",  location: "BUNCHE 1209B",  term: "Fall",  department: "Education"},
{  id: 1030,  name: "MAT SCI 111",  begTime: "12:00P",  endTime: "1:50P",  days: "24",  location: "BOELTER 5280",  term: "Fall",  department: "Materials Science and Engineering"},
{  id: 1031,  name: "EPS SCI 136A",  begTime: "12:30P",  endTime: "1:45P",  days: "24",  location: "GEOLOGY 3645",  term: "Fall",  department: "Earth, Planetary, and Space Sciences"},
{  id: 1032,  name: "FILM TV 133",  begTime: "12:00P",  endTime: "12:50P",  days: "1",  location: "PERLOFF 1102",  term: "Fall",  department: "Film and Television"},
{  id: 1033,  name: "MATH 33B",  begTime: "9:00A",  endTime: "9:50A",  days: "135",  location: "ROLFE 1200",  term: "Fall",  department: "Mathematics"},
{  id: 1034,  name: "CHEM 153C",  begTime: "8:00A",  endTime: "8:50A",  days: "135",  location: "WGYOUNG CS76",  term: "Fall",  department: "Chemistry and Biochemistry"},
{  id: 1035,  name: "COM SCI M117",  begTime: "2:00P",  endTime: "3:50P",  days: "24",  location: "BOELTER 5440",  term: "Fall",  department: "Computer Science"},
{  id: 1036,  name: "ENGL 119",  begTime: "9:30A",  endTime: "10:45A",  days: "24",  location: "HAINES A25",  term: "Fall",  department: "English"},
{  id: 1037,  name: "ART HIS 23",  begTime: "2:00P",  endTime: "3:15P",  days: "24",  location: "DODD 147",  term: "Fall",  department: "Art History"},
{  id: 1038,  name: "EE BIOL 187",  begTime: "2:00P",  endTime: "3:50P",  days: "1",  location: "MS 5233",  term: "Fall",  department: "Ecology and Evolutionary Biology"},
{  id: 1039,  name: "NURSING 150B",  begTime: "8:00A",  endTime: "10:50A",  days: "4",  location: "FACTOR A660A",  term: "Fall",  department: "Nursing"},
{  id: 1040,  name: "MIMG 109AL",  begTime: "2:00P",  endTime: "3:15P",  days: "24",  location: "BOELTER 5419",  term: "Fall",  department: "Microbiology, Immunology, and Molecular Genetics"},
{  id: 1041,  name: "HUM GEN M252",  begTime: "4:00P",  endTime: "5:50P",  days: "1",  location: "BOYER 159",  term: "Fall",  department: "Human Genetics"},
{  id: 1042,  name: "STATS 20",  begTime: "4:00P",  endTime: "4:50P",  days: "135",  location: "FRANZ 1260",  term: "Fall",  department: "Statistics"},
{  id: 1043,  name: "BIOSTAT 201B",  begTime: "9:00A",  endTime: "9:50A",  days: "135",  location: "HLTHSCI 43105A",  term: "Fall",  department: "Biostatistics"},
{  id: 1044,  name: "CHEM 285",  begTime: "11:00A",  endTime: "11:50A",  days: "24",  location: "WGYOUNG 3069",  term: "Fall",  department: "Chemistry and Biochemistry"},
{  id: 1045,  name: "ANTHRO M212T",  begTime: "1:00P",  endTime: "2:50P",  days: "3",  location: "YRL 11630F",  term: "Fall",  department: "Anthropology"},
{  id: 1046,  name: "PHYSCI CM203",  begTime: "10:00A",  endTime: "11:50A",  days: "13",  location: "BOELTER 5422",  term: "Fall",  department: "Physiological Science"},
{  id: 1047,  name: "URBN PL M110",  begTime: "11:00A",  endTime: "12:15P",  days: "24",  location: "PUB AFF 1246",  term: "Fall",  department: "Urban Planning"},
{  id: 1048,  name: "SOCIOL 173",  begTime: "10:00A",  endTime: "11:50A",  days: "13",  location: "BUNCHE 1209B",  term: "Fall",  department: "Sociology"},
{  id: 1049,  name: "PHYSICS 140B",  begTime: "3:00P",  endTime: "3:50P",  days: "135",  location: "PAB 2748",  term: "Fall",  department: "Physics"},
{  id: 1050,  name: "LATIN 2",  begTime: "11:00A",  endTime: "11:50A",  days: "135",  location: "BUNCHE 3156",  term: "Fall",  department: "Latin"},
{  id: 1051,  name: "M E STD M50B",  begTime: "11:00A",  endTime: "12:15P",  days: "13",  location: "PUB AFF 2214",  term: "Fall",  department: "Middle Eastern Studies"},
{  id: 1052,  name: "PSYCH 116",  begTime: "10:00A",  endTime: "10:50A",  days: "3",  location: "FRANZ 2288",  term: "Fall",  department: "Psychology"},
{  id: 1053,  name: "SOCIOL 1",  begTime: "11:00A",  endTime: "12:15P",  days: "24",  location: "HAINES 39",  term: "Fall",  department: "Sociology"},
{  id: 1054,  name: "COM SCI 111",  begTime: "12:00P",  endTime: "1:50P",  days: "13",  location: "FRANZ 1260",  term: "Fall",  department: "Computer Science"},
{  id: 1055,  name: "FILM TV 106B",  begTime: "9:00A",  endTime: "12:50P",  days: "13",  location: "MELNITZ 1409",  term: "Fall",  department: "Film and Television"},
{  id: 1056,  name: "MATH 131B",  begTime: "9:00A",  endTime: "9:50A",  days: "135",  location: "MS 5147",  term: "Fall",  department: "Mathematics"},
{  id: 1057,  name: "EE BIOL 25",  begTime: "",  endTime: "",  days: "2BA",  location: "",  term: "Fall",  department: "Ecology and Evolutionary Biology"},
{  id: 1058,  name: "LING 20",  begTime: "2:00P",  endTime: "3:50P",  days: "13",  location: "BUNCHE 1209B",  term: "Fall",  department: "Linguistics"},
{  id: 1059,  name: "STATS C155",  begTime: "10:00A",  endTime: "10:50A",  days: "13",  location: "HUMANTS A65",  term: "Fall",  department: "Statistics"},
{  id: 1060,  name: "BIOENGR 180",  begTime: "10:00A",  endTime: "11:50A",  days: "13",  location: "BOELTER 5249",  term: "Fall",  department: "Bioengineering"},
{  id: 1061,  name: "CHEM CM260B",  begTime: "2:00P",  endTime: "3:50P",  days: "13",  location: "BOELTER 5249",  term: "Fall",  department: "Chemistry and Biochemistry"},
{  id: 1062,  name: "CHIN 80",  begTime: "11:00A",  endTime: "12:15P",  days: "13",  location: "ROYCE 156",  term: "Fall",  department: "Chinese"},
{  id: 1063,  name: "PHYSICS 1B",  begTime: "10:00A",  endTime: "11:50A",  days: "24",  location: "PAB 1425",  term: "Fall",  department: "Physics"},
{  id: 1064,  name: "ECON 103L",  begTime: "12:30P",  endTime: "1:20P",  days: "4",  location: "BROAD 2160E",  term: "Fall",  department: "Economics"},
{  id: 1065,  name: "ENGR 111",  begTime: "4:00P",  endTime: "5:50P",  days: "13",  location: "WGYOUNG CS76",  term: "Fall",  department: "Engineering"},
{  id: 1066,  name: "MATH 135",  begTime: "11:00A",  endTime: "11:50A",  days: "135",  location: "MS 5127",  term: "Fall",  department: "Mathematics"},
{  id: 1067,  name: "LIFESCI 1",  begTime: "8:00A",  endTime: "9:15A",  days: "24",  location: "LAKRETZ 110",  term: "Fall",  department: "Life Sciences"},
{  id: 1068,  name: "S ASIAN CM160",  begTime: "12:30P",  endTime: "1:45P",  days: "24",  location: "PAB 2748",  term: "Fall",  department: "South Asian"},
{  id: 1069,  name: "POL SCI 145E",  begTime: "2:00P",  endTime: "3:15P",  days: "24",  location: "DODD 170",  term: "Fall",  department: "Political Science"},
{  id: 1070,  name: "STATS 100A",  begTime: "4:00P",  endTime: "4:50P",  days: "135",  location: "BUNCHE 1209B",  term: "Fall",  department: "Statistics"},
{  id: 1071,  name: "CHEM 14B",  begTime: "11:00A",  endTime: "11:50A",  days: "135",  location: "WGYOUNG CS50",  term: "Fall",  department: "Chemistry and Biochemistry"},
{  id: 1072,  name: "STATS 10",  begTime: "12:00P",  endTime: "12:50P",  days: "135",  location: "BUNCHE 1209B",  term: "Fall",  department: "Statistics"},
{  id: 1073,  name: "WL ARTS M23",  begTime: "12:30P",  endTime: "1:45P",  days: "13",  location: "PUB AFF 2214",  term: "Fall",  department: "World Arts and Cultures"},
{  id: 1074,  name: "LING 103",  begTime: "2:00P",  endTime: "3:50P",  days: "13",  location: "PUB AFF 1337",  term: "Fall",  department: "Linguistics"},
{  id: 1075,  name: "ECON 101",  begTime: "11:00A",  endTime: "12:15P",  days: "13",  location: "DODD 147",  term: "Fall",  department: "Economics"},
{  id: 1076,  name: "MCD BIO 138",  begTime: "9:30A",  endTime: "10:45A",  days: "24",  location: "HAINES A18",  term: "Fall",  department: "Molecular, Cell, and Developmental Biology"},
{  id: 1077,  name: "ENGL 91C",  begTime: "2:00P",  endTime: "3:15P",  days: "24",  location: "HUMANTS 135",  term: "Fall",  department: "English"},
{  id: 1078,  name: "PHYSICS 6B",  begTime: "1:00P",  endTime: "1:50P",  days: "135",  location: "PAB 1425",  term: "Fall",  department: "Physics"},
{  id: 1079,  name: "CHEM 20L",  begTime: "8:00A",  endTime: "8:50A",  days: "2",  location: "WGYOUNG CS50",  term: "Fall",  department: "Chemistry and Biochemistry"},
{  id: 1080,  name: "ECON 165L",  begTime: "11:00A",  endTime: "11:50A",  days: "1",  location: "HAINES A2",  term: "Fall",  department: "Economics"},
{  id: 1081,  name: "PHYSICS 1A",  begTime: "8:00A",  endTime: "8:50A",  days: "1235",  location: "PAB",  term: "Fall",  department: "Physics"},
{  id: 1082,  name: "FILM TV 150",  begTime: "1:00P",  endTime: "3:50P",  days: "4",  location: "MELNITZ 1439A",  term: "Fall",  department: "Film and Television"},
{  id: 1083,  name: "PHYSCI C126",  begTime: "12:30P",  endTime: "1:45P",  days: "24",  location: "BOTANY 325",  term: "Fall",  department: "Physiological Science"},
{  id: 1084,  name: "EE BIOL 151A",  begTime: "11:00A",  endTime: "11:50A",  days: "135",  location: "BOTANY 325",  term: "Fall",  department: "Ecology and Evolutionary Biology"},
{  id: 1085,  name: "LING 127",  begTime: "10:00A",  endTime: "11:50A",  days: "24",  location: "POWELL 320",  term: "Fall",  department: "Linguistics"},
{  id: 1086,  name: "CLASSIC 40W",  begTime: "1:00P",  endTime: "1:50P",  days: "135",  location: "FOWLER A139",  term: "Fall",  department: "Classics"},
{  id: 1087,  name: "LIFESCI 3",  begTime: "12:30P",  endTime: "1:45P",  days: "24",  location: "WGYOUNG CS50",  term: "Fall",  department: "Life Sciences"},
{  id: 1088,  name: "MATH 182",  begTime: "2:00P",  endTime: "2:50P",  days: "135",  location: "GEOLOGY 4645",  term: "Fall",  department: "Mathematics"},
{  id: 1089,  name: "COM SCI 188",  begTime: "4:00P",  endTime: "5:50P",  days: "24",  location: "BOELTER 5436",  term: "Fall",  department: "Computer Science"},
{  id: 1090,  name: "BIOENGR C239A",  begTime: "10:00A",  endTime: "11:50A",  days: "24",  location: "BOELTER 5272",  term: "Fall",  department: "Bioengineering"},
{  id: 1091,  name: "RELIGN M161D",  begTime: "12:30P",  endTime: "1:45P",  days: "24",  location: "PAB 2748",  term: "Fall",  department: "Religion, Study of"},
{  id: 1092,  name: "PHYSICS 131",  begTime: "1:00P",  endTime: "1:50P",  days: "135",  location: "PAB 1434A",  term: "Fall",  department: "Physics"},
{  id: 1093,  name: "ECON 102",  begTime: "3:30P",  endTime: "4:45P",  days: "13",  location: "DODD 147",  term: "Fall",  department: "Economics"},
{  id: 1094,  name: "BIOSTAT 200C",  begTime: "9:00A",  endTime: "9:50A",  days: "135",  location: "PUB HLT 41268",  term: "Fall",  department: "Biostatistics"},
{  id: 1095,  name: "LING 130",  begTime: "12:00P",  endTime: "1:50P",  days: "24",  location: "BUNCHE 3178",  term: "Fall",  department: "Linguistics"},
{  id: 1096,  name: "CHEM 20A",  begTime: "11:00A",  endTime: "11:50A",  days: "135",  location: "WGYOUNG CS24",  term: "Fall",  department: "Chemistry and Biochemistry"},
{  id: 1097,  name: "VIETMSE 2A",  begTime: "12:30P",  endTime: "1:45P",  days: "24",  location: "HUMANTS A65",  term: "Fall",  department: "Vietnamese"},
{  id: 1098,  name: "MATH 32B",  begTime: "9:00A",  endTime: "9:50A",  days: "135",  location: "MS 4000A",  term: "Fall",  department: "Mathematics"},
{  id: 1099,  name: "NURSING 162A",  begTime: "8:00A",  endTime: "10:50A",  days: "5",  location: "FACTOR 5255",  term: "Fall",  department: "Nursing"},
{  id: 1100,  name: "MATH 245B",  begTime: "12:00P",  endTime: "12:50P",  days: "135",  location: "MS 5117",  term: "Fall",  department: "Mathematics"},
])

Discussion.create([
{  lectureId: 1001,  begTime: "3:00A",  endTime: "3:50A",  days: "3",  location: "FRANZ 3534",  className: "1B"},
{  lectureId: 1002,  begTime: "8:00A",  endTime: "8:50A",  days: "2",  location: "PUB AFF 1222",  className: "1B"},
{  lectureId: 1003,  begTime: "8:00A",  endTime: "8:50A",  days: "1",  location: "BOELTER 5249",  className: "1C"},
{  lectureId: 1004,  begTime: "11:00A",  endTime: "11:50A",  days: "5",  location: "MS 5137",  className: "1C"},
{  lectureId: 1005,  begTime: "2:00A",  endTime: "2:50A",  days: "5",  location: "KNSY PV 1220B",  className: "1C"},
{  lectureId: 1006,  begTime: "11:00A",  endTime: "11:50A",  days: "3",  location: "LAKRETZ 110",  className: "1B"},
{  lectureId: 1007,  begTime: "2:00A",  endTime: "2:50A",  days: "3",  location: "ROYCE 190",  className: "1C"},
{  lectureId: 1008,  begTime: "4:00A",  endTime: "4:50A",  days: "1",  location: "WGYOUNG CS76",  className: "1C"},
{  lectureId: 1009,  begTime: "11:00A",  endTime: "11:50A",  days: "2",  location: "HLTHSCI 33105A",  className: "1A"},
{  lectureId: 1010,  begTime: "12:00P",  endTime: "12:50P",  days: "5",  location: "PAB 1425",  className: "1C"},
{  lectureId: 1011,  begTime: "5:00A",  endTime: "5:50A",  days: "5",  location: "HAINES A18",  className: "1A"},
{  lectureId: 1012,  begTime: "1:00A",  endTime: "1:50A",  days: "3",  location: "BOELTER 3436",  className: "1B"},
{  lectureId: 1013,  begTime: "10:00A",  endTime: "10:50A",  days: "3",  location: "ROYCE 190",  className: "1A"},
{  lectureId: 1014,  begTime: "12:00P",  endTime: "12:50P",  days: "3",  location: "GEOLOGY 3645",  className: "1B"},
{  lectureId: 1015,  begTime: "8:00A",  endTime: "8:50A",  days: "5",  location: "BOELTER 5249",  className: "1C"},
{  lectureId: 1016,  begTime: "11:00A",  endTime: "11:50A",  days: "4",  location: "HAINES 118",  className: "1A"},
{  lectureId: 1017,  begTime: "3:00A",  endTime: "3:50A",  days: "2",  location: "MS 6229",  className: "1B"},
{  lectureId: 1018,  begTime: "3:00A",  endTime: "3:50A",  days: "2",  location: "FOWLER A103B",  className: "1A"},
{  lectureId: 1019,  begTime: "10:00A",  endTime: "10:50A",  days: "1",  location: "KNSY PV 1220B",  className: "1B"},
{  lectureId: 1020,  begTime: "1:00A",  endTime: "1:50A",  days: "2",  location: "FACTOR 3648",  className: "1B"},
{  lectureId: 1021,  begTime: "9:00A",  endTime: "9:50A",  days: "4",  location: "ONLINE",  className: "1A"},
{  lectureId: 1022,  begTime: "12:00P",  endTime: "12:50P",  days: "3",  location: "PUB AFF 1234",  className: "1B"},
{  lectureId: 1023,  begTime: "11:00A",  endTime: "11:50A",  days: "4",  location: "BOELTER 9436",  className: "1A"},
{  lectureId: 1024,  begTime: "4:00A",  endTime: "4:50A",  days: "4",  location: "PUB AFF 4320B",  className: "1C"},
{  lectureId: 1025,  begTime: "5:00A",  endTime: "5:50A",  days: "2",  location: "PAB 2748",  className: "1A"},
{  lectureId: 1026,  begTime: "12:00P",  endTime: "12:50P",  days: "4",  location: "DE NEVE P350",  className: "1B"},
{  lectureId: 1027,  begTime: "5:00A",  endTime: "5:50A",  days: "4",  location: "MS 5137",  className: "1B"},
{  lectureId: 1028,  begTime: "2:00A",  endTime: "2:50A",  days: "3",  location: "DODD 170",  className: "1C"},
{  lectureId: 1029,  begTime: "10:00A",  endTime: "10:50A",  days: "1",  location: "BUNCHE 1209B",  className: "1B"},
{  lectureId: 1030,  begTime: "8:00A",  endTime: "8:50A",  days: "1",  location: "BOELTER 5280",  className: "1C"},
{  lectureId: 1031,  begTime: "12:00P",  endTime: "12:50P",  days: "5",  location: "GEOLOGY 3645",  className: "1A"},
{  lectureId: 1032,  begTime: "11:00A",  endTime: "11:50A",  days: "2",  location: "PERLOFF 1102",  className: "1A"},
{  lectureId: 1033,  begTime: "2:00A",  endTime: "2:50A",  days: "3",  location: "ROLFE 1200",  className: "1C"},
{  lectureId: 1034,  begTime: "9:00A",  endTime: "9:50A",  days: "1",  location: "WGYOUNG CS76",  className: "1B"},
{  lectureId: 1035,  begTime: "4:00A",  endTime: "4:50A",  days: "3",  location: "BOELTER 5440",  className: "1C"},
{  lectureId: 1036,  begTime: "11:00A",  endTime: "11:50A",  days: "2",  location: "HAINES A25",  className: "1B"},
{  lectureId: 1037,  begTime: "5:00A",  endTime: "5:50A",  days: "3",  location: "DODD 147",  className: "1B"},
{  lectureId: 1038,  begTime: "10:00A",  endTime: "10:50A",  days: "3",  location: "MS 5233",  className: "1B"},
{  lectureId: 1039,  begTime: "2:00A",  endTime: "2:50A",  days: "2",  location: "FACTOR A660A",  className: "1B"},
{  lectureId: 1040,  begTime: "10:00A",  endTime: "10:50A",  days: "4",  location: "BOELTER 5419",  className: "1A"},
{  lectureId: 1041,  begTime: "3:00A",  endTime: "3:50A",  days: "3",  location: "BOYER 159",  className: "1A"},
{  lectureId: 1042,  begTime: "12:00P",  endTime: "12:50P",  days: "3",  location: "FRANZ 1260",  className: "1B"},
{  lectureId: 1043,  begTime: "4:00A",  endTime: "4:50A",  days: "3",  location: "HLTHSCI 43105A",  className: "1C"},
{  lectureId: 1044,  begTime: "11:00A",  endTime: "11:50A",  days: "4",  location: "WGYOUNG 3069",  className: "1A"},
{  lectureId: 1045,  begTime: "11:00A",  endTime: "11:50A",  days: "1",  location: "YRL 11630F",  className: "1C"},
{  lectureId: 1046,  begTime: "10:00A",  endTime: "10:50A",  days: "4",  location: "BOELTER 5422",  className: "1C"},
{  lectureId: 1047,  begTime: "4:00A",  endTime: "4:50A",  days: "1",  location: "PUB AFF 1246",  className: "1B"},
{  lectureId: 1048,  begTime: "3:00A",  endTime: "3:50A",  days: "3",  location: "BUNCHE 1209B",  className: "1C"},
{  lectureId: 1049,  begTime: "10:00A",  endTime: "10:50A",  days: "1",  location: "PAB 2748",  className: "1A"},
{  lectureId: 1050,  begTime: "8:00A",  endTime: "8:50A",  days: "2",  location: "BUNCHE 3156",  className: "1C"},
{  lectureId: 1051,  begTime: "5:00A",  endTime: "5:50A",  days: "4",  location: "PUB AFF 2214",  className: "1B"},
{  lectureId: 1052,  begTime: "3:00A",  endTime: "3:50A",  days: "1",  location: "FRANZ 2288",  className: "1A"},
{  lectureId: 1053,  begTime: "8:00A",  endTime: "8:50A",  days: "2",  location: "HAINES 39",  className: "1A"},
{  lectureId: 1054,  begTime: "1:00A",  endTime: "1:50A",  days: "1",  location: "FRANZ 1260",  className: "1B"},
{  lectureId: 1055,  begTime: "2:00A",  endTime: "2:50A",  days: "5",  location: "MELNITZ 1409",  className: "1C"},
{  lectureId: 1056,  begTime: "1:00A",  endTime: "1:50A",  days: "3",  location: "MS 5147",  className: "1A"},
{  lectureId: 1057,  begTime: "11:00A",  endTime: "11:50A",  days: "4",  location: "",  className: "1C"},
{  lectureId: 1058,  begTime: "5:00A",  endTime: "5:50A",  days: "1",  location: "BUNCHE 1209B",  className: "1C"},
{  lectureId: 1059,  begTime: "12:00P",  endTime: "12:50P",  days: "4",  location: "HUMANTS A65",  className: "1A"},
{  lectureId: 1060,  begTime: "9:00A",  endTime: "9:50A",  days: "3",  location: "BOELTER 5249",  className: "1C"},
{  lectureId: 1061,  begTime: "5:00A",  endTime: "5:50A",  days: "3",  location: "BOELTER 5249",  className: "1A"},
{  lectureId: 1062,  begTime: "5:00A",  endTime: "5:50A",  days: "3",  location: "ROYCE 156",  className: "1B"},
{  lectureId: 1063,  begTime: "10:00A",  endTime: "10:50A",  days: "1",  location: "PAB 1425",  className: "1A"},
{  lectureId: 1064,  begTime: "1:00A",  endTime: "1:50A",  days: "3",  location: "BROAD 2160E",  className: "1C"},
{  lectureId: 1065,  begTime: "1:00A",  endTime: "1:50A",  days: "3",  location: "WGYOUNG CS76",  className: "1B"},
{  lectureId: 1066,  begTime: "9:00A",  endTime: "9:50A",  days: "5",  location: "MS 5127",  className: "1B"},
{  lectureId: 1067,  begTime: "4:00A",  endTime: "4:50A",  days: "5",  location: "LAKRETZ 110",  className: "1A"},
{  lectureId: 1068,  begTime: "12:00P",  endTime: "12:50P",  days: "2",  location: "PAB 2748",  className: "1C"},
{  lectureId: 1069,  begTime: "9:00A",  endTime: "9:50A",  days: "5",  location: "DODD 170",  className: "1C"},
{  lectureId: 1070,  begTime: "1:00A",  endTime: "1:50A",  days: "2",  location: "BUNCHE 1209B",  className: "1C"},
{  lectureId: 1071,  begTime: "12:00P",  endTime: "12:50P",  days: "2",  location: "WGYOUNG CS50",  className: "1B"},
{  lectureId: 1072,  begTime: "12:00P",  endTime: "12:50P",  days: "3",  location: "BUNCHE 1209B",  className: "1B"},
{  lectureId: 1073,  begTime: "4:00A",  endTime: "4:50A",  days: "2",  location: "PUB AFF 2214",  className: "1C"},
{  lectureId: 1074,  begTime: "11:00A",  endTime: "11:50A",  days: "3",  location: "PUB AFF 1337",  className: "1A"},
{  lectureId: 1075,  begTime: "4:00A",  endTime: "4:50A",  days: "1",  location: "DODD 147",  className: "1B"},
{  lectureId: 1076,  begTime: "12:00P",  endTime: "12:50P",  days: "5",  location: "HAINES A18",  className: "1C"},
{  lectureId: 1077,  begTime: "12:00P",  endTime: "12:50P",  days: "2",  location: "HUMANTS 135",  className: "1C"},
{  lectureId: 1078,  begTime: "12:00P",  endTime: "12:50P",  days: "1",  location: "PAB 1425",  className: "1A"},
{  lectureId: 1079,  begTime: "1:00A",  endTime: "1:50A",  days: "3",  location: "WGYOUNG CS50",  className: "1A"},
{  lectureId: 1080,  begTime: "12:00P",  endTime: "12:50P",  days: "1",  location: "HAINES A2",  className: "1C"},
{  lectureId: 1081,  begTime: "10:00A",  endTime: "10:50A",  days: "4",  location: "PAB",  className: "1B"},
{  lectureId: 1082,  begTime: "12:00P",  endTime: "12:50P",  days: "4",  location: "MELNITZ 1439A",  className: "1A"},
{  lectureId: 1083,  begTime: "3:00A",  endTime: "3:50A",  days: "5",  location: "BOTANY 325",  className: "1C"},
{  lectureId: 1084,  begTime: "11:00A",  endTime: "11:50A",  days: "2",  location: "BOTANY 325",  className: "1A"},
{  lectureId: 1085,  begTime: "1:00A",  endTime: "1:50A",  days: "3",  location: "POWELL 320",  className: "1B"},
{  lectureId: 1086,  begTime: "3:00A",  endTime: "3:50A",  days: "1",  location: "FOWLER A139",  className: "1A"},
{  lectureId: 1087,  begTime: "4:00A",  endTime: "4:50A",  days: "3",  location: "WGYOUNG CS50",  className: "1A"},
{  lectureId: 1088,  begTime: "10:00A",  endTime: "10:50A",  days: "2",  location: "GEOLOGY 4645",  className: "1B"},
{  lectureId: 1089,  begTime: "1:00A",  endTime: "1:50A",  days: "4",  location: "BOELTER 5436",  className: "1B"},
{  lectureId: 1090,  begTime: "1:00A",  endTime: "1:50A",  days: "1",  location: "BOELTER 5272",  className: "1C"},
{  lectureId: 1091,  begTime: "11:00A",  endTime: "11:50A",  days: "2",  location: "PAB 2748",  className: "1C"},
{  lectureId: 1092,  begTime: "9:00A",  endTime: "9:50A",  days: "3",  location: "PAB 1434A",  className: "1A"},
{  lectureId: 1093,  begTime: "9:00A",  endTime: "9:50A",  days: "5",  location: "DODD 147",  className: "1A"},
{  lectureId: 1094,  begTime: "2:00A",  endTime: "2:50A",  days: "4",  location: "PUB HLT 41268",  className: "1B"},
{  lectureId: 1095,  begTime: "2:00A",  endTime: "2:50A",  days: "2",  location: "BUNCHE 3178",  className: "1B"},
{  lectureId: 1096,  begTime: "1:00A",  endTime: "1:50A",  days: "3",  location: "WGYOUNG CS24",  className: "1A"},
{  lectureId: 1097,  begTime: "3:00A",  endTime: "3:50A",  days: "5",  location: "HUMANTS A65",  className: "1B"},
{  lectureId: 1098,  begTime: "5:00A",  endTime: "5:50A",  days: "3",  location: "MS 4000A",  className: "1B"},
{  lectureId: 1099,  begTime: "4:00A",  endTime: "4:50A",  days: "4",  location: "FACTOR 5255",  className: "1C"},
{  lectureId: 1100,  begTime: "9:00A",  endTime: "9:50A",  days: "5",  location: "MS 5117",  className: "1B"},
	])
