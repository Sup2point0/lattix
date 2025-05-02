import { writable } from "svelte/store";


export class Prefs
{
  show: ShowPrefs = new ShowPrefs();
}

class ShowPrefs
{
  outer = $state(true);
  add = $state(false);
}

export const prefs = writable(new Prefs());
