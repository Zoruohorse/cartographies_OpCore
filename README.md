# Cartographie des acteurs d’Opcore

Version construite à partir du code Fouju fourni, avec le corpus Opcore fourni.

## Déposer sur GitHub

1. Décompresser `Opcore_GitHub.zip`.
2. Déposer **tout le contenu extrait à la racine du dépôt** `cartographies_OpCore`, en remplaçant les fichiers de même chemin. Ne pas déposer uniquement l’archive ZIP.
3. Pour une publication GitHub Pages depuis une branche : `Settings → Pages → Deploy from a branch → main → / (root)`.
4. Ouvrir le site puis actualiser avec `Ctrl + F5` pour éviter les anciens fichiers en cache.

Aucune compilation, installation de dépendances, police externe ou bibliothèque distante nécessaire. Les chemins relatifs fonctionnent sous le sous-dossier GitHub Pages du dépôt.

## Consulter localement

Depuis le dossier extrait :

```bash
python3 -m http.server 8000
```

Ouvrir `http://localhost:8000`. Ne pas ouvrir les HTML directement en `file://`, car les données sont chargées par `fetch`.

## Données et présentation

Les trois feuilles CSS, la structure des pages, les cartes, les fenêtres de détail, les effets de survol, le déplacement, le zoom et les constantes de simulation proviennent de Fouju. Opcore est le nœud central fixe. Les 52 entrées Opcore restent accessibles dans les deux vues, y compris l’opérateur central. La disposition effective des points dépend naturellement des acteurs et relations du corpus.

Les catégories propres à Opcore sont conservées et reprennent la palette de Fouju : indigo pour l’économie et l’industrie, bleu pour les institutions et territoires, vert pour les associations, violet pour l’expertise, bleu nuit pour Opcore et les contextes/projets. Les positions favorables sont vertes, prudentes orange, opposées ou critiques rouges, neutres ou non déterminées grises.

Les 52 acteurs/contextes, 47 relations, 25 preuves et 53 sources du fichier fourni sont conservés. `claims.json` transpose les positions déjà présentes, sans en déduire de nouvelles. Les rôles existants sont réunis pour l’affichage. Chaque preuve affiche l’ensemble des liens qui lui sont associés. Les certitudes des relations n’étant pas renseignées dans l’entrée, elles sont affichées comme « Non qualifiée ».

Les rattachements documentaires absents restent absents : aucune preuve n’est attribuée automatiquement à un acteur ou à une relation. Les preuves non rattachées et les métadonnées complémentaires (vigilances, dynamiques, projets) restent conservées dans les JSON, sans ajout d’écran au modèle Fouju. Les contradictions et les URL d’origine sont conservées ; cette adaptation n’est pas une vérification factuelle du corpus.

## Structure

- `index.html` : accueil identique au modèle Fouju, intitulés Opcore.
- `apps/cards/index.html` : cartes, recherche, filtres, détails et sources.
- `apps/network/index.html` : réseau, recherche, filtres, détails et sources.
- `assets/css/` : styles Fouju inchangés.
- `assets/js/` : moteur Fouju et prise en charge des données Opcore.
- `data/` : acteurs, positions, preuves, relations, sources et métadonnées.
- `config/taxonomy.json` : libellés et couleurs.
- `validate.py` : contrôle local des données (`python3 validate.py`).
