function About({lang}) {
    return(
        <div>
            <h1>{lang === 'en' ? 'About Me' : 'Hakkımda'}</h1>
            <p>
                {lang == 'en' ? 'İngilizce - Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui molestias reprehenderit inventore doloremque iste voluptas earum assumenda mollitia laborum id maxime eaque corrupti fugit harum, veniam, aliquid hic. Voluptas odit maxime nemo delectus eius assumenda illum dolores odio sapiente deleniti adipisci labore iste impedit quibusdam, culpa magnam nulla, provident at.': 'Türkçe - Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum nesciunt quam ducimus obcaecati exercitationem sequi incidunt sapiente architecto, unde voluptatibus facere voluptates atque rerum, repudiandae, in officiis! Consectetur, itaque pariatur soluta iure distinctio suscipit rerum. Delectus, labore ullam. Amet, pariatur. Dicta velit rerum nemo doloribus amet, voluptas illo itaque ab'}
            </p>
        </div>
    );
}


export default About;