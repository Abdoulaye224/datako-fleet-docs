// Vérifie que chaque lien interne déclaré dans src/data pointe vers une cible existante.
// Un lien mort renvoie l'utilisateur vers une page 404 : la documentation doit conduire
// à un guide, jamais dans le vide.
import fs from 'node:fs'
import path from 'node:path'

const RACINE = 'src/data'

const idsDe = fichier => {
  if (!fs.existsSync(fichier)) return []
  return [...fs.readFileSync(fichier, 'utf8').matchAll(/^\s{2,4}id: '([^']+)'/gm)].map(m => m[1])
}

const cibles = new Set()
const ajouter = (prefixe, fichier) => idsDe(fichier).forEach(id => cibles.add(prefixe + id))

ajouter('/transport/guides/', 'src/data/fleet/transport/guides.ts')
ajouter('/transport/pages/', 'src/data/fleet/transport/pages.ts')
ajouter('/transport/cas-particuliers/', 'src/data/fleet/transport/casParticuliers.ts')
ajouter('/indicateurs/', 'src/data/fleet/indicateurs.ts')
ajouter('/roles/', 'src/data/fleet/roles.ts')
ajouter('/profils/', 'src/data/fleet/profils.ts')
ajouter('/onboarding/', 'src/data/fleet/onboarding.ts')
ajouter('/vente/guides/', 'src/data/fleet/vente/guides.ts')
ajouter('/vente/pages/', 'src/data/fleet/vente/pages.ts')
ajouter('/vente/indicateurs/', 'src/data/fleet/vente/indicateurs.ts')
ajouter('/portail-proprietaire/', 'src/data/fleet/portail/index.ts')

const ROUTES_STATIQUES = [
  '/', '/demarrage', '/transport', '/transport/guides', '/transport/pages', '/transport/cycle',
  '/transport/cas-particuliers', '/roles', '/indicateurs', '/faq', '/nouveautes',
  '/onboarding', '/profils', '/recherche', '/vente', '/vente/cycle', '/vente/guides',
  '/vente/pages', '/vente/indicateurs', '/whatsapp', '/whatsapp/mission-conducteur', '/portail-proprietaire',
  '/parcours-complet', '/confirmation-livraison',
]
ROUTES_STATIQUES.forEach(route => cibles.add(route))

const fichiers = []
const parcourir = dossier => {
  for (const entree of fs.readdirSync(dossier)) {
    const chemin = path.join(dossier, entree)
    if (fs.statSync(chemin).isDirectory()) parcourir(chemin)
    else if (chemin.endsWith('.ts')) fichiers.push(chemin)
  }
}
parcourir(RACINE)

let total = 0
const morts = []
for (const fichier of fichiers) {
  const contenu = fs.readFileSync(fichier, 'utf8')
  for (const m of contenu.matchAll(/(?:href|guide|articleLie): '(\/[^']*)'/g)) {
    total++
    if (!cibles.has(m[1])) {
      morts.push(`${fichier}:${contenu.slice(0, m.index).split('\n').length}  ${m[1]}`)
    }
  }
}

if (morts.length > 0) {
  console.error(`${morts.length} lien(s) mort(s) sur ${total} :\n`)
  morts.forEach(l => console.error('  ' + l))
  console.error('\nChaque lien doit pointer vers un id existant ou une route declaree dans App.tsx.')
  process.exit(1)
}

console.log(`${total} liens internes verifies, aucun lien mort.`)
