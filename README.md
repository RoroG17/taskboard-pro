# TaskboardPro

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.13.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Notions clés utilisées dans ce projet

- **Concepts Angular utilisés**
  - **Services** pour gérer les données métier (liste de tâches) et encapsuler la logique.
  - **Observables / BehaviorSubject** pour exposer un flux de données réactif au composant.
  - **Templates déclaratifs** avec les nouveaux contrôles de flux `@if` / `@for` et le pipe `| async`.

- **Ce que fait `BehaviorSubject`**
  - C’est un type d’`Observable` qui stocke la dernière valeur émise.
  - Il permet de pousser de nouvelles valeurs et de notifier automatiquement tous les composants.

- **Ce que fait le pipe `| async`**
  - Il récupère la dernière valeur émise et la rend dans la vue, en déclenchant la détection de changement.
  - Il gère la destruction d'un composant, évitant des fuites de mémoire.

- **Flux `service → composant → template`**
  - Le **service** contient les données et la logique
  - Le **composant** injecte le service, expose un `Observable` ou un signal au template.
  - Le **template** consomme ces données avec et s’actualise automatiquement quand le service émet une nouvelle valeur.

## Séquence 3 — Lazy Loading & Composants dynamiques

**Lazy Loading**

Le Lazy Loading permet de charger les modules Angular uniquement lorsqu’ils sont nécessaires. Cela réduit le poids initial de l’application et améliore les performances. Dans Angular, on utilise loadChildren dans les routes pour charger un module au moment où l’utilisateur navigue vers une fonctionnalité.

**Structure d’une app avec features**

Il est conseillé d’organiser l’application par dossiers de fonctionnalités dans features/. Chaque feature contient ses composants, services, modules et fichiers liés. Cette organisation rend le projet plus modulaire, lisible et facile à maintenir.

**Composants dynamiques**

Un composant dynamique est un composant Angular créé et injecté dans la vue à la volée, sans être présent directement dans le template. Cela est utile pour les modals, cartes mises en avant, notifications, etc. Il permet de créer des composants uniquement quand c’est nécessaire.
