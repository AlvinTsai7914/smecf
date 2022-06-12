// 共用 js
// 節流器
function throttle(func, timeout = 250) {
    console.log("throttle")
    let last;
    let timer;
   
    return function () {
      const context = this;
      const args = arguments;
      const now = +new Date();
   
      if (last && now < last + timeout) {
        clearTimeout(timer)
        timer = setTimeout(function () {
          last = now
          func.apply(context, args)
        }, timeout)
      } else {
        last = now
        func.apply(context, args)
      }
    }
}

function debounce(func, delay=250) {
    let timer = null;
   
    return () => {
        let context = this;
        let args = arguments;
    
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(context, args);
        }, delay)
    }
}

// layout
$(function () {
    function openSubNav() {
        $(".burger").toggleClass("-open")
        $(".sub_nav").toggleClass("-open")
        $(".nav_list__item").removeClass("-open")
        $("html").toggleClass("locked")
        $(".overlay").toggleClass("-open")
        $(".sub_nav.nav_list__title").first().trigger("focus")
        // 英文版漢堡選單
        // $(".sub_nav_en").toggleClass("-open")
    }
    function closeSubNav(e) {
        let subNav = $(".sub_nav")
        if (!subNav.is(e.target) && subNav.has(e.target).length === 0 && !$(".burger").is(e.target)) {
            console.log("closeSubNav")
            $(".burger").removeClass("-open")
            $(".sub_nav").removeClass("-open")
            $(".nav_list__item").removeClass("-open")
            $("html").removeClass("locked")
            $(".overlay").removeClass("-open")
            // $(".sub_nav_en").removeClass("-open")
        }

    }

    function closeContact(e) {
        let contact = $(".contact"),
            contactLink = $(".contact_link");
        if (!contact.is(e.target) && contact.has(e.target).length === 0 && !contactLink.is(e.target)) {
            contact.removeClass("-open")
            contactLink.parent().removeClass("-open")
        }
    }

    // 輔導諮詢專線開闔(桌機)
    $(".contact_link").on("click",function() {
        $(this).parent().toggleClass("-open")
    })
    // 輔導諮詢專線開闔(移動裝置)
    $(".contact_trigger").on("click",function() {
        $(this).parent().toggleClass("-open")
    })
    function openSearch(e) {

        $(".search_input").addClass("-open")
        $(".search_input input").focus()      
        $(".overlay").addClass("-open white")  
        $("html").addClass("locked")
    }
    function closeSearch(e) {
        let searchBox =  $(".search_input")
        if (!searchBox.is(e.target) && searchBox.has(e.target).length === 0) {
            $(".search_input").removeClass("-open")   
            $(".overlay").removeClass("-open white") 
            $("html").removeClass("locked")
        } else if ($(".close_search").is(e.target) || $(".close_search").has(e.target).length !== 0 ) {
            $(".search_input").removeClass("-open")   
            $(".overlay").removeClass("-open white") 
            $(".search_link").focus(); 
            $("html").removeClass("locked")
        }
    }

    //搜尋     
    $(".search_link").on("click",function() {
        openSearch()
    })

    // 漢堡選單
    $(".hamburger").on("click", function(e) {
        // openSubNav(e)
        $(".burger").toggleClass("-open")
        $(".sub_nav").toggleClass("-open")
        $("html").toggleClass("locked")
        $(".overlay").toggleClass("-open")
        $(".nav_list__item").removeClass("-open")
        $(".sub_nav.nav_list__title").first().trigger("focus")

    })
    
    $(".close_search").on("click", function(e) {
        closeSearch(e)
    })
    $(".contact_trigger").focus(function(e) {    
        closeSubNav(e)
    })
    $(".search").focus(function(e) {    
        closeSubNav(e)
    })

    $(".nav_list__item ").on("click", function() {
        $(this).toggleClass("-open")
    })

    $(".sitemap_btn").on("click", function(e) {
        $(".sitemap_wrapper").toggleClass("-close")
    })

    $(".overlay").on("click", function() {
        $(".-open").removeClass("-open")
        $("html").removeClass("locked")
    })

    $(document).mouseup((e) => {
        closeContact(e)
        // closeSubNav(e)
        // closeSearch(e)
    })

    $(window).on("scroll", throttle(closeContact, 500))
})
