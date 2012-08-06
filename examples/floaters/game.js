var notifications = {
    game_paused: 'Paused'
}

var events = {
    pause: 'pause',
    resume: 'resume'
}

//game state object
function GameState(){
    this.intervalId;
}

GameState.prototype = {
    init: function(){
        var self = this;
        messageQueue.sub(events.pause, function(data, object){
            if(!self.notification){
                var dom = settings.root.g({'class': 'notification'});
                self.notification = dom.text({
                        x:'45%', 
                        y:'50%', 
                        'font-size':30, 
                        'font-family':'lcd', 
                        fill:'white'
                    })
                    .content(notifications.game_paused);
            }
            else
                self.notification.content(notifications.game_paused);
        });

        messageQueue.sub(events.resume, function(data, object){
            if(self.notification){
                self.notification.content('');
            }
        });
    },
    update: function(){
        messageQueue.process();
    }
}