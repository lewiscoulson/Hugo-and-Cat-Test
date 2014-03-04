app.Views.Cities = Backbone.View.extend({
    el: '.cities',

    initialize: function() {
        this.collection = app.cities;
        this.render();

        this.listenTo(this.collection, 'add', this.render);
        this.listenTo(this.collection, 'next', this.showNext);
        this.listenTo(this.collection, 'previous', this.showPrevious);
    },

    render: function() {
        this.$el.html("");

        this.collection.each(function( item ) {
            this.renderCity( item );
        }, this );
    },

    renderCity: function( item ) {
        var cityView = new app.Views.City({
            model: item
        });
        this.$el.append( cityView.render().el );
    },

    showNext: function(){
        var left = Math.abs( parseInt(this.$el.css( "left" ), 10) ),
            newPos = left + 370 === 0 ? 0 : "-" + (left + 370) + "px";

        this.$el.animate({
            "left": newPos
        }, 300 );
    },

    showPrevious: function(){
        var left = Math.abs( parseInt(this.$el.css( "left" ), 10) ),
            newPos = left + 370 === 0 ? 0 : "-" + (left - 370) + "px";

        this.$el.animate({
            "left": newPos
        }, 300 );
    }
});