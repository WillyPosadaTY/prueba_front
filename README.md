# PruebaFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Comentarios de la prueba
Para correr el programa es necesario instalar todas las dependencias y ejecutar el programa con "ng serve"

con respecto a los puntos 1 y 2 se realizaron de manera satifactoria consumiendo la API 'https://recruiting-api.newshore.es/api/flights/2' e inyectando el token por medio de 'injection-token.ts'
Para la parte visual, se trabajó con SCSS y Bootstrap
Para la parte del routing se añadió una pestaña en la parte superior que da mi información
En el punto 3 se realizaron varias funciones, entre ellas una recursiva que me retorna las posibles rutas, sin enbargo tuve problemas para añadirlas recursivamente, me retornaba algunas rutas con pasos demás, por ello se hizo una variable gobal que me selecciona el camino más corto.


para las validaciones se hizo por medio de un formulario reactivo el cual se llama 'searchFlightForm' y en 'home.component.ts' le agrego las restricciones

el punto 4to no se pudo realizar por cuestiones de tiempo y se me cruzó la realización de la prueba con mis labores empresariales

en la parte de home hay un modelo llamado 'response.model.ts' que me convierte lo recibido en la API en un arreglo para poderlo trabajar mejor junto con una interface de flights