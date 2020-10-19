/*
    Remove includeHTML() and any of its instances 
    when the proper modules have been imported/integrated to PHP
*/
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "The page '" + file + "' is missing or under construction.";
                    }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            };
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}
// --------------------------------------------------------------


(function($) {
    includeHTML();
})(jQuery);


// ✋ Please set the value(s) below to `true` if these
//    modules have been integrated to CMS
//    thank you 
var isIntegrated = false;

jQuery(document).ready(function($) {
 

    //Workaround fix
    
     

    //Global Functions
    function isMobile() {
        return ($(window).width() <= 1024 ? true : false);
    }
    
    // Sticky Bar Module
    var isNavigating = false;
    var stickyMiddleNav = {
        parent: $('.middle--nav'),
        navLinks: $(".middle--nav li"),
        init: function() {
            var $this = this;
            $(".middle--nav li").each(function(target) {
                $this.onClick(this);
            });

            $this.mobileInit(this);
            
            
        },
        onClick: function(nav) {
            var $this = this.navLinks;
            $(nav).on('click', function(e) {
                var scrollTo = $('a', nav).attr('href');
                if (scrollTo != null && scrollTo != '') {
                    isNavigating = true;
                    $('html, body').animate({
                        scrollTop: $(scrollTo).offset().top - 80
                    }, 800, function() {
                        isNavigating = false;
                    });
                }
                $this.removeClass('active');
                $(nav).addClass('active');
            });
        },
        mobileMain: $('.middle--nav .mobile--current--state'),
        mobileInit: function($this) {
            // Set main controller
            $(".mobile--current--state", $this.parent).click(function() {
                if (isMobile()) {
                    $(".ul--wrapper", $this.parent).slideToggle(300, function() {
                        //Animation Complete
                    });
                    $(".mobile--current--state", $this.parent).toggleClass('active');
                }
            });
            // Toggle when selecting a nav
            $('.ul--wrapper li', $this.parent).on('click', function() {
                if (isMobile())
                    $(".ul--wrapper", $this.parent).slideToggle();
            });
            // Hide Nav when clicked outside
            $(document).mouseup(function(e) {
                if (isMobile()) {
                    var container = $(".middle--nav");
                    if (!container.is(e.target) && container.has(e.target).length === 0) {
                        $(".middle--nav .ul--wrapper").slideUp(300);
                    }
                } else {
                    $(".middle--nav .ul--wrapper").show();
                }
            });
            $(window).resize(function() {
                if (!isMobile) {
                    $(".middle--nav .ul--wrapper").show();
                }
            });
        }
    };

    function openQuiz(){
        //Reset all other quiz box
        $('.quiz_list--item').addClass('quiz__collapsed').removeClass('quiz__expanded');

        if(window.location.hash.substr(1) != ''){
            var hash = window.location.hash.substr(1);
            var quizTarget = '.quiz_list--item[data-quiz="'+ hash +'"]';
            if($(quizTarget).length){
                $('html, body').animate({
                    scrollTop: $(quizTarget).offset().top - 90
                }, 'slow', function(){
                    $(quizTarget).removeClass('quiz__collapsed').addClass('quiz__expanded');
                });
               
            }
        }     
    }

    openQuiz();
    
    $('.open__expanded__quiz').on('click', function() {
        $('.quiz_list--item').addClass('quiz__collapsed').removeClass('quiz__expanded');
        var target = $(this).data('target');
        $(target).removeClass('quiz__collapsed').addClass('quiz__expanded');
    });

    $('.close__expanded__quiz').on('click', function() {
        var target = $(this).data('target');
        $(target).addClass('quiz__collapsed').removeClass('quiz__expanded');
    });


    $('.homepage_banner_slider__').slick({
        autoplaySpeed: 5000,
        autoplay: true,
        arrows: false,
        dots: true,
        infinite: true
    });

    $('.bio--knowledge--filter').on('click', function() {
        var targ = $(this).data('target');
        $('.bio--knowledge--filter').removeClass('active');
        $('.bio--tab_content_item').removeClass('active');
        $(this).addClass('active');
        $(targ).addClass('active');
    });

    var forestIsCalled = false;
    setTimeout(function() {
        $( ".sticky-container" ).prependTo( "#fullpage" ); 
        setMiddleNavDetection();
        stickyMiddleNav.init();



        $(".trigger--section").once().on("click", function() {
            var target = $(this).data('target');
            if (target != "" && target != undefined) {
                $('#ecosystem__block').hide();
            }
            $('.animated--section').removeClass('active');
            $(target).addClass("active");
            AOS.init();
            // if (target = '#eco__animated__1' && forestIsCalled == false) {
            
            //     forestIsCalled = true;
            // }
            $('html, body').animate({
                scrollTop: $('.animated--section.active').offset().top - 90
            }, 'slow');
        });

        $(".animated--section .close--proper").on("click", function() {
            var target = $(this).data('target');
            $('#ecosystem__block').show();
            $('.animated--section').removeClass('active');
            $('html, body').animate({
                scrollTop: $('#ecosystem__block').offset().top - 90
            }, 'slow');
        });


        $(".trigger--modal").on("click", function() {
            $('body').addClass('modal-active');
            var target = $(this).data('target'); 
            // $('video', this).trigger('pause');
            console.log(target);
            $(target + ".mask").addClass("active");
            $('video', target + ".modal").trigger("play");
            
            $(target + " .close, " + target + ".mask").on("click", function() {
                closeModal();
            });
        });

        // Function for close the Modal
        function closeModal() {
            $('body').removeClass('modal-active');
            $(".mask").removeClass("active");
            $('video').trigger('pause');
        }

        // Call the closeModal function on the clicks/keyboard


        $(document).keyup(function(e) {
            if (e.keyCode == 27) {
                closeModal();
            }
        });


        $('.slick-wrapper').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true
        });

        $('.masthead-slick-wrapper').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true
        });

        $('.our_clients-slider').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 2,
            slidesToScroll: 2,
            adaptiveWidth: true,
            centerPadding: '24px',
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

        $('.three__column__slider').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 3,
            adaptiveWidth: true,
            centerPadding: '24px',
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }, (isIntegrated ? 0 : 2000));


    //Middle nav 
    function setMiddleNavDetection() {
        // Cache selectors
        var lastId,
            topMenu = $(".middle--nav"),
            topMenuHeight = topMenu.outerHeight() + 80,
            // All list items
            menuItems = topMenu.find("a"),
            // Anchors corresponding to menu items
            scrollItems = menuItems.map(function() {
                var item = $($(this).attr("href"));
                if (item.length) {
                    return item;
                }
            });

        // Bind click handler to menu items
        // so we can get a fancy scroll animation
        menuItems.click(function(e) {
            var href = $(this).attr("href"),
                offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight - 50;

            e.preventDefault();
        });

        // Bind to scroll
        $(window).scroll(function() {
            // Get container scroll position
            var fromTop = $(this).scrollTop() + topMenuHeight;

            // Get id of current scroll item
            var cur = scrollItems.map(function() {
                if ($(this).offset().top < fromTop) return this;
            });
            // Get the id of the current element
            cur = cur[cur.length - 1];
            var id = cur && cur.length ? cur[0].id : "";

            if (lastId !== id && isNavigating === false) {
                lastId = id;
                lastChild =  menuItems.parent().end().filter("[href='#" + id + "']").parent();
                // console.log(lastChild.text());
                $('.mobile--current--state span').text(lastChild.text())
                // Set/remove active class 
                menuItems
                    .parent()
                    .removeClass("active")
                    .end()
                    .filter("[href='#" + id + "']")
                    .parent()
                    .addClass("active");
            }
        });
    }

  
    function scrollToDiv(sectionClass) {
        var ele;
        if (jQuery('.' + sectionClass).length > 0) {
            ele = jQuery('.' + sectionClass+':visible');
        } else  if (jQuery('#' + sectionClass).length > 0){
            ele = jQuery('#' + sectionClass+':visible');
        }
        if(ele && ele.length > 0 && typeof ele != 'undefined' && ele.offset().top){
            jQuery('html, body').animate({
                scrollTop: ele.offset().top
            }, 1500);        
        }
        return false;
    }

});