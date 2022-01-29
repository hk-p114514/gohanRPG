import { Scene, Tilemaps, Game, Cameras } from 'phaser';

// マップの画像とjsonファイルを読み込む
import mapTiles from '@/assets/maps/map001.png';
import mapJson from '../json/map001.json';

class Test2 extends Scene {
  private tileset?: Tilemaps.Tileset;
  private tileMap?: Tilemaps.Tilemap;
  private tileMapLayer?: Phaser.Tilemaps.TilemapLayer;
  private controls?: Cameras.Controls.FixedKeyControl;
  private JsonKey: string = 'mapJson';
  private ImageKey: string = 'mapTiles';

  constructor() {
    super({
      key: 'Test2',
    });
  }

  preload = () => {
    this.load.image(this.ImageKey, mapTiles);
    this.load.tilemapTiledJSON(this.JsonKey, mapJson);
  };

  create = () => {
    this.tileMap = this.make.tilemap({ key: 'map' });
    console.log('json');
    console.log(mapJson);

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    this.tileset = this.tileMap.addTilesetImage(this.ImageKey);

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const building = this.tileMap.createLayer('building', this.tileset, 0, 0);
    const tree = this.tileMap.createLayer('tree', this.tileset, 0, 0);
    const ground = this.tileMap.createLayer('ground', this.tileset, 0, 0);

    this.tileMapLayer = this.tileMap.createLayer('ground', this.tileset, 0, 0);

    // Phaser supports multiple cameras, but you can access the default camera like this:
    const camera = this.cameras.main;

    // Set up the arrows to control the camera
    const cursors = this.input.keyboard.createCursorKeys();

    this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
      camera: camera,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      speed: 0.5,
    });

    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    camera.setBounds(0, 0, this.tileMap.widthInPixels, this.tileMap.heightInPixels);
  };

  update = (delta: number) => {
    this.controls?.update(delta);
  };
}

export { Test2 };
