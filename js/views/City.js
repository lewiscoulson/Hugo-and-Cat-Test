app.Views.City = Backbone.View.extend({
    tagName: 'li',
    className: 'city',
    template: _.template( $( '#cityTemplate' ).html() ),

    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    }
});