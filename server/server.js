ServiceConfiguration.configurations.remove({
    service: 'facebook'
});

ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '987439957992159',
    secret: 'b699bc52cd22ed87ed072dbdf64697ee'
});

Meteor.publish('allMessages', function(){
  return Messages.find({},{createdAt: 1});
})
