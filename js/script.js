document.addEventListener('DOMContentLoaded', function () {

    // SIDEBAR NAVIGATION
    const nav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(nav);
    Navigasi();

    function Navigasi() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status != 200) return;

                document.querySelectorAll(".topnav, .sidenav")
                    .forEach(function (data) {
                        data.innerHTML = xhttp.responseText;
                    });

                document.querySelectorAll('.sidenav a, .topnav a')
                    .forEach(function (data) {
                        data.addEventListener('click', function (event) {
                            var sidenav = document.querySelector('.sidenav');
                            M.Sidenav.getInstance(sidenav).close();

                            load = event.target.getAttribute('href').substr(1);
                            loadPage(load);
                        });
                    });
            }
        };
        xhttp.open("GET", 'page/nav.html', true);
        xhttp.send();
    }
    let load = window.location.hash.substr(1);
    if (load == '') load = 'home';
    loadPage(load);

    function loadPage(load) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                var content = document.querySelector(".content");
                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;

                    if (load === "home") {
                        const slid = document.querySelectorAll(".slider")
                        M.Slider.init(slid, {
                            indicators: false,
                            height: 850,
                            interval: 2000
                        })
                    }
                    if (load === "recomended%20gear") {
                        const material = document.querySelectorAll('.materialboxed')
                        M.Materialbox.init(material)
                    }

                } else if (this.status == 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };
        xhttp.open("GET", `page/${load}.html`, true);
        xhttp.send();
    }
});