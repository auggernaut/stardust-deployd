window.HeaderView = Backbone.View.extend({

    events: {
        "click #logout" : "logout"
    },

    initialize: function () {
        console.log('Initializing Header View');
        this.model = new AboutModel();
    },

    render: function () {
        $(this.el).html(this.template( this.model ));
        return this;
    },

    select: function(menuItem) {
        $('.nav li').removeClass('active');
        $('.' + menuItem).addClass('active');
    },

    logout: function () {
        dpd.users.logout(function (result, error) {
            window.location.replace("/index.html");
        });
    }

});