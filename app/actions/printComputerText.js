export default function printComputerText(input, state) {

  state.push('conversation', { speaker: 'computer', said: input.computerText });

}
