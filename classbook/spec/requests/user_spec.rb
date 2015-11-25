require "rails_helper"

RSpec.describe "user actions", :type => :request do

  it "enrollment" do

    get '/api/user/1/getEnrolledClasses'

    @expected="[{\"className\":\"CS130DIS\",\"startTime\":\"10:00:00\",\"endTime\":\"11:50:00\",\"days\":[2]},{\"className\":\"CS130DIS\",\"startTime\":\"14:00:00\",\"endTime\":\"15:50:00\",\"days\":[5]},{\"className\":\"CS31DIS\",\"startTime\":\"16:00:00\",\"endTime\":\"16:50:00\",\"days\":[5]},{\"className\":\"CS32DIS\",\"startTime\":\"10:00:00\",\"endTime\":\"11:50:00\",\"days\":[5]},{\"className\":\"CS35LDIS\",\"startTime\":\"14:00:00\",\"endTime\":\"15:50:00\",\"days\":[3]},{\"className\":\"CS35LDIS\",\"startTime\":\"14:00:00\",\"endTime\":\"15:50:00\",\"days\":[3]},{\"className\":\"CS130\",\"startTime\":\"12:00:00\",\"endTime\":\"13:50:00\",\"days\":[1,3]},{\"className\":\"CS31\",\"startTime\":\"16:00:00\",\"endTime\":\"17:50:00\",\"days\":[2,4]},{\"className\":\"CS32\",\"startTime\":\"8:00:00\",\"endTime\":\"9:50:00\",\"days\":[1,3]},{\"className\":\"CS35L\",\"startTime\":\"12:00:00\",\"endTime\":\"13:50:00\",\"days\":[2,4]}]"

    expect(response.content_type).to eq("application/json")

    expect(response.body).to eq(@expected)
    
  end

end