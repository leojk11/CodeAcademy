function BusinessLayer() {
    this.dataObject = new DataLayer();

    this.resolveGenresData = async () => {
        await this.dataObject.populateGenres();
        var genres = this.dataObject.getGenres();

        var niza = [];
        var tempGenres = genres.genres;

        for(var i = 0; i < tempGenres.length; i++){
            var tempObject = {
                genresTitle: tempGenres[i].name,
                genresId: tempGenres[i].id,
            };
            niza.push(tempObject);
        }
        return niza;
    };

    this.resolvedMoviesData = async (movieGenreId, pageNumber) => {
        await this.dataObject.populateMovies(movieGenreId, pageNumber);
        var movies = this.dataObject.getMovies();

        var nizaM = [];
        var tempMovies = movies.results;
        var posterLink = "http://image.tmdb.org/t/p/w185/"

        for(var i = 0; i < tempMovies.length; i++){
            var tempObject = {
                moviesTitle: tempMovies[i].title,
                moviesOverview: tempMovies[i].overview,
                moviesPoster: posterLink + tempMovies[i].poster_path,
                movieId: tempMovies[i].id
            }
            nizaM.push(tempObject);
        }
        return nizaM;
    };

    this.resolvedSearchMoviesData = async (searchTerm) => {
        await this.dataObject.populateSearchMovies(searchTerm);
        var searchMovies = this.dataObject.searchMoviesName();

        var nizaSearch = [];
        var tempSearch = searchMovies.results;
        let moviePosterPath = "http://image.tmdb.org/t/p/w342/"

        var arrayLength = tempSearch.length > 10 ? 10 : tempSearch.length;

        for(var i = 0; i < arrayLength; i++){
            var tempObject = {
                movieTitle: tempSearch[i].title,
                moviePoster: moviePosterPath + tempSearch[i].poster_path
            }
            nizaSearch.push(tempObject);
        }
        // console.log(nizaSearch);
        return nizaSearch;
    };

    this.resolvedClickedMovieData = async (clickedMovie) => {
        await this.dataObject.populateClickedMovie(clickedMovie);
        let clickedMovies = this.dataObject.clickedMovies();

        let moviePosterPath = "http://image.tmdb.org/t/p/w342/";
        let imdbPath = "https://www.imdb.com/title/";

        let clickedMovieInfo = {
            name: clickedMovies.title,
            overview: clickedMovies.overview,
            poster: moviePosterPath + clickedMovies.poster_path,
            releaseDate: clickedMovies.release_date,
            runtime: clickedMovies.runtime,
            homePage: clickedMovies.homepage,
            imdb: imdbPath + clickedMovies.imdb_id,
        }
        console.log(clickedMovieInfo);
        return clickedMovieInfo;
    }

    
}