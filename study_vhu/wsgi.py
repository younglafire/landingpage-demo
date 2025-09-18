"""
WSGI config for study_vhu project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'study_vhu.settings')

application = get_wsgi_application()