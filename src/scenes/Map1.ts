import { MapTpl } from './Map.tpl';
import map1Json from '@/json/map001.json';

export class Map1 extends MapTpl {
  constructor() {
    super('map1', map1Json);
  }
}
