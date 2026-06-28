# 02 — Design System

## Style recherché

### Identité visuelle
Le Help Center est une extension de l'écosystème Datakö. Un utilisateur qui passe de Fleet Manager au Help Center ne doit pas sentir de rupture. Même palette, même typographie, même densité d'information.

**Mot-clé directeur** : *professionnel sobre*. Pas de couleurs vives, pas d'animations superflues, pas d'illustrations illustratives. La clarté est le design.

### Thème
Dark mode natif, cohérent avec Fleet Manager. Pas de toggle light/dark en V1 — ajouter en V2 si demandé.

---

## Tokens de couleur

```css
/* Surfaces */
--surface:    #0F1117   /* fond principal */
--surface-2:  #181C27   /* cartes, sidebar */
--surface-3:  #1F2537   /* hover, input bg */
--border:     rgba(255,255,255,0.08)

/* Texte */
--text-primary:   #F1F5F9
--text-secondary: #94A3B8
--text-muted:     #64748B

/* Accent principal */
--datako-blue:  #3B82F6
--datako-navy:  #1E3A5F

/* Dégradé CTA */
--gradient-start: #2563EB
--gradient-end:   #7C3AED

/* États sémantiques */
--success:  #10B981
--warning:  #F59E0B
--error:    #EF4444
--info:     #3B82F6
```

---

## Typographie

```
Font family : Inter (Google Fonts, subset latin + latin-ext)
Fallback    : system-ui, sans-serif

Titres H1   : 28px / font-bold / text-primary
Titres H2   : 20px / font-semibold / text-primary
Titres H3   : 16px / font-semibold / text-primary
Corps       : 15px / font-normal / text-secondary / leading-relaxed
Code inline : 13px / font-mono / bg-surface-3 / text-blue-300
Muted       : 13px / text-muted
```

---

## Grille et espacement

- **Conteneur principal** : `max-w-3xl mx-auto` pour le contenu des articles (lisibilité optimale ~65 chars/ligne)
- **Layout global** : sidebar fixe gauche (260px) + zone contenu
- **Espacement interne** : `px-6 py-8` sur mobile, `px-8 py-10` sur desktop
- **Gouttière entre sections** : `space-y-10`
- **Gouttière entre paragraphes** : `space-y-4`

---

## Responsive

### Breakpoints (Tailwind par défaut)
```
sm  : 640px
md  : 768px
lg  : 1024px
xl  : 1280px
```

### Comportement par breakpoint

| Élément | Mobile (< lg) | Desktop (≥ lg) |
|---|---|---|
| Sidebar | Masquée — menu hamburger en haut | Sticky gauche, toujours visible |
| Contenu | Pleine largeur, `px-4` | `max-w-3xl`, centré à droite de la sidebar |
| Fil d'Ariane | Masqué (trop encombrant) | Visible |
| Table des matières article | Masquée | Sticky droite (si article long) |
| Cartes Accueil | 1 colonne | 2-3 colonnes |
| Navigation Préc/Suiv | Empilé vertical | Côte à côte horizontal |

---

## Composants — états et variants

### Bouton

```
Variant primaire  : bg-gradient(datako) text-white — actions principales
Variant ghost     : border border-border text-secondary hover:border-blue-500
Variant lien      : text-blue-400 underline-offset-2 hover:underline
Tailles           : sm (px-3 py-1.5 text-sm) | md (px-4 py-2) | lg (px-6 py-3)
```

### Lien interne

```
Couleur      : text-blue-400
Hover        : underline text-blue-300
Visited      : text-purple-400 (optionnel V2)
```

### Badge / Tag

```
Section      : bg-surface-3 border border-border text-text-muted text-xs px-2 py-0.5 rounded-full
Difficulté   : debutant=emerald / intermediaire=amber / avance=red (bg-X-500/10 text-X-400 border-X-500/20)
Rôle         : même pattern, couleur arbitraire par rôle
```

---

## Expérience utilisateur

### Principes d'interaction

1. **Tout est trouvable en < 3 clics** depuis l'Accueil
2. **La recherche est prioritaire** — shortcut `Cmd+K` ouvre la palette de recherche
3. **Pas de dead-end** — chaque page a des articles connexes et un lien vers l'Accueil
4. **Feedback immédiat** — hover states sur tous les éléments cliquables, transition 150ms max

### Navigation au clavier
- `Tab` navigue entre les éléments interactifs
- `Enter` / `Space` activent les accordéons et les liens
- `Escape` ferme la recherche et le menu mobile
- `Cmd+K` ouvre la recherche (global)

### Performance perçue
- Contenu en dur dans le bundle (pas de fetch réseau) → première render < 100ms
- Pas de skeleton / loading states (contenu disponible immédiatement)
- Images : pas de vraies images en V1 — icônes lucide-react uniquement

### Accessibilité minimale
- `aria-label` sur tous les boutons icon-only
- `role="navigation"` sur la sidebar et le menu mobile
- `role="main"` sur la zone de contenu
- Contraste text/fond ≥ 4.5:1 sur toutes les surfaces
- Focus visible (outline blue) sur tous les éléments interactifs

---

## Animations

Très limitées. Uniquement des transitions utiles :

| Élément | Transition |
|---|---|
| Accordéon FAQ | `max-height` 200ms ease-out |
| Menu mobile | Slide-in depuis la gauche, 200ms |
| Hover cartes | `border-color` 150ms |
| Palette recherche | Fade-in 100ms |
| Fil d'Ariane | Aucune |

Pas d'animations à l'entrée des pages (pas de slide-up, pas de fade au montage).

---

## Règles d'or du design

1. **Pas de fond blanc** — toujours sur `--surface` ou `--surface-2`
2. **Pas de couleur vive sans raison sémantique** — le bleu sert à l'interactivité, le vert au succès, l'ambre à l'attention
3. **Pas d'ombre portée** (box-shadow) — borders à `rgba(255,255,255,0.08)` suffisent en dark
4. **Pas de border-radius > 12px** — pas de design "bulle"
5. **Icônes lucide-react uniquement** — taille 16px inline, 20px standalone
