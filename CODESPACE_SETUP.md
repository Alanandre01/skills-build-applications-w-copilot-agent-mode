# Configuration Codespace - OctoFit Tracker

## Modifications effectuées

### 1. Mise à jour de `urls.py`
**Fichier:** `/workspaces/skills-build-applications-w-copilot-agent-mode/octofit-tracker/backend/octofit_tracker/urls.py`

- Ajout de `import os` pour accéder aux variables d'environnement
- Modification de la fonction `api_root()` pour utiliser la variable `$CODESPACE_NAME`
- Les URLs retournées utilisent maintenant le format:
  - Codespace: `https://$CODESPACE_NAME-8000.app.github.dev/api/[component]/`
  - Local: `http://localhost:8000/api/[component]/`

### 2. Mise à jour de `settings.py`
**Fichier:** `/workspaces/skills-build-applications-w-copilot-agent-mode/octofit-tracker/backend/octofit_tracker/settings.py`

- Ajout de `import os`
- Configuration dynamique de `ALLOWED_HOSTS`:
  - Si `$CODESPACE_NAME` existe: `['{CODESPACE_NAME}-8000.app.github.dev', 'localhost', '127.0.0.1']`
  - Sinon: `['localhost', '127.0.0.1']`

### 3. Configuration VS Code (déjà existante)
**Fichier:** `/workspaces/skills-build-applications-w-copilot-agent-mode/.vscode/launch.json`

La configuration "Launch Django Backend" est déjà présente et correctement configurée.

## Test des endpoints API

### Option 1: Utiliser le script automatisé
```bash
./test_api.sh
```

### Option 2: Tests manuels avec curl

#### Endpoint racine
```bash
# Codespace
curl https://$CODESPACE_NAME-8000.app.github.dev/

# Local
curl http://localhost:8000/
```

#### Endpoint users
```bash
# Codespace
curl https://$CODESPACE_NAME-8000.app.github.dev/api/users/

# Local
curl http://localhost:8000/api/users/
```

#### Endpoint teams
```bash
# Codespace
curl https://$CODESPACE_NAME-8000.app.github.dev/api/teams/

# Local
curl http://localhost:8000/api/teams/
```

#### Endpoint activities
```bash
# Codespace
curl https://$CODESPACE_NAME-8000.app.github.dev/api/activities/

# Local
curl http://localhost:8000/api/activities/
```

#### Endpoint workouts
```bash
# Codespace
curl https://$CODESPACE_NAME-8000.app.github.dev/api/workouts/

# Local
curl http://localhost:8000/api/workouts/
```

#### Endpoint leaderboard
```bash
# Codespace
curl https://$CODESPACE_NAME-8000.app.github.dev/api/leaderboard/

# Local
curl http://localhost:8000/api/leaderboard/
```

## Démarrer le serveur

### Via VS Code
1. Ouvrir le panneau "Run and Debug" (Ctrl+Shift+D)
2. Sélectionner "Launch Django Backend"
3. Cliquer sur le bouton "Start Debugging" (F5)

### Via terminal
```bash
cd /workspaces/skills-build-applications-w-copilot-agent-mode/octofit-tracker/backend
source venv/bin/activate
python manage.py runserver 0.0.0.0:8000
```

## Format des URLs REST API

- **Format général:** `https://$CODESPACE_NAME-8000.app.github.dev/api/[component]/`
- **Exemple complet:** `https://$CODESPACE_NAME-8000.app.github.dev/api/activities/`

## Notes importantes

- La variable `$CODESPACE_NAME` n'est pas codée en dur, elle est récupérée dynamiquement via `os.environ.get()`
- Le fichier `views.py` n'a pas été modifié comme demandé
- La configuration fonctionne automatiquement en Codespace et en local
- Aucun problème de certificat HTTPS dans Codespace grâce à l'utilisation du domaine GitHub
