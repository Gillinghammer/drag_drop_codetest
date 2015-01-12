# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Movie.create([
  { title: 'Back To The Future', year: '1985', description: 'A young man is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his friend, Dr. Emmett Brown, and must make sure his high-school-age parents unite in order to save his own existence.'},
  { title: 'Star Wars: The Empire Strikes Back', year: '1980', description: 'After the rebels have been brutally overpowered by the Empire on their newly established base, Luke Skywalker takes advanced Jedi training with Master Yoda, while his friends are pursued by Darth Vader as part of his plan to capture Luke.'},
  { title: 'Jurassic Park', year: '1993', description: 'During a preview tour, a theme park suffers a major power breakdown that allows its cloned dinosaur exhibits to run amok.'},
  { title: 'The Godfather', year: '1972', description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.'},
  { title: 'The Usual Suspects', year: '1995', description: 'A sole survivor tells of the twisty events leading up to a horrific gun battle on a boat, which begin when five criminals meet at a seemingly random police lineup.'},
  { title: 'Tommy Boy', year: '1995', description: 'An incompetent, immature, and dimwitted heir to an auto parts factory must save the business to keep it out of the hands of his new, con-artist relatives and big business.'},
  ])