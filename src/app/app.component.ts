import { Component, effect, OnInit } from '@angular/core';
import { CoreFacadeService } from './facades/core-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  isLoading = false;

  constructor(private _coreFacade: CoreFacadeService) {
    effect(() => {
      this.isLoading = this._coreFacade.loadingState;
    });
  }

  ngOnInit() {
    this.createShootingStars();
  }

  createShootingStars() {
    setInterval(() => {
      const star = document.createElement('div');
      star.className = 'shooting-star';

      // Posición inicial aleatoria
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;

      // Dirección y ángulo aleatorios
      const angle = Math.random() * 60 - 30; // -30 a 30 grados
      const distance = 200 + Math.random() * 100; // 200-300px

      const keyframes = [
        { transform: 'translateX(0) translateY(0) rotate(0deg)', opacity: 1 },
        {
          transform: `translateX(${
            distance * Math.cos((angle * Math.PI) / 180)
          }px) translateY(${
            distance * Math.sin((angle * Math.PI) / 180)
          }px) rotate(${angle}deg)`,
          opacity: 0,
        },
      ];

      const animation = star.animate(keyframes, {
        duration: 1000 + Math.random() * 500, // 1000-1500ms
        easing: 'ease-out',
        iterations: 1,
      });

      document.body.appendChild(star);

      animation.onfinish = () => star.remove();
    }, Math.random() * 3000 + 2000); // Una estrella fugaz cada 2-5 segundos
  }
}
