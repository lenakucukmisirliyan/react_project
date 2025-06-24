import { FormattedMessage } from "react-intl";

function About() {
    return(
        <div>
            <h2><FormattedMessage id="about.title" /></h2>
            <p>
                {'İngilizce - Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui molestias reprehenderit inventore doloremque iste voluptas earum assumenda mollitia laborum id maxime eaque corrupti fugit harum, veniam, aliquid hic. Voluptas odit maxime nemo delectus eius assumenda illum dolores odio sapiente deleniti adipisci labore iste impedit quibusdam, culpa magnam nulla, provident at.'}
            </p>
        </div>
    );
}


export default About;