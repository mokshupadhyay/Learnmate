import React from 'react';

export const Footer1 = () => {
  const sectionStyle = {
    display: 'flex',
    // flexDirection: 'column',
    padding: '0px',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'inherit',
    fontweight:"900"
  };

  const buttonContainerStyle = {
    marginLeft: '-340px',
  };

  const learnMateImageStyle = {
    position: 'relative',
    bottom: '0',
    left: '0px',
    width: '400px',
    height: '250px',
    maxWidth: '100%', // Ensure the image doesn't exceed its container's width
  };

  return (
    <div>
      <footer className="ud-footer" data-purpose="footer" style={{     background: "#222f3d",
    color: "rgb(255, 255, 255)"
  , padding: '20px' }}>
        <div className="footer-section teach-on-udemy-banner-module--banner--2PHNa" data-testid="teach-on-udemy-banner" style={sectionStyle}>
          <div>
            <div className="ud-heading-lg">Teach the world online</div>
            <div className="ud-text-md teach-on-udemy-banner-module--subtitle--cmn_2">
              Create an online video course, reach students across the globe, and earn money
            </div>
          </div>
          <div className="teach-on-udemy-banner-module--button-container--17xJA" style={buttonContainerStyle}>
            <a href="/teaching/?ref=bai-sub-footer" className="ud-btn ud-btn-large ud-btn-white-outline ud-heading-md">
              <span style={linkStyle}>Teach on LearnMate</span>
            </a>
          </div>
        </div>

        <div className="footer-section ufb-notice-module--notice-row--3xohg" data-testid="ufb-notice" style={sectionStyle}>
          <div className="ud-heading-lg ufb-notice-module--notice--W_Hq6">
            <span>
              Top companies choose{' '}
              <a
                data-purpose="ufb-link"
                className="inverted-link"
                href="/udemy-business/?locale=en_US&amp;path=request-demo-in-mx%2F&amp;ref=footer-ad"
                target="_blank"
                rel="noopener"
                style={linkStyle}
              >
                LearnMate Business
              </a>{' '}
              to build in-demand career skills.
            </span>
          </div>
          <div style={{ marginTop: '20px', position: 'relative', right: '16px',
    // border: "1px solid",
    background: "#878787",
    borderRadius: "135px"}}>
            <img src={require("../Assets/LM1.png")} alt="LearnMate"  width="230" height="auto" loading="lazy" left="0" style={learnMateImageStyle} />
          </div>
        </div>

        <div className="footer-section footer-section-main" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="links-and-language-selector" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <div className="language-selector-container" style={{ marginRight: '-150px', position: 'relative' }}>
              <select className="ud-btn ud-btn-medium ud-btn-secondary ud-text-md language-selector-button-module--button--RSREU" data-testid="language-selector-button" style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '2px solid #fff', backgroundColor: '#333', color: '#fff', cursor: 'pointer', marginLeft: '30px' }}>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="chinese">Chinese</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="russian">Russian</option>
                <option value="hindi">Hindi</option>
                <option value="arabic">Arabic</option>
                <option value="portuguese">Portuguese</option>
                <option value="japanese">Japanese</option>
              </select>
            </div>

            <ul className="ud-unstyled-list link-column">
              <li><a href="/" className="link white-link ud-text-sm" target="_blank" rel="noopener" style={linkStyle}>LearnMate Business</a></li>
              <li><a className="link white-link ud-text-sm" href="/" style={linkStyle}>Teach on LearnMate</a></li>
              
              <li><a className="link white-link ud-text-sm" href="/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Get the app</a></li>
            </ul>

            <ul className="ud-unstyled-list link-column">
              <li><a className="link white-link ud-text-sm" href="/" style={linkStyle}>About us</a></li>
              <li><a className="link white-link ud-text-sm" href="/" style={linkStyle}>Contact us</a></li>
            </ul>

            <ul className="ud-unstyled-list link-column">
              <li><a className="link white-link ud-text-sm" href="/" style={linkStyle}>Careers</a></li>
              <li><a className="link white-link ud-text-sm" href="/" style={linkStyle}>Blog</a></li>
            </ul>
          </div>

          <div className="logo-and-copyright" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '60px', marginLeft: '-300px' }}>
            <div className="logo-container" data-testid="logo-container">
              <a href="/" className="ud-btn ud-btn-large ud-btn-link ud-heading-md" style={linkStyle}>
                <div className="logo">
                  <img className='learnmate' src={require("../Assets/LM1.png")} alt="" />
                  <div className='logoname'>LearnMate</div>
                </div>
              </a>
            </div>
            <div className="copyright-container ud-text-xs" style={{ fontSize: '12px', opacity: '0.8' }}>© 2023 LearnMate, Inc.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};
