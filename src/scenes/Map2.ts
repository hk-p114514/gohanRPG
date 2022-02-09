import { MapTpl } from './Map.tpl';
import map2Json from '@/json/map002.json';

export class Map2 extends MapTpl {
  constructor() {
    super('map2', map2Json);
  }
}
