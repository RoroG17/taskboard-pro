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

## Séquence 4 — Tests Unitaires Angular

        ### 📚 Ce que j'ai appris

        #### 1. Pourquoi tester ?
        - Les tests permettent de vérifier que le code fonctionne comme attendu et de détecter rapidement les régressions lors de modifications futures
        - Sans tests, le risque est d’introduire des bugs silencieux, surtout dans des projets complexes avec plusieurs composants et services
        - Exemple concret : lors de la modification de TaskComponent, j’ai pu m’assurer que saveEdit() mettait bien à jour la tâche existante sans casser le rendu du DOM

        #### 2. Outils utilisés
        - **Jasmine** : Framework de tests unitaires pour écrire des specs claires avec des assertions (expect)
        - **Karma** : Test runner qui exécute les tests dans un navigateur réel pour simuler le comportement de l’application
        - **TestBed** : Fournit un environnement Angular isolé pour tester les composants avec leurs dépendances, modules et templates

        #### 3. Concepts clés maîtrisés
        - **AAA Pattern** : Arrange, Act, Assert
        - **Mocks** : Permettent de simuler des services ou des données pour isoler le test du composant ou de la fonction réelle
        - **Spies** : Permettent de vérifier si une fonction a été appelée, avec quels arguments et combien de fois
        - **Fixture & detectChanges()** : fixture permet d’accéder au DOM du composant, et detectChanges() met à jour le rendu après modification des données ou des inputs

        #### 4. Types de tests pratiqués
        - ✅ Test d'une classe simple (sans Angular)
        - ✅ Test d'un service
        - ✅ Test d'un composant avec TestBed
        - ✅ Test des @Input
        - ✅ Test des @Output
        - ✅ Test du DOM

        #### 5. Erreurs courantes rencontrées
        - Oublier `detectChanges()` : [conséquence]
        - `No provider for...` : [solution]
        - Tests qui dépendent les uns des autres : [solution]

        #### 6. Commandes importantes
        ```bash
        ng test                    # Lancer les tests
        ng test --code-coverage    # Avec rapport de couverture
        ```

        #### 7. Code Coverage atteint
        - Objectif : 70-80%
        - Mon résultat : **XX%** sur TaskBoard Pro

        #### 8. Difficultés rencontrées et solutions
        | Difficulté                     | Solution trouvée                                     |
        |--------------------------------|------------------------------------------------------|
        | No provider for ActivatedRoute | Importer RouterTestingModule pour simuler le routage |
        | Problème avec Zone.js          | Importation du module                                |
        -----------------------------------------------------------------------------------------
        #### 9. Points à approfondir
        - [ ] Tests d'intégration
        - [ ] Tests E2E avec Cypress
        - [ ] Mocking avancé pour HttpClient
        - [ ] Tests de services asynchrones

        ### 🎯 Projet : Tests TaskBoard Pro

        #### Tests implémentés
        - [x] TaskService
        - ✅ `addTask()`
        - ✅ `deleteTask()`
        - ✅ `getTasks()`
        - [x] TaskHighlight Component
        - ✅ Affichage du titre
        - ✅ @Input title
        - ✅ Rendu dans le DOM

        #### Résultats
        - **Tests réussis** : 30 / 30
        - **Code coverage** : 83.19%
        - **Temps d'exécution** : 0.546s secondes

        ### 📚 Ressources consultées
        - [Angular Testing Guide](https://angular.io/guide/testing)
        - [Jasmine Documentation](https://jasmine.github.io/)
        - [Notes de cours - Séquence 4]