
//Home View
window.HomeView = Backbone.View.extend({

    events: {
        "click #logout": "logout"
    },

    initialize: function () {
        console.log('Initializing Home View');
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    logout: function () {

        $.ajax({
            type: 'POST',
            url: 'http://localhost:2403/users/logout',
            success: function (data) {
                window.location.replace("/index.html");
            }
        });

        //dpd.users.logout(function (result, error) {
        //    window.location.replace("/index.html");
        //});
    }

});



//Profile View
window.ProfileView = Backbone.View.extend({


    initialize: function () {
        console.log('Initializing ProfileView');
        this.render();
    },

    render: function () {
        var thankyous = this.model.models;
        var profile = this.options.profile;

        $(this.el).html(this.template(profile.toJSON()));

        _.each(thankyous, function (thankyou) {
            //console.log(thankyou.get("thanker"));
            if (profile.id == thankyou.get("thanker"))
                $('.thankyous-sent', this.el).append(new ThankYouListItemView({ model: thankyou }).render().el);
            else if (profile.id == thankyou.get("thankee"))
                $('.thankyous-received', this.el).append(new ThankYouListItemView({ model: thankyou }).render().el);

        }, this);

        return this;
    }

});

window.SearchView = Backbone.View.extend({

    events: {
        "keyup .search-key": "search"
    },

    initialize: function () {
        console.log('Initializing SearchView');
        this.render();
    },

    render: function (data) {
        $(this.el).html(this.template());
        //if (data) {
        //    this.listView = new ThankYouListView({ el: $('ul', this.el), model: data });
        //    this.listView.render();
        //}
        return this;
    },

    search: function (event) {
        var key = $('.search-key').val();
        var results = [];
        var thankyous = this.model.models;

        _.each(thankyous, function (thankyou) {
            if (thankyou.get("thankee").toLowerCase().indexOf(key.toLowerCase()) >= 0) {
                results.push(thankyou);
            }
        });

        //this.model = results;
        //this.render(results);
        $('#myList').html('');
        this.listView = new ThankYouListView({ el: $('#myList', this.el), model: results });
        this.listView.render();
        //$('#myList', this.el).html(new ThankYouListView({ el: $('ul', this.el), model: results }));

    }

});


// Thankyou Views
window.ThankYouListView = Backbone.View.extend({

    tagName: 'div',

    initialize: function () {
        console.log('Initializing ThankYouListView');
        //this.model.bind("reset", this.render, this);
    },

    render: function (eventName) {
        _.each(this.model, function (thankyou) {
            $(this.el).append(new ThankYouListItemView({ model: thankyou }).render().el);
        }, this);
        return this;
    }

});

window.ThankYouListItemView = Backbone.View.extend({

    render: function () {
        console.log(this.model.toJSON());
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});

window.ThankYouDetailsView = Backbone.View.extend({

    //template:_.template($('#tpl-thankyou-details').html()),

    render: function (eventName) {
        $(this.el).append(this.template(this.model.toJSON()));
        return this;
    }

});

//Send Views
window.SendView = Backbone.View.extend({

    events: {
        'click #save': 'submit'
    },

    initialize: function () {
        console.log('Initializing Send View');
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
