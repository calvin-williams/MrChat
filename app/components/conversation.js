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

  componentDidUpdate({ conversation }) {
    if (conversation !== this.props.conversation) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }

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
              <span className={styles.said}>{
                Array.isArray(they.said)
                  ? they.said.map((said, i) => <span key={i}>{said}<br/></span>)
                  : they.said
              }{they.url ? (
                <iframe className={styles.iframe} src={they.url}/>
              ) : null}</span>
            </div>
          );
        })}
      </div>
    );
  }
}
