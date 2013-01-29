
window.Router = Backbone.Router.extend({

    routes: {
        "": "home",
        "send": "send",
        "contact": "contact",
        "profile": "profile",
        "search": "search",
        "thankyous/:id": "thankyouDetails"
    },

    initialize: function () {

        var self = this;

        this.headerView = new HeaderView();
        this.footerView = new FooterView();
        $('#footer').html(this.footerView.render().el);
        //console.log("dpd.users: " + dpd.users);
        dpd.users.me(function (result, error) {
            if (!result)
                window.location.replace('../');
        });

        // Keep track of the history of pages (we only store the page URL). Used to identify the direction
        // (left or right) of the sliding transition between pages.
        //this.pageHistory = [];

        // Register event listener for back button troughout the app
        $('#content').on('click', '.header-back-button', function (event) {
            window.history.back();
            return false;
        });

        // Check of browser supports touch events...
        if (document.documentElement.hasOwnProperty('ontouchstart')) {
            // ... if yes: register touch event listener to change the "selected" state of the item
            $('#content').on('touchstart', 'a', function (event) {
                self.selectItem(event);
            });
            $('#content').on('touchend', 'a', function (event) {
                self.deselectItem(event);
            });
        } else {
            // ... if not: register mouse events instead
            $('#content').on('mousedown', 'a', function (event) {
                self.selectItem(event);
            });
            $('#content').on('mouseup', 'a', function (event) {
                self.deselectItem(event);
            });
        }

    },

    selectItem: function (event) {
        $(event.target).addClass('tappable-active');
    },

    deselectItem: function (event) {
        $(event.target).removeClass('tappable-active');
    },

    home: function () {

        self = this;

        dpd.users.me(function (result, error) {
            var prof = new Profile({ id: result.id });
            prof.fetch({
                success: function () {
                    self.slidePage(new HomeView({ model: prof }));
                    //$("#content").html(this.homeView.el);
                }
            });
        });

    },

    contact: function () {
        // Since the contact view never changes, we instantiate it and render it only once
        if (!this.contactView) {
            this.contactView = new ContactView();
            this.contactView.render();
        } else {
            this.homeView.delegateEvents(); // delegate events when the view is recycled
        }
        this.slidePage(this.contactView);
    },

    send: function () {
        var thankyou = new ThankYouCollection();
        this.slidePage(new SendView({ model: thankyou }));

        //$("#content").html(this.sendView.el);
    },

    profile: function () {

        var thankYouList = new ThankYouCollection();
        self = this;

        thankYouList.fetch({
            success: function () {
                dpd.users.me(function (result, error) {

                    console.log("Profile UserId: " + result.id);

                    var prof = new Profile({ id: result.id });
                    prof.fetch({
                        success: function () {
                            self.slidePage(new ProfileView({ model: thankYouList, profile: prof }));
                        }
                    });
                });
            }
        });

        this.headerView.select('thankyous-menu');
    },

    search: function () {
        var search = new ThankYouCollection();
        self = this;
        search.fetch({
            success: function () {
                self.slidePage(new SearchView({ model: search }));
                //$("#content").html(this.searchView.el);
            }
        });

    },

    thankyouDetails: function (id) {
        var thankyou = new ThankYou({ id: id });
        self = this;
        thankyou.fetch({
            success: function () {
                self.slidePage(new ThankYouDetailsView({ model: thankyou }));
            }
        });
    },

    slidePage: function (page) {

        var slideFrom,
            self = this;

        if (!this.currentPage) {
            // If there is no current page (app just started) -> No transition: Position new page in the view port
            $(page.el).attr('class', 'page stage-center');
            $('#content').append(page.el);
            this.pageHistory = [window.location.hash];
            this.currentPage = page;
            return;
        }

        // Cleaning up: remove old pages that were moved out of the viewport
        $('.stage-right, .stage-left').remove();

        if (window.location.hash === "") {
            // Always apply a Back (slide from left) transition when we go back to the home page
            slideFrom = "left";
            $(page.el).attr('class', 'page stage-left');
            // Reinitialize page history
            this.pageHistory = [window.location.hash];
        } else if (this.pageHistory.length > 1 && window.location.hash === this.pageHistory[this.pageHistory.length - 2]) {
            // The new page is the same as the previous page -> Back transition
            slideFrom = "left";
            $(page.el).attr('class', 'page stage-left');
            this.pageHistory.pop();
        } else {
            // Forward transition (slide from right)
            slideFrom = "right";
            $(page.el).attr('class', 'page stage-right');
            this.pageHistory.push(window.location.hash);
        }

        $('#content').append(page.el);

        // Wait until the new page has been added to the DOM...
        setTimeout(function () {
            // Slide out the current page: If new page slides from the right -> slide current page to the left, and vice versa
            $(self.currentPage.el).attr('class', 'page transition ' + (slideFrom === "right" ? 'stage-left' : 'stage-right'));
            // Slide in the new page
            $(page.el).attr('class', 'page stage-center transition');
            self.currentPage = page;
        });



    }

});

//templateLoader function defined in utils.js
templateLoader.load(["HomeView", "ContactView", "SendView", "SearchView", "ThankYouDetailsView", "ThankYouListItemView", "ProfileView", "FooterView"],
    function () {
        app = new Router();
        Backbone.history.start();
    });