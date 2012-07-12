---
category: reference
---

Pablo can be used to attach mouse events to svg elements.

    
    var paper = Pablo($output[0]).root({width:300, height:420});

    // Create the circle
    paper._('circle', {cx:60, cy:60, r:50, fill:'#ff3', stroke:'#050'});

    // Apply the mouse events
    paper('circle')
        .attr({style:'cursor:pointer'})
        .on('mouseover', function(event){
            Pablo(event.target)
                .empty()
                ._('animate', {
                    attributeName:'fill',
                    from:'#ff3',
                    to:'#005',
                    dur:'1.62s',
                    repeatCount:'indefinite'
                })
                ._('animate', {
                    attributeName:'r',
                    from:45,
                    to:60,
                    dur:'6s',
                    repeatCount:'indefinite'
                });
        })
        .on('mouseout', function(event){
            Pablo(event.target).empty();
        })
        .on('mousedown', function(event){
            Pablo(event.target).attr({stroke:'#fff'});
        })
        .on('mouseup', function(event){
            Pablo(event.target).attr({stroke:'#050'});
        });