/**
* Название модуля
*
* @mainMenu
*/

/**
*Класс главного меню
*/

class MainMenu extends Phaser.State {

        background: Phaser.Sprite;
        music: Phaser.Sound;
        logo: Phaser.Sprite;
		topScore: number;
		topScoreLabel: Phaser.Text;
		
		init(counterHighest: number) {
			this.topScore = counterHighest;
			if (!counterHighest) this.topScore = 0;
		}
		
        create() {
			/**
			*Установка фона
			*/
			
            this.background = this.add.sprite(0, 0, 'titlepage');
            this.background.alpha = 0;
			
			/**
			*Создание всплывающего логотипа
			*/
            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);
            this.logo.smoothed = false;
            this.logo.scale.setTo(2, 2);
			
			/**
			*Анимация всплывающего лого
			*/
            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.logo).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);
			
			if(this.topScore != 0) {
				this.topScoreLabel = this.game.add.text(225, -100, "Score: " + this.topScore.toString(),
                { font: "50px Courier", family: "Courier New", fill: "#ffffff" });
				this.topScoreLabel.alpha = 0;
				this.add.tween(this.topScoreLabel).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true);
				this.add.tween(this.topScoreLabel).to({ y: 400 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);
			}
			
			/**
			*Покидание меню
			*/
            this.input.onDown.addOnce(this.fadeOut, this);
			var spBar = this.input.keyboard.addKey(
                Phaser.Keyboard.SPACEBAR);
            spBar.onDown.add(this.fadeOut, this);
			
			/**
			*Отбой игровой музыки (а случай если пользователь вернулся обратно в меню)
			*/
            if (this.music) this.music.stop();
			
			/**
			*Запуск музыки меню
			*/
            this.music = this.add.audio('menumusic', 1, true);
            this.music.play();

        }

		/**
		*Покидание меню - растовряет изображение и щапускает игру
		*/
        fadeOut() {

            this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
			if(this.topScore != 0){
				this.add.tween(this.topScoreLabel).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
				this.add.tween(this.topScoreLabel).to({ y: 1000 }, 2000, Phaser.Easing.Linear.None, true);
			}
            var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
			
            tween.onComplete.add(this.startGame, this);

        }
		
		/**
		*Начало игры (менять музыку на игровую здесь, чтобы ты не начиналась при каждом рестарте игры)
		*/
        startGame() {
            this.music.stop();
            this.music = this.add.audio('gamemusic', 1, true);
            this.music.play();
            this.game.state.start('RunnerGame', true, false);

        }

}

export{
	MainMenu as default,
}