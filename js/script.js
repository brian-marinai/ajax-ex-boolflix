
function addSearchListener() {

  var target = $("#button");
  target.click(startSearch);

}


function startSearch() {

  var target = $("#input");
  var query = target.val();
  target.val('');

  var targetResult = $('#risultati ul');
  targetResult.text('');

  getMovies(query);
  getSeries(query);

}

function getMovies(query) {

  $.ajax({

    url: 'https://api.themoviedb.org/3/search/movie',
    method: 'GET',
    data: {

      'api_key' : 'd0718a8649ef29118eb57a106d0dd396',
      'query' : query
    },

    success : function (data) {

      var movies = data['results'];

      var target = $('#risultati-movie ul');
      var template = $('#movie-template').html();
      var compiled = Handlebars.compile(template);

      for (var i = 0; i < movies.length; i++) {

        var movie = movies[i];

        var vote = movie['vote_average'];
        movie.stars = getStars(vote);

        var language = movie['original_language'];
        movie.flag = getFlag(language);


        var movieHTML = compiled(movie);
        target.append(movieHTML);

      }
    },

    error : function(err) {
      console.log(err);
    }

  });

}

function getSeries(query) {

  $.ajax({

    url: 'https://api.themoviedb.org/3/search/tv',
    method: 'GET',
    data: {

      'api_key' : 'd0718a8649ef29118eb57a106d0dd396',
      'query' : query
    },

    success : function (data) {

      var series = data['results'];

      var target = $('#risultati-serie ul');
      var template = $('#serie-template').html();
      var compiled = Handlebars.compile(template);

      for (var i = 0; i < series.length; i++) {

        var serie = series[i];

        var vote = serie['vote_average'];
        serie.stars = getStars(vote);

        var language = serie['original_language'];
        serie.flag = getFlag(language);


        var serieHTML = compiled(serie);
        target.append(serieHTML);

      }
    },

    error : function(err) {
      console.log(err);
    }

  });
}


function getStars(vote) {

  vote = Math.ceil(vote);

  var voteHTML = '';
  for (var j = 0; j < 10; j++) {

    if (j < vote) {

      voteHTML += '<i class="fas fa-star"></i>'

    }else {

      voteHTML += '<i class="far fa-star"></i>'
    }
  }

  return voteHTML;
}

function getFlag(language) {

  if(language === 'it' || language === 'en') {

    return `<img class="flag" src="img/${language}.png" style="height: 30px;">`;

  }

    return language;

}


function init () {
  addSearchListener();

  // debug
  startSearch();
  // debug
}


$(document).ready(init);
