var svg = Pablo('#stage').svg({width:1920, height:1024}),
    rect = svg.rect({width:100, height:100, x:0, y:0}),
    anim = rect.animation();

anim.add('slideX', {
    attr: 'x',
    delta: 100,
    per: 1000,
    dur: 6000
});
anim.add('slideY', {
    attr: 'y',
    delta: 38,
    per: 1000,
    dur: 6000
});

rect.on('click', function(){
    if (anim.animating){
        anim.stop();
    }
    else {
        anim.start();
    }
});

anim.start();