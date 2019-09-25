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
        var posterLink = "http://image.tmdb.org/t/p/w342/"

        for(var i = 0; i < tempMovies.length; i++){
            var tempObject = {
                moviesTitle: tempMovies[i].title,
                moviesOverview: tempMovies[i].overview,
                moviesPoster: posterLink + tempMovies[i].poster_path
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

        var arrayLength = tempSearch.length > 10 ? 10 : tempSearch.length;

        for(var i = 0; i < arrayLength; i++){
            var tempObject = {
                movieTitle: tempSearch[i].title,
            }
            nizaSearch.push(tempObject);
        }
        console.log(nizaSearch);
        return nizaSearch;
    };

    
}