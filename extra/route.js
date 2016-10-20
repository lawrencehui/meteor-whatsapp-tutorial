Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.route('/', {
  onBeforeAction(){
    if(Meteor.isClient && Meteor.userId()){
      this.redirect("groupChat");
    } else {
      this.redirect("login");
    }
  }
});

Router.route('/login', {
  name: 'login',
  template: 'login'
});

Router.route('/groupChat', {
  name: 'groupChat',
  template: 'groupChat',
  onBeforeAction(){
    if(Meteor.isClient && Meteor.userId()){
      this.next();
    } else {
      this.redirect("login");
    }
  }
});
