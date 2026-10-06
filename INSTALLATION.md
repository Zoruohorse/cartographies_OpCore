# Ajouter les deux onglets à Opcore

Ce correctif s’applique à la version Opcore_GitHub fournie dans cette conversation.

1. Décompresser Opcore_Ajout_Onglets.zip.
2. Dans le dépôt GitHub, remplacer les trois fichiers suivants par ceux de l’archive, aux mêmes emplacements :
   - apps/cards/index.html
   - assets/css/cards.css
   - assets/js/cards.js
3. Ajouter data/cards-content.json dans le dossier data.
4. Valider les modifications, attendre la publication GitHub Pages puis actualiser la vue cartes avec Ctrl + F5.

Vous pouvez déposer les dossiers apps, assets et data extraits directement à la racine du dépôt. Ne déposez pas le ZIP seul. INSTALLATION.md est seulement une notice et n’est pas nécessaire au site.

Les trois onglets sont : Cartographie des acteurs ; Synthèse des oppositions ; Points de vigilance et sources.

## Contenu

- 4 axes de synthèse, avec références documentaires.
- 35 vigilances reprises des trois lots, avec importance d’origine, éléments disponibles et traçabilité.
- 53 sources lues directement depuis le fichier data/sources.json déjà présent.

La synthèse distingue les oppositions sectorielles, les demandes d’encadrement et les réserves documentaires. Elle ne présente pas comme établie une mobilisation locale contre Montereau.

## Modifier ultérieurement les contenus

Dans data/cards-content.json :
- intro : paragraphe de cadrage ;
- griefs : liste des axes (title, text, evidence_ids, source_ids) ;
- vigilance : liste des vigilances (id, title, text, available_elements, importance, lot, evidence_ids, source_ids).

Les evidence_ids renvoient aux IDs déjà présents dans data/evidence.json. Les source_ids renvoient à data/sources.json. Conserver les préfixes L1-, L2- ou L3- pour distinguer les lots.

Les sources de chaque preuve sont affichées automatiquement. Les source_ids d’un axe ou d’une vigilance ajoutent des liens complémentaires sans répéter ceux déjà présents dans les preuves.

Le JavaScript initial des cartes et sa feuille de style restent présents au début des fichiers correspondants ; l’ajout des onglets se trouve à la fin. La vue réseau, le chargeur partagé et les données existantes ne sont pas modifiés. Le fichier HTML ajoute la navigation et place la disposition initiale des cartes dans un panneau, afin de conserver sa grille et sa barre latérale.

Contrôles effectués : syntaxe JavaScript, intégrité des références, navigation entre onglets dans un DOM simulé, recherche, réinitialisation, ouverture/fermeture d’une fiche et présence des liens documentaires. Aucun contrôle visuel dans un navigateur réel n’a été réalisé dans cet environnement.
