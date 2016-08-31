// ==UserScript==
// @name        愛稀飯自動投蕉
// @namespace   aixifan
// @description 自動投5蕉（目前只寫了視頻部分，文章還沒寫）
// @include     http://www.acfun.tv/v/ac*
// @include     https://www.acfun.tv/v/ac*
// @include     http://www.aixifan.com/v/ac*
// @include     https://www.aixifan.com/v/ac*
// @version     1
// @grant       none
// @run-at      document-end
// ==/UserScript==

(function () {
    function test_test() {
        if (user.uid == -1) {
            setTimeout(function () {
                test_test()
            }, 100);
        } else {
            console.log("腳本運行開始( ・_ゝ・)！~");
            $.post("/banana/throwBanana.aspx", {
                contentId: $("#block-data-view").attr("data-aid"),
                count: '5',
                userId: user.uid
            }).done(function (t) {
                var r;
                t.success ? r = "success::成功投食了5根香蕉。" : r = "warning::投食操作失败";
                $.info(r);
                console.log("腳本運行成功(ノﾟ∀ﾟ)ノ！~");
                $$("#btn-banana-toolbar").addClass("active").find("p").text("已投食");
            });
            console.log("腳本運行結束(`ヮ´ )！~");
        }
    }

    function chk_sys() {
        if (system.post != undefined) {
            if (system.post.isUped != undefined && system.post.isThrowed != undefined) {
                if (system.post.isThrowed == 1) {
                    $.info("這個視頻投過蕉啦肥肥(*´ω`*)！~");
                    return;
                } else {
                    test_test();
                }
            } else if (system.post.isThrowed == undefined && system.post.isUped != undefined) {
                test_test();
            }
            else {
                setTimeout(function () {
                    chk_sys();
                }, 100);
            }
        } else {
            setTimeout(function () {
                chk_sys();
            }, 100);
        }
    }
    chk_sys();
}());