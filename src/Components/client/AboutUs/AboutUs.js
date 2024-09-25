import "./AboutUs.scss";

import video from "../../../Assets/video.mp4";

export default function AboutUs() {
  return (
    <section className="about section">
      <div className="about__container">
        <h2 className="about__container-title">Why F-salon?</h2>
        <div className="mainContent container grid">
          <div className="about__single">
            <img
              src="https://icon-library.com/images/shop-icon-png/shop-icon-png-6.jpg"
              alt="Icon Branch"
            />
            <h3>50+ Branch</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusamus facilis illum aut, dolores distinctio amet blanditiis
              non, quae perferendis eaque consectetur inventore dolorum rem
              maxime dolorem temporibus officia. Ab, modi!
            </p>
          </div>
          <div className="about__single">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4661/4661125.png"
              alt="Icon Stylist"
            />
            <h3>400+ Stylist</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusamus facilis illum aut, dolores distinctio amet blanditiis
              non, quae perferendis eaque consectetur inventore dolorum rem
              maxime dolorem temporibus officia. Ab, modi!
            </p>
          </div>
          <div className="about__single">
            <img
              src="https://cdn-icons-png.flaticon.com/512/10215/10215938.png"
              alt="Icon Customer"
            />
            <h3>2000+ Customer</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusamus facilis illum aut, dolores distinctio amet blanditiis
              non, quae perferendis eaque consectetur inventore dolorum rem
              maxime dolorem temporibus officia. Ab, modi!
            </p>
          </div>
        </div>

        <div className="about__video container">
          <div className="about__videoCard grid">
            <div className="about__cardText">
              <h2>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Eligendi totam tenetur, deleniti dolorum facilis porro, cum
                voluptas consequuntur optio iure quia ut tempora.
              </p>
            </div>
            <div className="about__cardVideo">
              <video src={video} autoPlay loop muted type="video/mp4"></video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
