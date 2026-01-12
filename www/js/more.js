import error_handling from "./modules/error_handling.js";

export default async () => {

    if (window.location.pathname.endsWith('/more.html')) {

        try {

            let more_albitaqat = document.getElementById("more_albitaqat");
            let more_hisnmuslim = document.getElementById("more_hisnmuslim");
            let more_tfs = document.getElementById("more_tfs");
            let more_radio = document.getElementById("more_radio");
            let more_allah = document.getElementById("more_allah");
            let more_settings = document.getElementById("more_settings");
            let more_sabha = document.getElementById("more_sabha");
            let more_questions = document.getElementById("more_questions");
            let more_ramadanTime = document.getElementById("more_ramadanTime");
            let more_duas = document.getElementById("more_duas");


            more_questions.addEventListener("click", e => {

                window.location.href = "/pages/questions.html"
            });

            more_albitaqat.addEventListener("click", e => {

                window.location.href = "/pages/albitaqat.html"
            });

            more_hisnmuslim.addEventListener("click", e => {

                window.location.href = "/pages/hisnmuslim.html"
            });

            more_tfs.addEventListener("click", e => {

                window.location.href = "/pages/tfs.html"
            });

            more_radio.addEventListener("click", e => {

                window.location.href = "/pages/radio.html"
            });

            more_allah.addEventListener("click", e => {

                window.location.href = "/pages/allah.html"
            });

            more_settings.addEventListener("click", e => {

                window.location.href = "/pages/settings.html"
            });

            more_sabha.addEventListener("click", e => {

                window.location.href = "/pages/sabha.html"
            });
            
            more_ramadanTime.addEventListener("click", e => {
                window.location.href = "/pages/ramadanTime.html"
            });

            more_duas.addEventListener("click", e => {
                window.location.href = "/pages/duas.html"
            });


        } catch (error) {

            error_handling(error);

        }
    }

}