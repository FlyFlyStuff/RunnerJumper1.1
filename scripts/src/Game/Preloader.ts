/**
* Название модуля
*
* @Preloader
*/

/**
*Класс состояния загрузки
*/
class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;

        preload() {

            /**
			*установка спрайта полосы загрузки
			*/
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);

            /**
			*Загрузка ассетов:
			*
			*Спрайты
			*Спрайтшиты
			*Звуковые файлы
			*/
            this.load.image('logo', 'assets/logo.png');
            this.load.image('titlepage', 'assets/titlepage.png');
            this.load.image('background', 'assets/Background.png');

            this.load.spritesheet('runner', 'assets/runner.png', 14, 16, 6);
            this.load.spritesheet('tiles', 'assets/EarthTiles.png', 16, 16, 7);

            this.load.audio('gamemusic', 'assets/CyborgNinja.mp3', true);
            this.load.audio('menumusic', 'assets/DailyBeetle.mp3', true);
            this.load.audio('jump', 'assets/jump.wav');
            this.load.audio('error', 'assets/error.wav');
        }

        create() {
			/**
			*Анимация полосы загрузки
			*/
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);

        }

        startMainMenu() {

            this.game.state.start('MainMenu', true, false);

        }

}

export{
	Preloader as default,
}