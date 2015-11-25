require 'rails_helper'

RSpec.describe Lecture, type: :model do
  lecture = Lecture.create({ name: 'CS130', begTime: '12:00P', endTime: '1:50P', days:'13', location: 'BOELTER',term: 'Fall', department: "ComputerScience"})
  it "returns a new Lecture object" do
      expect(lecture).to be_a_instance_of(Lecture)
  end
end