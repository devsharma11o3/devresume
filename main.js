

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

// making animation on first page
var timeout;

function firstPageAnim(){
    var tl = gsap.timeline();
    
    tl.from("#nav",{
        y:'-10',
        opacity: 0,
        duration: 2,
        ease: Expo.easeInOut
    })

        .to(".boundingelem",{
            y: 0,
            ease: Expo.easeInOut,
            delay:-1,
            duration:2,
            stagger:.2,
        })
        .from("#herofooter",{
            y:'10',
            opacity:0,
            duration : 2,
            delay:-1.5,
            ease: Expo.easeInOut
        })
}
//  making mouse chapta
function mouseChapta(){
    clearTimeout(timeout);

    var xscale = 1;
    var yscale = 1;
    
    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove",function(dets){
    
        xscale = gsap.utils.clamp(.8,1.2,dets.clientX-xprev);
        yscale = gsap.utils.clamp(.8,1.2,dets.clientY-yprev);
        
        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale,yscale); 

        timeout = setTimeout(function(){
            document.querySelector('#minicircle').style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
        },110);
    })
}

mouseChapta();


//  for image rotation with mousemove
document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave",function(dets){
        
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease : Power3,
            duration:.5,
            // top:diff,
            // left: dets.clientX,
            // rotate: gsap.utils.clamp(-20,20,diffrot*0.5),

        });
        gsap.to(elem.querySelector("h1,h5"),{
            zindex: 600,
            opacity:.7,
            // left: dets.clientX,
            // rotate: gsap.utils.clamp(-20,20,diffrot*0.5),

        });
        gsap.to(document.querySelector("#minicircle"),{
            // duration:.5,
            delay:.5,
            opacity:1,
            

        });
    });    

    elem.addEventListener("mousemove",function(dets){
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;

        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease : Power3,
            // top:diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20,diffrot*0.5),

        });

        gsap.to(elem.querySelector("h1,h5"),{
            zindex: 600,
            opacity:.3,
            left: dets.clientX,
            // rotate: gsap.utils.clamp(-20,20,diffrot*0.5),

        });

        gsap.to(document.querySelector("#minicircle"),{
            // duration:.5,
            opacity:0,

        });
    });

});



// for following the circle with mouse

function circleMouseFollower(xscale,yscale) {
    window.addEventListener("mousemove", function(dets){
        document.querySelector('#minicircle').style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
            // console.log(dets);
    })
}
circleMouseFollower();
firstPageAnim();


