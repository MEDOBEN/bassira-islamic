import error_handling from './modules/error_handling.js';
import loadJson from './modules/loadJson.js';

export default async () => {

    if (window.location.pathname.endsWith('/pages/allah.html')) {

        try {

            let allahJson = await loadJson("/data/Names_Of_Allah.json");
            let back = document.getElementById('back');
            let allah_names = document.getElementById('allah_names');
            let Search_allah = document.getElementById('Search_allah');

            back.addEventListener("click", e => {
                window.location.href = "/more.html";
            });

            const renderNames = (data) => {
                allah_names.innerHTML = "";
                for (let item of data) {
                    let li = document.createElement("li");
                    let h3 = document.createElement("h3");
                    let p = document.createElement("p");

                    allah_names.appendChild(li);
                    li.appendChild(h3);
                    h3.innerText = item?.name;
                    li.appendChild(p);
                    p.innerText = item?.text;
                }
            };

            renderNames(allahJson);

            Search_allah.addEventListener("keyup", e => {
                let filter = Search_allah.value.toUpperCase();
                let filteredData = allahJson.filter(item => 
                    item.name.toUpperCase().indexOf(filter) > -1 || 
                    item.text.toUpperCase().indexOf(filter) > -1
                );
                renderNames(filteredData);
            });

        } catch (error) {

            error_handling(error);
        }

    }
}
