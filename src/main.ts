import xs, {Stream, Listener} from 'xstream';
import {ReactElement} from 'react';
import {ScreenSource} from '@cycle/native-screen';
import {StateSource, Reducer} from 'cycle-onionify';
import view from './view';
import {publicTab} from './public-tab/index';

export type Sources = {
  screen: ScreenSource;
  onion: StateSource<any>;
  ssb: Stream<any>;
};

export type Sinks = {
  screen: Stream<ReactElement<any>>;
  onion: Stream<Reducer<any>>;
  statusBarAndroid: Stream<string>;
};

export function main(sources: Sources): Sinks {
  const publicTabSinks = publicTab(sources);
  const {vdom$, statusBar$} = view(publicTabSinks.screen);
  const reducer$ = xs.empty();

  return {
    screen: vdom$,
    onion: reducer$,
    statusBarAndroid: statusBar$
  };
}
