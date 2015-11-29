import React, { PropTypes } from 'react';
import { Decorator as State } from 'cerebral-react';
import styles from './conversation.css';

@State({
  conversation: ['conversation'],
  human: ['human'],
  computer: ['computer']
})
export default class App extends React.Component {

  static propTypes = {
    conversation: PropTypes.array,
    human: PropTypes.object,
    computer: PropTypes.object
  };

  render() {
    const {
      conversation,
      human,
      computer
    } = this.props;
    return (
      <div>
        {conversation.map((they, line) => {
          const name = they.speaker === 'human' && human.name
            ? human.name
            : they.speaker === 'computer' && computer.name
              ? computer.name
              : they.speaker;
          return (
            <div key={line} className={styles.line}>
              <span className={styles.name}>{name}</span>
              <span className={styles.said}>{they.said}</span>
            </div>
          );
        })}
      </div>
    );
  }
}
