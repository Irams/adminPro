import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { filter, map, retry, take } from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() { 
    // this.retornaObservable().pipe(
    //   retry(1)
    // )
    // .subscribe({
    //   next: valor => console.log('Subs:', valor), 
    //   error: error => console.warn('Error', error),
    //   complete: () => console.info('Observable terminado') 
    // });

    this.intervalSubs = this.retornaIntevalo().subscribe(console.log);
    
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntevalo(): Observable<number> {
    return interval(100)
        .pipe(
          take(10),
          map( valor => valor + 1 ),
          filter( valor => ( valor%2 === 0 ) ? true : false ),
        )
  }

  retornaObservable():Observable<number>{
    let i=-1;
    return new Observable<number>( observer =>{
      const intervalo = setInterval( ()=>{
        i++
        observer.next(i);

        if( i === 4 ){
          clearInterval(intervalo);
          observer.complete();
        }

        if( i === 2 ){
          console.log('i llegó a 2');
          observer.error('i llegó a 2');
          // clearInterval(intervalo);
        }
      }, 1000)
    });
  }
}
