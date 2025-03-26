import React from 'react';
import './Meditation.css';
import Sidebar from '../Sidebar';

const Meditation = () => {
  const guidedMeditations = [
    { id: 1, title: '1. Mindfulness Meditation', src: 'https://www.youtube.com/embed/6p_yaNFSYao' },
    { id: 2, title: '2. Positive Energy Flow', src: 'https://www.youtube.com/embed/x2wBS6sjpjM' },
    { id: 3, title: '3. OM Meditation', src: 'https://www.youtube.com/embed/-byjrq-I0Go' },
    { id: 4, title: '4. Reduce Overthinking and Stress', src: 'https://www.youtube.com/embed/sfSDQRdIvTc' },
    { id: 5, title: '5. Daily Calm', src: 'https://www.youtube.com/embed/ZToicYcHIOU' },
  ];

  const meditationMusic = [
    { id: 1, title: '1. Relaxing', src: 'https://www.bensound.com/bensound-music/bensound-relaxing.mp3' },
    { id: 2, title: '2. Slow Motion', src: 'https://www.bensound.com/bensound-music/bensound-slowmotion.mp3' },
    { id: 3, title: '3. Calm Waves', src: 'https://www.bensound.com/bensound-music/bensound-meditation.mp3' },
    { id: 4, title: '4. Disha', src: 'https://www.bensound.com/bensound-music/bensound-disha.mp3' },
    { id: 5, title: '5. Serenity', src: 'https://www.bensound.com/bensound-music/bensound-serenity.mp3' },
  ];

  return (
    <div className='meditation-page-wrapper'>
      <Sidebar />
      <div className="meditation-container">
        <h1 className="title">Meditation</h1>
        
        <div className="section">
          <h2>Guided Meditation</h2>
          <div className="media-grid">
            {guidedMeditations.map((video) => (
              <div key={video.id} className="media-item">
                <iframe 
                  width="100%" 
                  height="100" 
                  src={video.src} 
                  title={video.title} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
                </iframe>
                <p>{video.title}</p>
              </div>
            ))}
          </div>
        </div>

        <hr />

        <div className="section">
          <h2>Meditation Music</h2>
          <div className="media-grid">
            {meditationMusic.map((audio) => (
              <div key={audio.id} className="media-item">
                <audio controls>
                  <source src={audio.src} type="audio/mpeg" />
                  Your browser does not support the audio tag.
                </audio>
                <p>{audio.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="button">
          <button className="back-button clickable" onClick={() => window.location.href = '/mentalwellbeing'}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default Meditation;
