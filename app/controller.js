import Controller from 'cerebral';
import Model from 'cerebral-baobab';

export default Controller(Model({
  human: {},
  computer: {
    name: 'MrChat'
  },
  conversation: [
    { speaker: 'computer', said: 'Welcome!' }
  ],
  chat: {
    input: ''
  }
}));
