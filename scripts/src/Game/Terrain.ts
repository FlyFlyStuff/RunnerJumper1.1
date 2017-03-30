/**
* Название модуля
*
* @terrain
*/


/**
*класс поверхности
*/
class Terrain extends Phaser.Sprite {

        result: Phaser.Group;
		
		/**
		*Конструктор
		*создает группн result, где содержаться все активно существующие тайлы
		*создает стартовое состояние экрана, полностью покрывая его поверхностью
		*запускает цикл процедурно создающий куски поля
		*/
        constructor(game: Phaser.Game) {
            super(game, 300, 300,'tiles');

            this.result = this.game.add.group();
            this.addChunkOfTiles(18, 4, -20);

            this.game.time.events.loop(480, this.addTerrainProcedural, this); 
        }
		
		/**
		*Создать один тайл
		*
		*@param x кооринаты
		*@param y коориднаты
		*@param i тип тайла (номер в спрайтшите)
		*
		*увеличивает спрайт втрое
		*задает скорость движения по экрану
		*активирует физику
		*задает время существования
		*добавляет тайл в группу result
		*/
        addOneTile(x : number, y : number, i : number) {
            var tile = this.game.add.sprite(x, y, 'tiles', i);
            tile.smoothed = false;
            tile.scale.setTo(3, 3);
            tile.anchor.setTo(0.5, 0.5);

            this.game.physics.enable(tile);

            tile.body.immovable = true;
            tile.body.allowGravity = false;
            tile.body.velocity.x = -200;
            tile.lifespan = 5000;

            this.result.add(tile);
        }

		/**
		*Создать вертикальный ряд тайлов
		*
		*@param x коорината
		*@param h высота ряда
		*
		*заполняет верхнюю и нижнюю позиции специальными тайлами
		*заполянет случайными тайлами содержимое между ними
		*/
        addRowOfTiles(x : number, h : number) {
            var ytemp = this.game.height - 24;

            this.addOneTile(x, ytemp, 6);

            var i;
            for (i = 1; i < h; i++) {
                this.addOneTile(x, ytemp - i * 48, this.randomTile());
            }
            this.addOneTile(x, ytemp - i * 48, 1);
        }

		/**
		*Создать участок тайлов
		*
		*@param len длина участка
		*@param lev высота участка
		*@param x кооринаты
		*
		*создает  нужное число рядов тайлов
		*/
        addChunkOfTiles(len : number, lev : number, x : number) {
            for (var i = 1; i <= len; i++) {
                this.addRowOfTiles(x + i * 48, lev);
            }
        }

		/**
		*Создать террейн
		*
		*задает значения len и lev для участка тайлов
		*/
        addTerrainProcedural() {
            if (Math.random() < 0.075) return;

            var len = 2;
            var lev = Math.floor(Math.random() * 4) + 1;

            this.addChunkOfTiles(len, lev, this.game.width);
        }

		/**
		*Выбрать случайный тайл для пространства между
		*
		*выбирает случайный тайл, приоритезируя пустые тайлы над детализированными 
		*/
        randomTile() {
            if (Math.random() > 0.7) {
                return Math.floor(Math.random() * 4) + 2;
            }
            if (Math.random() > 0.6) {
                return 2;
            }
            return 0;
        }
    }

export{
	Terrain as default,
}