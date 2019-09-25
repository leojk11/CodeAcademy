function PersistanceLayer() {

    this.getGenres = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:"https://api.themoviedb.org/3/genre/movie/list?api_key=f1e238f540ac3104397bc2bbe85794c5&language=en-US",
                type: "GET",
                success: function(data){
                    resolve(data);
                },
                error: function(error){
                    reject(error);
                }
            });
        });
    };

    this.getMovies = (movieGenreId, pageNumber) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:"https://api.themoviedb.org/3/discover/movie?api_key=f1e238f540ac3104397bc2bbe85794c5&with_genres=" + movieGenreId + "&page=" + pageNumber,
                type: "GET",
                success: function(data){
                    resolve(data);
                },
                error: function(error){
                    reject(error);
                }
            });
        });
    };

    this.searchMovies = (searchTerm) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:"https://api.themoviedb.org/3/search/movie?api_key=f1e238f540ac3104397bc2bbe85794c5&language=en-US&query=" +
                searchTerm + 
                "&page=1&include_adult=true",
                type: "GET",
                success: function(data){
                    resolve(data);
                },
                error: function(error){
                    reject(error);
                }
            });
        });
    };

}