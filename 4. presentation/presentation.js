function Presentation() {
    this.business = new BusinessLayer();

    this.header = async () => {
        var body = $("body");
        var headerWrapper = $("<div>").addClass("header-wrapper");
        var headerInnerWrapper = $("<div>").addClass("header-inner-wrapper");

        var name = $("<div>").addClass("header-name");
        var nameP = $("<h1>");

        var search = $("<div>").addClass("header-search");
        var searchInput = $("<input>").addClass("search");

        this.searchInput = () => {
            searchInput.on("keyup", async event => {
                var searchTerm = $(event.target).val();

                if(searchTerm.length > 0){
                    search.append(movieNameDiv);
                    var movieName = await this.business.resolvedSearchMoviesData(searchTerm);

                    var movieNameDiv = $("<div>").addClass("search-movie-name");

                    for(var i = 0; i < movieName.length; i++){
                        var movie = $("<div>").text(movieName[i].movieTitle).addClass("searched-name");
                        movieNameDiv.append(movie);
                    }
                    search.append(movieNameDiv);
                }
                else{
                    $(".searched-name").html("");
                }
            })
        }


        body.append(headerWrapper);
        headerWrapper.append(headerInnerWrapper);

        headerInnerWrapper.append(name);
        name.append(nameP);
        nameP.text("MOInfo");

        headerInnerWrapper.append(search);
        search.append(searchInput);
        searchInput.attr("Placeholder", "search")
    };

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
        divLevo.append(this.displayGenres= async () => {
            var genres = await this.business.resolveGenresData();
                
                for(var i = 0; i < genres.length; i++){
                var genreName = genres[i].genresTitle;
                var genreId = genres[i].genresId;
                let divWrap = $("<div>").addClass("genre-wrap");
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

        });

        mainSecInnerWrapper.append(divDesnoWrapper);
        divDesnoWrapper.append(divDesno);
        
        

        this.displayMovies = async (movieGenreId, pageNumber) => {
            var movies = await this.business.resolvedMoviesData(movieGenreId, pageNumber);
    
            divDesno.html("");

            for(var i = 0; i < movies.length; i++){
            var movieName = movies[i].moviesTitle;
            var movieOverview = movies[i].moviesOverview;
            var moviesPoster = $("<img>").attr("src", movies[i].moviesPoster);
            var movieNameP = $("<p>").addClass("movie-name-p");
            var movieOverviewP = $("<p>").addClass("movie-overview-p");
            var moviePosterDiv = $("<div>").addClass("movie-poster-div");
            var moviesWrap = $("<div>").addClass("movies-wrap");
    
            var movieSectionWrap = $("<div>").addClass("movies-section");
                
            divDesno.append(movieSectionWrap);
            movieSectionWrap.append(moviesWrap);

            moviesWrap.append(movieNameP);     
            movieNameP.text(movieName);

            moviesWrap.append(moviePosterDiv);    
            moviePosterDiv.append(moviesPoster);
    
            moviesWrap.append(movieOverviewP);
            movieOverviewP.text(movieOverview);
            movieOverviewP.hide();


            }
        }

        
        var seeMoreBtn = $("<div>").addClass("see-more-btn").hide();
        var seeMoreBtnP = $("<div>").addClass("see-more-btn-p").attr("id", "1");

        divDesnoWrapper.append(seeMoreBtn);
        seeMoreBtn.append(seeMoreBtnP);
        seeMoreBtnP.text("SEE MORE");

        $(".see-more-btn-p").on("click", async event => {
            pageNumber = event.target.id++;
            pageNumber++;
            this.displayMovies(movieGenreId, pageNumber);
        });

        // this.searchInput = () => {
        //     var body =  $("body");
        //     var input = $("<input>").addClass("nesto");
        //     body.append(input);
        //     input.on("keyup", async event => {
        //         var searchTerm = $(event.target).val();

        //         if(searchTerm.length > 3){
        //             var movieName = await this.business.resolvedSearchMoviesData(searchTerm);

        //             var movieNameDiv = $("<div>").addClass("name");

        //             for(var i = 0; i < movieName.length; i++){
        //                 var movie = $("<div>").text(movieName[i].movieTitle);
        //                 movieNameDiv.append(movie);
        //             }
        //             search.append(movieNameDiv);
        //         }
        //     })
        // }
    };
}


// PREPRAI GO DIVO U MAIN KAJ FILMOVITE ZA SEE MORE BUTTONOT