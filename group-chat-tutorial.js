if (Meteor.isClient) {
  Template.messageInRow.helpers({
    format_createdAt: function(time){
      return moment(time).format('hh:mm a');
    }
  });

  Template.messageOutRow.helpers({
    format_createdAt: function(time){
      // console.log(time);
      // console.log(moment(time).format('hh:mm a'));
      return moment(time).format('hh:mm a');
    }
  });

  Template.groupChat.helpers({
    testingHelper: function(){
      return "this is the result of the testing Helper!"
    },
    findAllMessages: function(){
      return Messages.find({},{sort: {createdAt: 1}});
    },
    isSender: function(){
      // console.dir(this);
      if(this.name === Meteor.user().services.facebook.first_name){
        return true
      } else {
        return false
      }
    },
    memberNames: function(){
      return Session.get('allMembers');
    }
  });

  Template.groupChat.events({
    'click button': function () {
      var newMessage = document.getElementById('message-input-box').value;
      // console.log(newMessage);
      if(newMessage !== ""){
        var messageObj = {  message: newMessage,
                            name: Meteor.user().services.facebook.first_name,
                            // name: "Lawrence",
                            createdAt: new Date()
        }
        Messages.insert(messageObj);
        document.getElementById('message-input-box').value = '';
        console.log($('.chat-body').scrollHeight);
        var chatBody = document.getElementById("chat-body");
        chatBody.scrollTop = chatBody.scrollHeight;
      }

    },
    'keypress input': function (evt, template) {
       if (evt.which === 13) {
         var newMessage = document.getElementById('message-input-box').value;
         if(newMessage !== ""){
          //  console.log(newMessage);

           var messageObj = {  message: newMessage,
                               name: Meteor.user().services.facebook.first_name,
                               createdAt: new Date()
           }
           Messages.insert(messageObj);
           document.getElementById('message-input-box').value = '';
           var chatBody = document.getElementById("chat-body");
           chatBody.scrollTop = chatBody.scrollHeight;
         }
       }
     }
  });

  Template.groupChat.onRendered(function() {

    Meteor.call('getAllMembersName', function(err, result){
      if(result) {
        Session.set('allMembers', result);
      }
    });

    Meteor.autorun(function(){
      var sub = Meteor.subscribe("allMessages");

      if(sub.ready()){
       var chatBody = document.getElementById("chat-body");
       chatBody.scrollTop = chatBody.scrollHeight;
       console.log('onRendered scrollHeight: ' + chatBody.scrollHeight);
      }
    });
    this.autorun(function(){
       var allMessages = Messages.find().fetch();
       var chatBody = document.getElementById("chat-body");
       chatBody.scrollTop = chatBody.scrollHeight;
       console.log('autorun scrollHeight: ' + chatBody.scrollHeight);
    });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.methods({
      getAllMembersName: function(){
        var allUsers = Meteor.users.find().fetch();
        var membersString = '';
        for (var i=0; i< allUsers.length; i++){
          membersString = membersString + ', ' + allUsers[i].services.facebook.first_name;
        }

        return membersString.substring(2, membersString.length+1);
      }
    })
  });
}

Messages = new Mongo.Collection('messages');
