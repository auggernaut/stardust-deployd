//Profile View
window.ProfileView = Backbone.View.extend({

    initialize: function () {
        console.log('Initializing ProfileView');
        this.render();
    },

    render: function () {
        var thankyous = this.model.models;
        var profile = this.options.profile;

        $(this.el).html('<div class="profile"></div><h3>Sent</h3><ul class="thankyous-sent"></ul><h3>Received</h3><ul class="thankyous-received"></ul></div>');

        _.each(thankyous, function (thankyou) {
            //console.log(thankyou.get("thanker"));
            if (profile.id == thankyou.get("thanker"))
                $('.thankyous-sent', this.el).append(new ThankYouListItemView({ model: thankyou }).render().el);
            else if(profile.id == thankyou.get("thankee"))
                $('.thankyous-received', this.el).append(new ThankYouListItemView({ model: thankyou }).render().el);

        }, this);

        $('.profile', this.el).append(this.template(profile.toJSON()));

        return this;
    }

});

// Thankyou Views
//window.ThankYouListView = Backbone.View.extend({
 
//    tagName:'ul',
 
//    initialize:function () {
//        console.log('Initializing ThankYouListView');
//        this.model.bind("reset", this.render, this);
//    },
 
//    render:function (eventName) {
//        _.each(this.model.models, function (thankyou) {
//            if(this.model.userId == thankyou.thankee)
//                $(this.el).append(new ThankYouListItemView({model:thankyou}).render().el);
//        }, this);
//        return this;
//    }
 
//});

window.ThankYouListItemView = Backbone.View.extend({

    tagName: "li",

    render: function (eventName) {
        console.log(this.model.toJSON());
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});

window.ThankYouDetailsView = Backbone.View.extend({
 
    //template:_.template($('#tpl-thankyou-details').html()),
 
    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
 
});

