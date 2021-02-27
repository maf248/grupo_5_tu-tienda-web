const qs = (text) => document.querySelector(text);
const qsa = (text) => document.querySelectorAll(text);

let sectionToShow = qsa('.showSection')

sectionToShow.forEach( section => {
    section.addEventListener('click', (e) => {
        
        let sectionContainer = qs('.sectionContainer');

        sectionContainer.innerHTML = `

            <section>
                <article class="disenoBlanco-article1">
                    <h2 class="disenoBlanco-article1-tituloPrincipal" style="font-size: 15px;">
                        
                    </h2>
                </article>
                <div class="disenoBlanco-containerArticle2">
                    <article class="disenoBlanco-article2">
                        <h3 class="disenoBlanco-article2-titulo" style="margin: auto; font-size: 12px;">
                            <p>Sección de contenido, se edita luego</p>
                        </h3>
                    </article>
                    <article class="disenoBlanco-article2">
                        <h3 class="disenoBlanco-article2-titulo" style="margin: auto; font-size: 12px;">
                            <p>Sección de contenido, se edita luego</p>
                        </h3>
                    </article>
                    <article class="disenoBlanco-article2">
                        <h3 class="disenoBlanco-article2-titulo" style="margin: auto; font-size: 12px;">
                            <p>Sección de contenido, se edita luego</p>
                        </h3>
                    </article>
                    <article class="disenoBlanco-article2">
                        <h3 class="disenoBlanco-article2-titulo" style="margin: auto; font-size: 12px;">
                            <p>Sección de contenido, se edita luego</p>
                        </h3>
                    </article>
                </div>

                <article class="disenoBlanco-articleImg">
                    <img src="" alt="imagen descriptiva de las características del producto" style="height: 40vh;">

                </article>

            </section>        
        `
    })
})