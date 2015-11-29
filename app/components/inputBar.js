import React, { PropTypes } from 'react';
import { Decorator as State } from 'cerebral-react';
import Form from 'material-components/lib/components/form';
import Input from 'material-components/lib/components/input';
import Divider from 'material-components/lib/components/divider';
import driver from 'ui-driver';
import styles from './inputBar.css';

const formDriver = driver.createForm('chat');

@State(formDriver.props())
export default class InputBar extends React.Component {

  static propTypes = {
    signals: PropTypes.object
  };

  render() {
    const {
      signals
    } = this.props;
    const bindings = formDriver.getBindings(this.props);
    return (
      <Form className={styles.inputBar} onSubmit={() => signals.human.spoke()}>
        <Divider style={{ margin: '0 -16px 4px' }}/>
        <Input {...bindings.inputProps('input', { label: 'Say something' })}/>
      </Form>
    );
  }
}
