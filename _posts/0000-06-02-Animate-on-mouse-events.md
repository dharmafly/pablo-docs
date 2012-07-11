---
category: reference
---

Pablo supports mouse events.

    paper('circle')
        .attr({style:'cursor:pointer'})
        .on('mouseover', function(event){
            pablo(event.target)
                .empty()
                ('animate', {
                    attributeName:'fill',
                    from:'#ff3',
                    to:'#005',
                    dur:'1.62s',
                    repeatCount:'indefinite'
                })
                ('animate', {
                    attributeName:'r',
                    from:45,
                    to:60,
                    dur:'6s',
                    repeatCount:'indefinite'
                })
        })
        .on('mouseout', function(event){
            pablo(event.target).empty();
        })
        .on('mousedown', function(event){
            pablo(event.target).attr({stroke:'#fff'});
        })
        .on('mouseup', function(event){
            pablo(event.target).attr({stroke:'#050'});
        });