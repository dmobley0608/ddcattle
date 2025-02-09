import ddLogoMetallic from '../assets/ddlogo_metallic.png';
import barnDoor from '../assets/barn_door.jpg';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="row   barn-door-container position-absolute top-0 start-0">
        <div className="barn-door d-flex justify-content-start animate-slide-left">
          <img className="w-50" src={barnDoor} alt="Barn Door" />
          <img className="flip-horizontally w-50" src={barnDoor} alt="Barn Door" />
        </div>
        <div className="barn-door d-flex justify-content-end animate-slide-right">
          <img className='w-50' src={barnDoor} alt="Barn Door" />
          <img className='w-50 flip-horizontally' src={barnDoor} alt="Barn Door" />
        </div>
      </div>
      <div className="content-container animate-fade-in text-center">
        <img src={ddLogoMetallic} alt="DD Logo Metallic" className="center-logo" />
        <h2>Welcome to DD Cattle</h2>
        <p className='fw-bold'>Where the untamed spirit of wild mustangs majestically moves through our pastures. Nestled amidst the rolling hills of Georgia, where the golden sun kisses the dew-covered grass each morning, lies our little farm. </p>
      </div>
    </div>
  );
}

export default Home;
