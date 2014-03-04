app.Views.App = Backbone.View.extend({
    el: '.app',

    initialize: function(){
        app.cities = new app.Collections.Cities();
        new app.Views.Cities();
    },

    events: {
        'click button': 'addCity',
        'click .next': 'nextCity',
        'click .previous': 'previousCity'
    },

    addCity: function(e) {
        e.preventDefault();

        var $city = this.$el.find("#search-city"),
            city  = $city.val(),
            query = escape("select item from weather.forecast where woeid in (select woeid from geo.places where text='" + city + "') and u='c'"),
            URL   = "https://query.yahooapis.com/v1/public/yql?q=" + query + "&format=json&callback=?",
            self  = this;

        $.getJSON( URL, function( data ){
            if( data.query.count > 0 ) {
                var cityTitle       = data.query.results.channel[0].item.title,
                    cityDescription = data.query.results.channel[0].item.description,
                    cityForecast    = data.query.results.channel[0].item.forecast,
                    cityTemp        = data.query.results.channel[0].item.forecast,
                    i,
                    length          = cityForecast.length,
                    cityForecasts   = [];

                for( i = 0; i < length; i++ ){
                    cityForecasts.push({ 
                        day: data.query.results.channel[0].item.forecast[i].day,
                        high: data.query.results.channel[0].item.forecast[i].high,
                        low: data.query.results.channel[0].item.forecast[i].low
                    });
                }

                app.cities.add({
                    title : cityTitle,
                    description : cityDescription,
                    forecast : cityForecast,
                    forecasts : cityForecasts,
                    tweetMessage : "The Temperature in " + cityTitle.split(' ')[2] + " will be between " + cityForecasts[0].low + " and " + cityForecasts[0].high + "C today."
                });

                twttr.widgets.load();
                $city.val( "" ).focus();

                if( app.cities.length > 1 ) {
                    app.cities.trigger( "next" );
                }

            } else {
                console.log( "Sorry no results found!" );
            }
        });
    },

    nextCity: function( e ){
        e.preventDefault();

        app.cities.trigger( "next" );
    },

    previousCity: function( e ){
        e.preventDefault();

        app.cities.trigger( "previous" );
    }
});

