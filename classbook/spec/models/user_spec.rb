require 'rails_helper'

RSpec.describe User, type: :model do
  user = User.create({uid: 100, email: 'guanshen@gmail.com', password: 'guanshen', password_confirmation: 'guanshen', confirmed_at: Time.zone.now, year: 2012, major: 'CS', sex: 'male', name: 'Guan Beiqi'})
  it "returns a new User object" do
      expect(user).to be_a_instance_of(User)
  end
end
