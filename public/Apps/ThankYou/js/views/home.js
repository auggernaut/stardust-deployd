window.HomeView = Backbone.View.extend({

    events: {
        'click .save' : 'submit'
    },

    initialize: function () {
        console.log('Initializing Home View');
        this.render();
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },

    submit: function (e) {

        this.model.create({
            thanker: 'Augustin',
            thankee: $('#name').val(),
            reason: $('#reason').val(),
            tags: $('#tags').val()
        });

        $('#name').val('');
        $('#reason').val('');
        $('#tags').val('');

        $('#message').show().html("Thank you sent!");
    }

});