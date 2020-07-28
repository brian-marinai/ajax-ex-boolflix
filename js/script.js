
function addSearchListener() {

  var target = $("#button");
  target.click(getMovies);

}

function getMovies() {

  var target = $("#input");
  var query = target.val();

  $.ajax({

    url: 'https://api.themoviedb.org/3/search/movie',
    method: 'GET',
    data: {

      'api_key' : 'd0718a8649ef29118eb57a106d0dd396',
      'query' : query
    },

    success : function (data) {

      var movies = data['results'];
      var target = $('#risultati ul');
      var template = $('#movie-template').html();
      var compiled = Handlebars.compile(template);

      for (var i = 0; i < movies.length; i++) {

        var movie = movies[i];
        var movieHTML = compiled(movie);
        target.append(movieHTML);

      }
    },

    error : function(err) {
      console.log(err);
    }

  });

}




function init () {
  addSearchListener();
}


$(document).ready(init);
