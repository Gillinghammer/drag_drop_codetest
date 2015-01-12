class AddRankedToMovie < ActiveRecord::Migration
  def change
    add_column :movies, :ranked, :boolean
  end
end
