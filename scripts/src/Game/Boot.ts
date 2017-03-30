/**
* Название модуля
*
* @boot
*/

/**
*Класс пуска
*/

class Boot extends Phaser.State {

        /**
		*Предзагрузка изображения полосы загрузки
		*/
		
		preload() {

            this.load.image('preloadBar', 'assets/loader.png');

        }

        create() {
			
			/**
			*Начальные параметры (число курсоров, автопауза при уходе со вкладки)
			*/
			
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;

            this.scale.pageAlignHorizontally = true;
				
			/**
			*Запуск загрузки
			*/
				
            this.game.state.start('Preloader', true, false);

        }

}

export{
	Boot as default,
}