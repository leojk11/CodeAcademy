function Presentation() {
    this.business = new BusinessLayer();

    this.header = async () => {
        var body = $("body");
        var headerWrapper = $("<div>").addClass("header-wrapper");
        var headerInnerWrapper = $("<div>").addClass("header-inner-wrapper");

        var name = $("<div>").addClass("header-logo");
        let pageLogo = $("<img>").attr("src", "./images/LogoMakr_8GTtSy.png");

        var search = $("<div>").addClass("header-search");
        var searchInput = $("<input>").addClass("search");

        
        body.append(headerWrapper);
        headerWrapper.append(headerInnerWrapper);

        headerInnerWrapper.append(name);
        name.append(pageLogo);

        headerInnerWrapper.append(search);
        search.append(searchInput);
        searchInput.attr("Placeholder", "Search Movies")
    };

    this.searchInput = () => {
        $(".search").on("keypress", async event => {
            if(event.which == 13) {
                $(".div-desno-wrapper").html("");
                $(".desno70").text("LEO ZVER");
                var searchTerm = $(event.target).val();
                let movieInfo = await this.business.resolvedSearchMoviesData(searchTerm);

                for(var i = 0; i < movieInfo.length; i++){
                    let searchedMovieName = $("<h1>").text(movieInfo[i].movieTitle);
                    let searchedMoviePoster = $("<img>").attr("src", movieInfo[i].moviePoster);
                    let movieInfoContent = $("<div>");
                    movieInfoContent.append(searchedMovieName).addClass("searched-movie-name");
                    movieInfoContent.append(searchedMoviePoster).addClass("searched-movie-poster");
                    var movie = $("<div>").append(movieInfoContent).addClass("searched");
                    $(".div-desno-wrapper").append(movie);
                }
            }
        })
    }

    this.mainSection = async () => {
        var body = $("body");
        var mainSecWrapper = $("<div>").addClass("main-sec-wrapper");
        var mainSecInnerWrapper = $("<div>").addClass("main-sec-inner-w");
        var divLevo = $("<div>").addClass("levo-30");
        var divDesno = $("<div>").addClass("desno-70");
        var divDesnoWrapper = $("<div>").addClass("div-desno-wrapper");
        

        body.append(mainSecWrapper);
        mainSecWrapper.append(mainSecInnerWrapper);

        mainSecInnerWrapper.append(divLevo);
        let mainGenres = $("<div>").addClass("main-genres");
        let mainGenresP = $("<p>").addClass("main-genres-text").text("GENRES");
        mainGenres.append(mainGenresP);
        divLevo.append(mainGenres);

        divLevo.append(this.displayGenres= async () => {
            var genres = await this.business.resolveGenresData();
                
                for(var i = 0; i < genres.length; i++){
                var genreName = genres[i].genresTitle;
                var genreId = genres[i].genresId;
                let divWrap = $("<div>").addClass("genre-wrap");
                divWrap.hide();
                let link = $("<p>").text(genreName).attr("id", genreId).addClass("genre-p");

                divLevo.append(divWrap);
                $(divWrap).append(link);
            };

            $(".genre-p").on("click", async event => {
                movieGenreId = event.target.id;
                pageNumber = 1;
                seeMoreBtn.show();
                this.displayMovies(movieGenreId, pageNumber);
            });
            $(".main-genres").on("click", function(){
                $(".genre-wrap").show();
            });

        });
        divDesno.text("<-- CHOOSE GENRE").addClass("choose-genre-text");
        mainSecInnerWrapper.append(divDesnoWrapper);
        divDesnoWrapper.append(divDesno);
        
        this.displayMovies = async (movieGenreId, pageNumber) => {
            var movies = await this.business.resolvedMoviesData(movieGenreId, pageNumber);
    
            divDesno.html("");

            for(var i = 0; i < movies.length; i++){
            var movieName = movies[i].moviesTitle;
            var movieOverview = movies[i].moviesOverview;
            var movieId = movies[i].movieId;

            var moviesPoster = $("<img>").attr("src", movies[i].moviesPoster).addClass("slikica");
            moviesPoster.attr("id", movieId);
            moviesPoster.on("click", async event => {
                clickedMovie = event.target.id;
                moviesPoster.attr("href", "#");

                this.displayClickedMoviePage(clickedMovie);
            })

            var movieNameP = $("<div>").addClass("movie-name-div").attr("id", movieId);
            movieNameP.hide();
            var movieOverviewP = $("<p>").addClass("movie-overview-p");
            var moviePosterDiv = $("<div>").addClass("movie-poster-div");
            var moviesWrap = $("<div>").addClass("movies-wrap");
    
            var movieSectionWrap = $("<div>").addClass("movies-section").attr("id", movieId);
                
            divDesno.append(movieSectionWrap);
            movieSectionWrap.append(moviesWrap);
  
            movieNameP.text(movieName);

            moviesWrap.append(moviePosterDiv);    
            moviePosterDiv.append(moviesPoster);
            moviePosterDiv.append(movieNameP);
    
            moviesWrap.append(movieOverviewP);
            movieOverviewP.text(movieOverview);
            movieOverviewP.hide();
            }
            $(".movie-poster-div").hover(function(){
                $(".movie-name-div", this).show();
            }).mouseout(function() {
                $(".movie-name-div").hide();
            })
        }
        
        var seeMoreBtn = $("<div>").addClass("see-more-btn").hide();
        var seeMoreBtnP = $("<div>").addClass("see-more-btn-p").attr("id", "1");

        divDesnoWrapper.append(seeMoreBtn);
        seeMoreBtn.append(seeMoreBtnP);
        seeMoreBtnP.text("SEE MORE MOVIES");

        $(".see-more-btn-p").on("click", async event => {
            pageNumber = event.target.id++;
            pageNumber++;
            this.displayMovies(movieGenreId, pageNumber);
        });

        this.displayClickedMoviePage = async (clickedMovie) => {
            var clickedMovieResult = await this.business.resolvedClickedMovieData(clickedMovie);

            divDesno.html("");
            seeMoreBtn.hide();

            let clickedMovieWrapper = $("<div>").addClass("clicked-movie-wrapper");
            divDesno.append(clickedMovieWrapper);
            
            let movieName = $("<h1>").addClass("clicked-movie-name").text(clickedMovieResult.name);
            let movieNameWrap = $("<div>").addClass("clicked-movie-name-wrap").append(movieName);
            let movieOverview = $("<div>").addClass("clicked-movie-overview").text(clickedMovieResult.overview);
            let moviePoster = $("<img>").addClass("clicked-movie-poster").attr("src", clickedMovieResult.poster);
            let movieReleaseDate = $("<div>").addClass("clicked-movie-date").text("Release Date: " + clickedMovieResult.releaseDate);
            let movieRuntime = $("<div>").addClass("clicked-movie-runtime").text("Runtime: " + clickedMovieResult.runtime + " min.");
            let moreInfoBtn = $("<a>").addClass("more-info-btn").attr("href", clickedMovieResult.imdb).text("More Info About: " + clickedMovieResult.name);
            let clickedMovie30 = $("<div>").addClass("clicked-movie-30");
            clickedMovieWrapper.append(clickedMovie30);
            let clickedMovie70 = $("<div>").addClass("clicked-movie-70");
            clickedMovieWrapper.append(clickedMovie70);
            

            clickedMovie70.append(movieNameWrap);
            clickedMovie70.append(movieOverview);
            clickedMovie70.append(movieReleaseDate);
            clickedMovie70.append(movieRuntime);
            clickedMovie70.append(moreInfoBtn);
            clickedMovie30.append(moviePoster);

        }
    };
}