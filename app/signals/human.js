import controller from '../controller';
import printComputerText from '../actions/printComputerText';
import printHumanText from '../actions/printHumanText';
import processHumanText from '../actions/processHumanText';
import { resetFormDriver } from 'ui-driver/actions';
import when from 'cerebral-addons/when';
import stateToOutput from 'cerebral-addons/stateToOutput';
import set from 'cerebral-addons/set';

const whenHuman = when(['chat', 'input'], { saidNothing: '', saidSomething: when.otherwise });
const getHumanText = stateToOutput(['chat', 'input'], 'text');
const clearHumanText = set(['chat', 'input'], '');

controller.signal('human.spoke', [
  whenHuman, {
    saidSomething: [
      getHumanText,
      clearHumanText,
      printHumanText,
      processHumanText,
      printComputerText
    ],
    saidNothing: []
  },
  resetFormDriver('chat')
]);
