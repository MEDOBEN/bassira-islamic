import error_handling from './modules/error_handling.js';
import loadJson from './modules/loadJson.js';
import filterSpan from './modules/filterSpan.js';

export default async () => {

    if (window.location.pathname.endsWith('/pages/duas.html')) {

        try {

            let loading = document.getElementById('loading');
            loading.style.display = "block";
            
            let duasJson = await loadJson("/data/duas.json");
            let back = document.getElementById('back');
            let more_header_title = document.getElementById('more_header_title');
            let Search_duas = document.getElementById('Search_duas');
            let duas_tbody = document.getElementById('duas_tbody');
            let alert_div = document.getElementById('alert');
            let duas_part1 = document.getElementById('duas_part1');
            let duas_part2 = document.getElementById('duas_part2');
            let duas_ul_category = document.getElementById("duas_ul_category");

            back.addEventListener("click", e => {
                window.location.href = "/more.html";
            });

            const categories = Object.keys(duasJson);

            for (let key of categories) {
                let item = duasJson[key];
                let tr = document.createElement("tr");
                let td_number = document.createElement("td");
                let td_category = document.createElement("td");
                let category = document.createElement("p");
                
                duas_tbody.appendChild(tr);
                tr.appendChild(td_number);
                td_number.innerText = item?.id;
                tr.appendChild(td_category);
                td_category.appendChild(category);
                category.innerText = item?.category;
                category.className = "hisnmuslim_category";
                category.id = `dua_category_id_${item?.id}`;

                category.addEventListener("click", e => {
                    window.scrollTo(0, 0);
                    duas_part1.style.display = "none";
                    duas_part2.style.display = "block";
                    more_header_title.innerText = item?.category;
                    duas_ul_category.innerHTML = ""; // مسح المحتوى السابق

                    back.onclick = null; // إزالة الحدث القديم
                    back.addEventListener("click", e => {
                        window.location.href = "/pages/duas.html";
                    }, { once: true });

                    for (let iterator of item?.array) {
                        let li = document.createElement("li");
                        let dua_text = document.createElement("h3");
                        let dua_description = document.createElement("p");
                        let dua_source = document.createElement("span");
                        let actions_div = document.createElement("div");
                        let copy_btn = document.createElement("button");

                        duas_ul_category.appendChild(li);
                        
                        dua_text.className = "hisnmuslim_ul_text";
                        dua_text.innerHTML = filterSpan(iterator?.dua);
                        li.appendChild(dua_text);

                        if (iterator?.description) {
                            dua_description.className = "hisnmuslim_ul_tkrar";
                            dua_description.innerText = iterator?.description;
                            li.appendChild(dua_description);
                        }

                        if (iterator?.source) {
                            dua_source.className = "hisnmuslim_ul_count";
                            dua_source.innerText = `المصدر: ${iterator?.source}`;
                            li.appendChild(dua_source);
                        }

                        // إضافة حاوية الأزرار
                        actions_div.className = "duas_actions";
                        li.appendChild(actions_div);

                        // إضافة زر النسخ المطور
                        copy_btn.innerHTML = `<i class="ph ph-copy"></i> نسخ الدعاء`;
                        copy_btn.className = "duas_btn";
                        
                        copy_btn.addEventListener("click", () => {
                            let textToCopy = `${iterator?.dua}\n${iterator?.description ? iterator.description : ''}\nالمصدر: ${iterator?.source}`;
                            if (window.cordova && cordova.plugins && cordova.plugins.clipboard) {
                                cordova.plugins.clipboard.copy(textToCopy);
                            } else {
                                navigator.clipboard.writeText(textToCopy);
                            }
                            
                            alert_div.style.display = "block";
                            setTimeout(() => {
                                alert_div.style.display = 'none';
                            }, 1000);
                        });
                        actions_div.appendChild(copy_btn);
                    }
                });
            }

            // البحث
            Search_duas.addEventListener("keyup", e => {
                let filter = Search_duas.value.toUpperCase();
                let trs = duas_tbody.getElementsByTagName("tr");

                for (let i = 0; i < trs.length; i++) {
                    let td = trs[i].getElementsByTagName("td")[1];
                    if (td) {
                        let txtValue = td.textContent || td.innerText;
                        if (txtValue.toUpperCase().indexOf(filter) > -1) {
                            trs[i].style.display = "";
                        } else {
                            trs[i].style.display = "none";
                        }
                    }
                }
            });

            loading.style.display = "none";

        } catch (error) {
            error_handling(error);
        }
    }
}