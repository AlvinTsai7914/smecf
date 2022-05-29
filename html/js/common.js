// 共用 js
// 節流器
function throttle(func, timeout = 250) {
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


//header開關

  $(function () {
    // 輔導諮詢專線開闔
    $(".contact_trigger").on("click",function() {
        $(this).parent().toggleClass("-open")
    })
    function toggleSubNav() {
        $(".burger").toggleClass("-open")
        $(".sub_nav").toggleClass("-open")
        $(".nav_list__item").removeClass("-open")
        $("html").toggleClass("locked")
        $(".overlay").toggleClass("active")
        $(".sub_nav.nav_list__title").first().trigger("focus")
        // 英文版漢堡選單
        // $(".sub_nav_en").toggleClass("-open")
    }
    function closeSubNav(e) {
        let subNav = $(".sub_nav")
        if (!subNav.is(e.target) && subNav.has(e.target).length === 0 && !$(".burger").is(e.target)) {
            $(".burger").removeClass("-open")
            $(".sub_nav").removeClass("-open")
            $(".nav_list__item").removeClass("-open")
            $("html").removeClass("locked")
            $(".overlay").removeClass("active")
            // $(".sub_nav_en").removeClass("-open")
        }
   
    }

    function closeContact(e) {
        let contact = $(".contact")
        let subNav = $(".sub_nav")
        if (!contact.is(e.target) && contact.has(e.target).length === 0 ) {
            contact.removeClass("-open")
        }
    }

    function openSearch(e) {
        $(".search_input").addClass("-open")
        $(".search_input input").focus()      
        $(".overlay").addClass("active white")  
    }
    function closeSearch(e) {
        $(".search_input").removeClass("-open")   
        $(".overlay").removeClass("active white") 
        $(".search_link").focus(); 
    }


    $(".hamburger").on("click", function(e) {
        toggleSubNav(e)
    })
    
    $(document).mouseup((e) => {
        closeContact(e)
        closeSubNav(e)
    })

    $(".contact_trigger").focus(function(e) {    
        closeSubNav(e)
    })
    $(".search").focus(function(e) {    
        closeSubNav(e)
    })

    $(".search_link").on("click",function() {
        openSearch()
    })
    $(".close_search").on("click", function(e) {
        closeSearch(e)
    })

    
}) 
$(function() {
    $(".nav_list__item ").on("click", function() {
        $(this).toggleClass("-open")
    })

    // 點擊遮罩關閉sub_nav
    $(".overlay").on("click", throttle(closeNav))
    // 瀏覽器視窗變動時關閉sub_nav
    $(window).resize(throttle(closeNav))

})
