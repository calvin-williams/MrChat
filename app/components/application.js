import React from 'react';
import Appbar from 'material-components/lib/components/appbar';
import styles from './application.css';
import InputBar from './inputBar';
import Conversation from './conversation';

export default class App extends React.Component {

  static childContextTypes = {
    componentStyle: React.PropTypes.object
  };

  getChildContext() {
    return {
      componentStyle: {
        primaryColor: '#009688',
        primaryFontColor: 'rgba(255, 255, 255, 0.9)',
        secondaryColor: '#009688',
        secondaryFontColor: 'rgba(255, 255, 255, 0.9)',
        errorColor: '#C00',
        successColor: '#090',
        typographyColor: '#212121'
      }
    };
  }

  render() {
    return (
      <div>
        <div className={styles.page}>
          <Appbar fixed>
            <Appbar.Title>Mr Chat</Appbar.Title>
          </Appbar>
          <div className={styles.content}>
            <Conversation/>
          </div>
        </div>
        <InputBar/>
      </div>
    );
  }
}
