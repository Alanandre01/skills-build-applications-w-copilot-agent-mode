from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from octofit_tracker.models import Activity  # À adapter selon vos modèles

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data.'

    def handle(self, *args, **options):
        User = get_user_model()

        # Création d'utilisateurs de test
        if not User.objects.filter(username='testuser').exists():
            user = User.objects.create_user(username='testuser', email='testuser@example.com', password='testpass123')
            self.stdout.write(self.style.SUCCESS(f'Utilisateur créé : {user.username}'))
        else:
            user = User.objects.get(username='testuser')
            self.stdout.write(self.style.WARNING('Utilisateur testuser existe déjà.'))

        # Création d'activités de test (à adapter selon votre modèle Activity)
        if hasattr(Activity, 'objects'):
            activity, created = Activity.objects.get_or_create(
                user=user,
                name='Course à pied',
                defaults={'duration': 30, 'distance': 5.0}
            )
            if created:
                self.stdout.write(self.style.SUCCESS('Activité de test créée.'))
            else:
                self.stdout.write(self.style.WARNING('Activité de test existe déjà.'))
        else:
            self.stdout.write(self.style.WARNING('Le modèle Activity n’est pas défini ou importé.'))

        self.stdout.write(self.style.SUCCESS('Population de la base de données terminée.'))
