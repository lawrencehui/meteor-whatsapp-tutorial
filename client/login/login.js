Template.login.events({
  'click .fb-login-btn': function () {
    Meteor.loginWithFacebook({}, function(err){
      if (err) {
          throw new Meteor.Error("Facebook login failed");
      }
      console.log('FB login successfully');
      Router.go('groupChat');
    });
  }
});
