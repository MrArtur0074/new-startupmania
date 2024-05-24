import '../pages/ErrorPage.scss'
const ErrorPage = () => {
  return (
    <div id='error_page'>
        <div id="background_container">
            <div className="background">
                <div className='sky'><img src="../src/assets/AuthAssets/sky.svg" alt=""/></div>
                <div className='clouds'>
                    <div className="cloud_container">
                        <img src="../src/assets/AuthAssets/cloud1.svg" alt="" className='cloud1'/>
                        <img src="../src/assets/AuthAssets/cloud2.svg" alt="" className='cloud2'/>
                        <img src="../src/assets/AuthAssets/cloud3.svg" alt="" className='cloud3'/>
                        <img src="../src/assets/AuthAssets/cloud4.svg" alt="" className='cloud4'/>
                    </div>
                </div>
                <div className='nature'><img src="../src/assets/AuthAssets/authbackground.svg" alt=""/></div>
            </div>
        </div>
        <div id="error">
            <div id="error_container">
                <h1 id="error_header">404</h1>
                <p id="error_text">Sorry, no such page found</p>
                <a href="/" id='error_navigate'>Go Back to Home Page</a>
            </div>
        </div>
    </div>
  )
}

export default ErrorPage