import { observable, action } from 'mobx';

export const appState = observable({
  timer: 0
});

appState.resetTimer = action(function reset() {
  appState.timer = 0;
});

appState.addTime = action(function tick() {
  appState.timer += 1;
});

