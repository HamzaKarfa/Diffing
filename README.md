# Diffing


L'algorithme de comparaison (ou algorithme de réconciliation) sur React, est conçu pour être rapide et efficace. 

Voici un exemple de fonctionnement simplifié

### Algorithme de Réconciliation en Vue d'Ensemble

1. **Comparaison en Profondeur :** React parcourt les arbres de composants de manière récursive, nœud par nœud, pour identifier les différences entre l'ancien et le nouveau DOM.

2. **Comparaison par Clé :** Si des éléments sont en liste, React utilise des clés uniques (`key`) pour optimiser la comparaison. Les clés aident à détecter les changements dans les collections d'éléments.

3. **Mise à Jour Minimale :** Une fois les différences identifiées, React génère un ensemble d'instructions de mise à jour minimal pour seulement les parties du DOM qui ont changé.

### Étapes de l'Algorithme

1. **Comparaison des Types d'Éléments :**
   - Si les éléments comparés sont de types différents, React remplace l'ancien nœud par le nouveau.
   - Si les éléments sont du même type, React continue en comparant leurs attributs et leur contenu.

2. **Comparaison des Attributs :**
   - React vérifie si les attributs (props) des éléments ont changé (ex : `className`, `id`, `style`).
   - Seuls les attributs modifiés sont mis à jour dans le DOM réel.

3. **Comparaison des Enfants :**
   - React traite la comparaison des enfants des éléments de manière récursive.
   - Lors de la comparaison des enfants, React traite les tableaux (listes d'éléments) de manière optimisée grâce aux clés.

### Exemples Concrets
```jsx
<ul>
  <li key="1">Apple</li>
  <li key="2">Banana</li>
  <li key="3">Cherry</li>
</ul>
```

#### Après le Changement

```jsx
<ul>
  <li key="1">Apple</li>
  <li key="3">Cherry</li>
  <li key="2">Banana</li>
  <li key="4">Date</li>
</ul>
```

### Étapes de l'Algorithme pour cet Exemples

1. **Détection des Clés :**
   - `key="1"` reste à la même position.
   - `key="2"` change de position.
   - `key="3"` reste à la même position.
   - `key="4"` est ajouté.

2. **Génération des Instructions de Mise à Jour :**
   - React déplace l'élément avec `key="2"` après celui avec `key="3"`.
   - Ajoute le nouvel élément avec `key="4"` à la liste.

### Points de Performance

- **Optimisation des Listes :** Grâce aux clés, React peut identifier plus efficacement les ajouts, les suppressions ou les mouvements d'éléments dans les listes.
- **Opérations Minimes:** L'algorithme garantit que seules les modifications nécessaires sont appliquées, réduisant ainsi le nombre total d'opérations DOM.

### Conclusion

L'algorithme de réconciliation de React est conçu pour maximiser l'efficacité en minimisant les opérations de mise à jour du DOM, en utilisant une comparaison profonde et des clés uniques pour optimiser la manipulation des éléments.


### Implémentation Simplifiée de l'Algorithme de Réconciliation

Vous retrouverez une version complète du pseudocode montrant le processus de réconciliation dans `example.js`
