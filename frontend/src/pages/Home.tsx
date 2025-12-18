import React from 'react';
import styles from './Home.module.css';
import heroImage from '../assets/image1.png'; // Make sure the image is in src/assets

const Home: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section
        className={styles.hero}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${heroImage})`,
        }}
      >
        <div className={styles.heroContent}>
          <h1>
            PREMIUM CAR CARE <br />
            <span>DELIVERED TO YOU</span>
          </h1>
          <p>
            Experience the most efficient and high-quality car wash service, tailored for busy professionals
            and luxury vehicles. We bring showroom-quality results directly to your doorstep.
          </p>
          <div className={styles.heroButtons}>
            <button className={styles.primaryBtn}>Book a Wash</button>
            <button className={styles.secondaryBtn}>View Our Gallery</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
