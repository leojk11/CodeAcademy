function DataLayer() {
    this.persistanceObject = new PersistanceLayer();

    this.genre = {};
    this.movies = {};
    this.searchMovies = {};
    
    this.populateGenres = async () => {
        this.genre = await this.persistanceObject.getGenres();
    };
    this.populateMovies = async (movieGenreId, pageNumber) => {
        this.movies = await this.persistanceObject.getMovies(movieGenreId, pageNumber);
    };  
    this.populateSearchMovies = async (searchTerm) => {
        this.searchMovies = await this.persistanceObject.searchMovies(searchTerm);
    };


    this.getGenres = () => {
        return this.genre;
    };
    this.getMovies = () => {
        return this.movies;
    };
    this.searchMoviesName = () => {
        return this.searchMovies;
    }
}