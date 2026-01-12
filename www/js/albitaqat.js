import loadJson from './modules/loadJson.js';
import filterSpan from './modules/filterSpan.js';
import error_handling from './modules/error_handling.js';

export default async () => {


    if (window.location.pathname.endsWith('/pages/albitaqat.html')) {

        try {

            let loading = document.getElementById('loading');
            loading.style.display = "block";
            let albitaqatJson = await loadJson("/data/albitaqat.json");
            let quranJson = await loadJson("/data/quran.json");
            let back = document.getElementById('back');
            let more_header_title = document.getElementById('more_header_title');
            let albitaqat_part1 = document.getElementById("albitaqat_part1");
            let albitaqat_part2 = document.getElementById("albitaqat_part2");
            let albitaqat_index = document.getElementById("albitaqat_index");
            let albitaqat_data = document.getElementById("albitaqat_data");
            let albitaqat_audio = document.getElementById("albitaqat_audio");

            back.addEventListener("click", e => {
                if (albitaqat_part2.style.display === "block") {
                    albitaqat_part1.style.display = "block";
                    albitaqat_part2.style.display = "none";
                    more_header_title.innerText = "بطاقات القرآن";
                    albitaqat_audio.pause();
                    albitaqat_audio.src = "";
                    albitaqat_data.innerHTML = "";
                    window.scrollTo(0, 0);
                } else {
                    window.location.href = "/more.html";
                }
            });

            for (let item of albitaqatJson) {

                let li = document.createElement("li");
                let h3 = document.createElement("h3");
                let p = document.createElement("p");

                albitaqat_index.appendChild(li);
                li.id = `albitaqat_index_li_id_${item?.id}`;
                li.className = "albitaqat_index_li";
                li.appendChild(h3);
                h3.innerText = item?.surah;
                li.appendChild(p);
                p.innerText = quranJson?.[item?.id - 1]?.descent;
            }

            let albitaqat_index_li = document.getElementsByClassName("albitaqat_index_li");

            for (let item of Array.from(albitaqat_index_li)) {

                let surah = document.getElementById(item.id);

                surah.addEventListener("click", e => {

                    window.scrollTo(0, 0);
                    let id = item.id.split("albitaqat_index_li_id_")[1] - 1
                    let currentAlbitaqat = albitaqatJson?.[id]
                    albitaqat_part1.style.display = "none";
                    albitaqat_part2.style.display = "block";
                    more_header_title.innerText = `بطاقة سورة ${currentAlbitaqat?.surah}`;
                    albitaqat_audio.src = currentAlbitaqat?.audio;
                    albitaqat_data.innerHTML = "";

                    const sections = [
                        { title: "أياتها", content: currentAlbitaqat?.ayaatiha },
                        { title: "معني أسمها", content: currentAlbitaqat?.maeni_asamuha },
                        { title: "سبب تسميتها", content: currentAlbitaqat?.sabab_tasmiatiha },
                        { title: "أسماؤها", content: currentAlbitaqat?.asmawuha },
                        { title: "مقصدها العام", content: currentAlbitaqat?.maqsiduha_aleamu },
                        { title: "سبب نزولها", content: currentAlbitaqat?.sabab_nuzuliha },
                        { title: "فضلها", content: currentAlbitaqat?.fadluha?.join("<br><br>") },
                        { title: "مناسباتها", content: currentAlbitaqat?.munasabatiha?.join("<br><br>") }
                    ];

                    sections.forEach(section => {
                        if (section.content) {
                            let li = document.createElement("li");
                            let title = document.createElement("h3");
                            let text = document.createElement("p");
                            li.appendChild(title);
                            title.innerText = section.title;
                            li.appendChild(text);
                            text.innerHTML = filterSpan(section.content);
                            albitaqat_data.appendChild(li);
                        }
                    });
                });

            }

            loading.style.display = "none";

        } catch (error) {

            error_handling(error);
        }

    }

}