
window.Router = Backbone.Router.extend({

    routes: {
        "": "home",
        "contact": "contact",
        "profile": "profile",
        "thankyous/:id": "thankyouDetails"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        this.footerView = new FooterView();
        $('#header').html(this.headerView.render().el);
        $('#footer').html(this.footerView.render().el);
        //console.log("dpd.users: " + dpd.users);
        dpd.users.me(function (result, error) {
            if (!result)
                window.location.replace('../');
        });
            
    },

    home: function () {
        var thankYouList = new ThankYouCollection();
        this.homeView = new HomeView({ model: thankYouList });

        $("#content").html(this.homeView.el);
        this.headerView.select('home-menu');
    },

    contact: function () {
        // Since the contact view never changes, we instantiate it and render it only once
        if (!this.contactView) {
            this.contactView = new ContactView();
            this.contactView.render();
        } else {
            this.homeView.delegateEvents(); // delegate events when the view is recycled
        }
        $('#content').html(this.contactView.el);
        this.headerView.select('contact-menu');
    },

    profile: function() {
        
        var thankYouList = new ThankYouCollection();
        
        thankYouList.fetch({
            success: function () {
                dpd.users.me(function (result, error) {

                    console.log("Profile UserId: " + result.id);

                    var prof = new Profile({ id: result.id });
                    prof.fetch({
                        success: function () {
                            $('#content').html(new ProfileView({ model: thankYouList, profile: prof }).el);
                        }
                    });
                });
            }
        });
        
        this.headerView.select('thankyous-menu');
    },

    thankyouDetails: function (id) {
        var thankyou = new ThankYou({ id: id });
        thankyou.fetch({
            success: function () {
                $('#content').html(new ThankYouDetailsView({model: thankyou}.el));
            }
        });
    }

});

//templateLoader function defined in utils.js
templateLoader.load(["HomeView", "ContactView", "ThankYouDetailsView", "ThankYouListItemView", "ProfileView", "HeaderView", "FooterView"],
    function () {
        app = new Router();
        Backbone.history.start();
    });