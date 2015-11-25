require 'rails_helper'

RSpec.describe Discussion, type: :model do
  dis = Discussion.create({ lectureId: 1, begTime: '10:00A', endTime: '11:50A', days:'2', location: 'BOELTER', className:'1A'})
  it "returns a new Discussion object" do
      expect(dis).to be_a_instance_of(Discussion)
  end
end
