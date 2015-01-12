class Movie < ActiveRecord::Base
  attr_accessible :year, :description, :title, :ranked, :position

end
