    let code_element = document.querySelector('#code_element');

    let column_limit = 80;

    function http_get(url, success) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                success(xhttp.responseText);
            }
        };
        xhttp.open("GET", url);
        xhttp.send();
    }

    let url = 'https://raw.githubusercontent.com/qrush/unix/master/src/c/c02.c';
    let code = '';
    let shown_chars = 0;

    http_get(url, function(data) {
        code = data;
        shown_chars = 0;
    });


    $(function() {

        if (navigator.userAgent.indexOf('Mac OS X') != -1) {
            $("body").addClass("mac");
        } else {
            $("body").addClass("pc");
        }

        var timer = setInterval(function() {
            pressKey();
        }, .1);

        function pressKey() {
            shown_chars += 1;
            if (shown_chars >= code.length) {
                shown_chars = 0;
            }
            code_element.innerText = code.substring(0, shown_chars);
            hljs.highlightBlock(code_element);
            window.scrollTo(0, document.body.scrollHeight);
        }

        setTimeout(function() {
            clearInterval(timer);
            youHaveBeenHacked();
        }, 15000);

        function youHaveBeenHacked() {
            $('.final').addClass('show');
            $('.msg').addClass('show');
        }
    });