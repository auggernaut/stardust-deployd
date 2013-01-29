window.FooterView = Backbone.View.extend({

    initialize: function () {
        console.log('Initializing Footer View');
        this.model = new AboutModel();
    },

    render: function () {
        $(this.el).html(this.template( this.model ));
        return this;
    }

});