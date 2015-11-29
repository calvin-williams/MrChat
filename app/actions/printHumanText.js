export default function printHumanText(input, state) {

  state.push('conversation', { speaker: 'human', said: input.humanText });

}
