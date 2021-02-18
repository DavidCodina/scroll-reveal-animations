let AnimateSections = {
  init: function(){
    const sections = document.querySelectorAll('.section.animate__animated');


    function throttle(func, timeFrame){
      let lastTime = 0;
      return (
        function(){
          let now = new Date();
          if (now - lastTime >= timeFrame){
            func();
            lastTime = now;
          }
        }
      );
    }


    function animateSections(){
    	sections.forEach(section => {
    		const distanceToTop     = section.getBoundingClientRect().top;
        const enterAnimation    = section.getAttribute('data-enter');
        const exitAnimation     = section.getAttribute('data-exit');
        // const ninetyPercent  = (window.innerHeight / 10) * 9; // i.e., is above 10% from bottom
        // const eightyPercent  = (window.innerHeight / 10) * 8; // i.e., is above 20% from bottom.
        // const seventyPercent = (window.innerHeight / 10) * 7; // i.e., is above 30% from bottom.
        // const sixtyPercent   = (window.innerHeight / 10) * 6; // i.e., is above 40% from bottom.
        // const fiftyPercent   = (window.innerHeight / 10) * 5; // i.e., is above 50% from bottom.
        const threeQuarters     = (window.innerHeight / 4)  * 3; // i.e., is above 25% from bottom.
        // const twoThirds      = (window.innerHeight / 3)  * 2; // i.e., is above 66.66% from bottom.
        const threshold         = threeQuarters;                 // Should match default state's threshold below.
    		if (distanceToTop < threshold){
          section.classList.remove(exitAnimation);
    			section.classList.add(enterAnimation);
    		} else {
          section.classList.remove(enterAnimation);
    			section.classList.add(exitAnimation);
    		}
    	});
    }
    const throttled_animateSections = throttle(animateSections, 100);


    this.destroy = function(){
      sections.forEach(section => {
        const enterAnimation            = section.getAttribute('data-enter');
        const exitAnimation             = section.getAttribute('data-exit');
        section.style.animationDuration = '0s';
        section.classList.remove(exitAnimation);
        section.classList.add(enterAnimation);
        setTimeout(function(){ section.style.animationDuration = ''; }, 1000);
      });
      window.removeEventListener('scroll', throttled_animateSections);
      AnimateSections = null; // Optional
      console.log("Removed AnimateSections related event listeners, and set the AnimateSections object to: ", AnimateSections);
      return this; // Gotcha: this may actually return the object, and not null
    };


    /* ========================
    Set default animation state
    ======================== */


    sections.forEach(section => {
      const distanceToTop             = section.getBoundingClientRect().top;
      const enterAnimation            = section.getAttribute('data-enter');
      const exitAnimation             = section.getAttribute('data-exit');
      // const ninetyPercent          = (window.innerHeight / 10) * 9; // i.e., is above 10% from bottom
      // const eightyPercent          = (window.innerHeight / 10) * 8; // i.e., is above 20% from bottom.
      // const seventyPercent         = (window.innerHeight / 10) * 7; // i.e., is above 30% from bottom.
      // const sixtyPercent           = (window.innerHeight / 10) * 6; // i.e., is above 40% from bottom.
      // const fiftyPercent           = (window.innerHeight / 10) * 5; // i.e., is above 50% from bottom.
      const threeQuarters             = (window.innerHeight / 4)  * 3; // i.e., is above 25% from bottom.
      // const twoThirds              = (window.innerHeight / 3)  * 2; // i.e., is above 66.66% from bottom.
      const threshold                 = threeQuarters;                 // Should match threshold in animateSections() above.
      section.style.animationDuration = '0s';
      if (distanceToTop > threshold){ section.classList.add(exitAnimation);  }
      else {                          section.classList.add(enterAnimation); }
      setTimeout(function(){ section.style.animationDuration = ''; }, 1000);
    });


    /* ========================

    ======================== */


    window.addEventListener('scroll', throttled_animateSections);
    delete this.init; // Optional
    Object.freeze(this);
    return this;
  }
}.init();


/* =============================================================================

============================================================================= */


function initialize(){
  setTimeout(function(){ document.body.classList.remove('preload'); }, 500);
}

initialize();

// window.onpageshow = (e) => { if (e.persisted){ location.reload(); }}; // Optional
