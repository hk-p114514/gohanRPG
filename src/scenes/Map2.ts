import { json } from 'index';
import { MapTpl } from './Map.tpl';

export class Map2 extends MapTpl {
  constructor() {
    super(json[1], 'map2');
  }
}
