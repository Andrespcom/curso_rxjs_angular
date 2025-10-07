import { from } from 'rxjs';
import { filter, reduce } from 'rxjs/operators';

(() => {
  const datos = [1, 2, 'foo', 3, 5, 6, 'bar', 7, 8];

  from(datos)
    .pipe(
      filter<any>(v => !isNaN(v as any)),
      reduce((acc: number, v: any) => acc + Number(v), 0)
    )
    .subscribe(console.log); // La salida debe de ser 32
})();


		