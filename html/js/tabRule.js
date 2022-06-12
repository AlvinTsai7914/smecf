function tabRule(sectionClass) {
    // 觸控和滑鼠操作
    $(`.${sectionClass} .tab_list__link`).on("click", function (e) {
        e.preventDefault();
        let _tab_key = 9,
            targetId = $(this).attr("href");
        $(`.${sectionClass} .tab_list__link.active`).removeClass("active");
        $(this).addClass("active");
        $(`.${sectionClass} .tab-pane.active`).removeClass("show active");
        $(`.${sectionClass} ${targetId}`).addClass("show active");
        // $(`.${sectionClass} ${targetId} .slick-prev`).focus()
        changeTabListMaxHeight(sectionClass, targetId)
    });

    // 無障礙操作
    // ==================== 執行計畫 slider 頁籤 ====================
    if ($(`.${sectionClass} .slider`).length !== 0) {
        // console.log(`${sectionClass} tab init`)
        $(`.${sectionClass} .tab_list__link`).on("keydown", function (e) {
            // console.log("123")
            let _tab_key = 9,
                currentId = $(this).attr("href"),
                prevId = $(this).parent().prev("li").children("a").attr("href"),
                $prevTab = $(this).parent().prev("li").children("a");
    
            if (e.which === _tab_key && !e.shiftKey) {// 如果只按下tab 沒有按下shift
                e.preventDefault();
                $(`.${sectionClass} .tab_list__link.active`).removeClass("active"); // 刪除啟動中的頁籤 class
                $(`.${sectionClass} .tab-pane.active`).removeClass("show active"); // 刪除啟動中的內容 class
    
                $(this).addClass("active"); // 當前頁籤啟動
                $(`.${sectionClass} ${currentId}`).addClass("show active"); // 當前頁籤內容啟動
                $(`.${sectionClass} ${currentId} .slick-prev`).focus(); // focus 內容中的 slickprev (可以改成第一個 a 標籤或 button)
            
                
                //$(`.${sectionClass} ${currentId} .slider`).children("button").first().focus()
            } else if (e.which === _tab_key && e.shiftKey && prevId) {// 如果按下tab + shift，且有前一個 tab
                e.preventDefault();
                $(`.${sectionClass} .tab_list__link.active`).removeClass("active"); // 刪除啟動中的頁籤 class
                $(`.${sectionClass} .tab-pane.active`).removeClass("show active"); // 刪除啟動中的內容 class
                $prevTab.addClass("active"); // 前一個頁籤啟動
                $(`.${sectionClass} ${prevId}`).addClass("show active"); // 前一個內容啟動
                $(`.${sectionClass} ${prevId} .slick-next`).focus(); // focus 到最後一個按鈕 (這裡為slick-next)
            }
        });
        $(`.${sectionClass} .slick-prev`).on("keydown", function (e) {
            // console.log(".slick-prev")
            let _tab_key = 9,
                $currentTab = $(`.${sectionClass} .tab_list__link.active`);
    
            if (e.which === _tab_key && e.shiftKey) {
                e.preventDefault();
                $currentTab.focus();
            }
        });
        $(`.${sectionClass} .slick-next`).on("keydown", function (e) {
            // console.log(".slick-next")
            let _tab_key = 9,
                currentId = $(`.${sectionClass} .tab-pane.active`)[0].id,
                $tabNext = $(`.${sectionClass} .tab_list__link.active`).parent().next("li").children("a"),
                nextId = $tabNext.attr("href");
           
            if (e.which === _tab_key && !e.shiftKey && $tabNext.length !== 0) {
                e.preventDefault();
                $tabNext.focus();
            }
        });

    // ==================== 最新消息 list 頁籤 ====================
    } else if ($(`.${sectionClass} .tab-pane ul`).length > 0){
        // 在每個頁籤列表的頭尾加上 class 辨識
        $(`.${sectionClass} .tab-pane ul`).each(function() {
            $this = $(this)
            $this.children("li").first().children("a").addClass("lead")
            $this.children("li").last().children("a").addClass("last")
        })
        if (sectionClass !== 0) {
            changeTabListMaxHeight(sectionClass, $(`.${sectionClass} .tab_list__link.active`).attr("href"))
        }
   

        // 更多消息按鈕
        $(`.${sectionClass} .more_news`).on("keydown", function (e) {
            let _tab_key = 9
            if (e.which === _tab_key && !e.shiftKey) { 
                e.preventDefault(); 
                console.log($(`.${sectionClass} .tab_list__item `).first())
                $(`.${sectionClass} .tab_list__item `).first().children("a").focus()
            }
            changeTabListMaxHeight(sectionClass, currentId)
        })
        // ========== 頁籤按鈕 ==========
        $(`.${sectionClass} .tab_list__link`).on("keydown", function (e) {
            let _tab_key = 9,
                currentId = $(this).attr("href"),
                prevId = $(this).parent().prev("li").children("a").attr("href"),
                $prevTab = $(this).parent().prev("li").children("a");
            // ------ 如果只按下tab 沒有按下shift ------
            if (e.which === _tab_key && !e.shiftKey) {
                console.log(".tab_list__link tab")
                e.preventDefault();
                $(`.${sectionClass} .tab_list__link.active`).removeClass("active"); // 刪除啟動中的頁籤 class
                $(`.${sectionClass} .tab-pane.active`).removeClass("show active"); // 刪除啟動中的內容 class
    
                $(this).addClass("active"); // 當前頁籤啟動
                $(`.${sectionClass} ${currentId}`).addClass("show active"); // 當前頁籤內容啟動
                $(`.${sectionClass} ${currentId} ul li`).first().children("a").focus();
                changeTabListMaxHeight(sectionClass, currentId)
            // ------ 如果按下tab + shift，且有前一個 tab ------
            } else if (e.which === _tab_key && e.shiftKey && prevId) {
                console.log(".tab_list__link shift tab")
                e.preventDefault();
                $(`.${sectionClass} .tab_list__link.active`).removeClass("active"); // 刪除啟動中的頁籤 class
                $(`.${sectionClass} .tab-pane.active`).removeClass("show active"); // 刪除啟動中的內容 class
                $prevTab.addClass("active"); // 前一個頁籤啟動
                $(`.${sectionClass} ${prevId}`).addClass("show active"); // 前一個內容啟動
                $(`.${sectionClass} ${prevId} ul li`).last().children("a").focus(); // focus 到最後一個按鈕 (這裡為slick-next)
                changeTabListMaxHeight(sectionClass, currentId)
            }
        });
        // 列表最後一行
        $(`.${sectionClass} .tab-pane .last`).on("keydown", function(e) {
            let _tab_key = 9,
                $tabNext = $(`.${sectionClass} .tab_list__link.active`).parent().next("li").children("a"),
                $more = $(`.${sectionClass} a.more_news`);

            if (e.which === _tab_key && !e.shiftKey && $tabNext.length !== 0) {
                console.log(".last tab")
                e.preventDefault();
                $tabNext.focus();
            }
        })
         // 列表第一個行
        $(`.${sectionClass} .tab-pane .lead`).on("keydown", function(e) {
            let _tab_key = 9,
                $currentTab = $(`.${sectionClass} .tab_list__link.active`);
    
            if (e.which === _tab_key && e.shiftKey) {
                console.log(".lead tab")
                e.preventDefault();
                $currentTab.focus();
            }
        })

    }
}

function changeTabListMaxHeight(sectionClass, currentId) {
    let sectionHeight 
    if (sectionClass === "news") {
        sectionHeight = $(`.${sectionClass} ${currentId}`).height() + 140;
        $(`.${sectionClass} .tab_list`).css("max-height",`${sectionHeight}px`)
    }
    

}


// // 觸控和滑鼠操作
// $(".plan .tab_list__link").on("click", function (e) {
//     e.preventDefault();
//     let _tab_key = 9,
//         targetId = $(this).attr("href");
//     $(".plan .tab_list__link.active").removeClass("active");
//     $(this).addClass("active");
//     $(`.plan .tab-pane.active`).removeClass("show active");
//     $(`.plan ${targetId}`).addClass("show active");
//     // $(`.plan ${targetId} .slick-prev`).focus()
// });
// // 無障礙操作
// // 在頁籤上按下tab
// $(".plan .tab_list__link").on("keydown", function (e) {
//     let _tab_key = 9,
//         currentId = $(this).attr("href"),
//         prevId = $(this).parent().prev("li").children("a").attr("href"),
//         $prevTab = $(this).parent().prev("li").children("a");

//     if (e.which === _tab_key && !e.shiftKey) {// 如果只按下tab 沒有按下shift
//         e.preventDefault();
//         $(".plan .tab_list__link.active").removeClass("active"); // 刪除啟動中的頁籤 class
//         $(`.plan .tab-pane.active`).removeClass("show active"); // 刪除啟動中的內容 class

//         $(this).addClass("active"); // 當前頁籤啟動
//         $(`.plan ${currentId}`).addClass("show active"); // 當前頁籤內容啟動
//         $(`.plan ${currentId} .slick-prev`).focus(); // focus 內容中的 slickprev (可以改成第一個 a 標籤或 button)
//         //$(`.plan ${currentId} .slider`).children("button").first().focus()
//     } else if (e.which === _tab_key && e.shiftKey && prevId) {// 如果按下tab + shift，且有前一個 tab
//         e.preventDefault();
//         $(`.plan .tab_list__link.active`).removeClass("active"); // 刪除啟動中的頁籤 class
//         $(`.plan .tab-pane.active`).removeClass("show active"); // 刪除啟動中的內容 class
//         $prevTab.addClass("active"); // 前一個頁籤啟動
//         $(`.plan ${prevId}`).addClass("show active"); // 前一個內容啟動
//         $(`.plan ${prevId} .slick-next`).focus(); // focus 到最後一個按鈕 (這裡為slick-next)
//     }
// });
// $(".plan .slick-prev").on("keydown", function (e) {
//     let _tab_key = 9,
//         $currentTab = $(".plan .tab_list__link.active");

//     if (e.which === _tab_key && e.shiftKey) {
//         e.preventDefault();
//         $currentTab.focus();
//     }
// });
// $(".plan .slick-next").on("keydown", function (e) {
//     let _tab_key = 9,
//         currentId = $(".plan .tab-pane.active")[0].id,
//         $tabNext = $(`.plan .tab_list__link.active`).parent().next("li").children("a"),
//         nextId = $tabNext.attr("href");

//     if (e.which === _tab_key && !e.shiftKey) {
//         e.preventDefault();
//         $tabNext.focus();
//     }
// });
