import { json } from 'index';
import { MapTpl } from './Map.tpl';

export class Map1 extends MapTpl {
  constructor() {
    super(json[0], 'map1');
  }
}
