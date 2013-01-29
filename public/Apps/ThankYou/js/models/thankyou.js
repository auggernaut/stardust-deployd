window.ThankYou = Backbone.Model.extend();

window.ThankYouCollection = Backbone.Collection.extend({
    model: ThankYou,
    url: "/thank-yous"
});

window.Profile = Backbone.Model.extend({
    urlRoot: "/users",
    defaults: {
        id: null,
        username: "betaTester",
        name: "Beta Tester",
        email: "beta@tester.com"
    }
});