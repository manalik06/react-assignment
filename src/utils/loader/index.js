import React from 'react';
import Loader from 'react-loader-spinner'
import "../../appCss/loader.scss"
class AppLoader extends React.Component {

  render() {
    const { loader } = this.props
    let containerClasses = "app-loader " + (loader ? "app-loader--visible" : "app-loader--hidden");
    return (
      <div
        className={containerClasses}
      >
        <div className="app-loader__overlay" />
        <div className="loader loader--style1">
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={100}
            width={100}
            // timeout={} //3 secs
            visible={loader}

          />
        </div>

      </div>
    )
  }
}
export default AppLoader
