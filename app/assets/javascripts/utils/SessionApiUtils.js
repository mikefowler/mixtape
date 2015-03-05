import xhr from './xhr';

export default {
  requestLogin() {
    console.log('SessionApiUtils::requestLogin');
    return new Promise((resolve, reject) => {

      let popup = window.open(
        '/auth/login',
        'Login with Spotify',
        'status=0,toolbar=0,location=0,menubar=0,width=400,height=400'
      );

      let callback = function(data) {
        if (popup) popup.close();
        window.setAuthenticationData = null;
        delete window.setAuthenticationData;
        resolve(data);
      }.bind(this);

      window.setAuthenticationData = function(data) {
        callback(data);
      }.bind(this);

    });
  }
};
