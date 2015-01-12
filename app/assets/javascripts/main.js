$(document).ready( function() {

  nominees = [];

  // Event listener for adding new movie to db

  $('#addMovie').on( 'click', 'input#add', function() {
    event.preventDefault();
    addMovie();
  });

  $(document).keypress(function(e) {
    if(e.which == 13) {
      addMovie();
    }
  });

  $( "#nom" ).click(function() {
    $( "#addMovie" ).slideToggle( "slow", function() {
      // Animation complete.
    });
  });

  // Event listener for deleting a movie from db

  $('#rankedList').on('click', 'span.remove', function(event) {
    deleteMovie(event['target']['parentNode']['parentNode']['id']);
  });

  // Event listener to save order of movies to db

  $('#ranking').on( 'click', 'input#saveRankings', function() {
    event.preventDefault();
    var rankedMovies = $('.ranked');
    addRankings(rankedMovies);
  });

  getMovies();
  updateRanking();

  // Initialize tooltip and sortable ui

  $(function() {
    $( "#rankedList" ).tooltip();
    $( "#rankedList" ).sortable({
      axis: "y",
      stop: function( event, ui ) {
      }
    });
  });

});

function getMovies() {

  $('div#nominated ul').html("");

  $.getJSON( "/movies.json", function( data ) {
    nominees = data;
    movies = [];
    $.each( data, function( key, val ) {
      if (!val.ranked) {
        movies.push( "<li class='nominee' id='" + val.id + "'>" + val.title + "</li>" );
      }
    });
    $('div#nominated ul').append(movies.join(""));
    
    $(function() {
      $( "#nominated li" ).draggable({
        scope: "movies",
        cursor: "pointer",
          // grid: [ 50, 20 ],
          revert : function(event, ui) {
            $(this).data("uiDraggable").originalPosition = {
              top : 0,
              left : 0
            };
            return !event;
          },
          snap: true
        });
      $('div#ranking').droppable({
        scope: 'movies',
        accept: 'li',
        hoverClass: "drop-hover",
        tolerance: 'pointer',
        drop: function (event, ui) {
          itemClasses = ui['draggable'][0]['classList'];
          itemClasses.add("hidden");
          // ui['draggable'][0]
          updateRank(ui['draggable'][0]['id'], -1);
          updateRanking();
        }
      });
    });
  });
};

function addRankings(rankedMovies) {

  console.log(rankedMovies);

  $.each(rankedMovies, function (key, val) {
    updateRank( rankedMovies[key]['id'], key )
  });

  $('p#status').append('Rankings Saved!');

    setInterval(function () {
      $('p#status').html('');
    }, 2500);

}

function updateRank(movie_id, rank) {
  $.ajax({
    type: "PUT",
    url: "/movies/" + movie_id + ".json",
    data: { ranked: true, position: rank}
  });

  console.log("Adding rank to movie");
}

function updateRanking() {
  var ranked = [];
  $('#rankedList').html('');
  $.getJSON( "/movies.json", function( data ) {
    $.each( data, function( key, val ) {
      if( val.ranked && val.position === -1 ) {
          ranked.push("<li class='ranked' title='" + val.year + ", " + val.description + "' id='" +  val.id + "'>" + val.title + " <span class='remove'><i class='fa fa-times'></i></span>" + "</li>");
        } else if ( val.ranked && val.position >= 0 ) {
          ranked[ val.position ] = "<li class='ranked' title='" + val.year + ", " + val.description + "' id='" +  val.id + "'>" + val.title + " <span class='remove'><i class='fa fa-times'></i></span>" + "</li>";
        }
    });
    $('#rankedList').append(ranked.join(""));
    $('#rankedList').append('<input type="button" id="saveRankings" class="btn" value="Save Rankings">')
  });

}

function deleteMovie(movie_id) {
  $.ajax({
    url: '/movies/' + movie_id + ".json" ,
    type: 'DELETE',
    success: function(result) {
      updateRanking();
    }
  });
}

function addMovie() {
  $.ajax({
    type: "POST",
    url: "/movies.json",
    data: {
      title: $('input#title').val(), 
      year: $('input#year').val(), 
      description: $('textarea#summary').val()
    }
  }).done(function() {
    console.log('Post successful')
    getMovies();
    $( "#addMovie" ).slideToggle( "slow", function() {
      // Animation complete.
    });
  });

};
