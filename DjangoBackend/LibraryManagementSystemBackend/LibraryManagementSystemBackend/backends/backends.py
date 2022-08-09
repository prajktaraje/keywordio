from accounts.models import User
from django.contrib.auth import get_user_model
from django.db.models import Q


class AuthBackend(object):
    supports_object_permissions = True
    supports_anonymous_user = False
    supports_inactive_user = False

    def authenticate(self, email=None, password=None):
        try:
            user = User.objects.get(email__iexact=email)
        except User.DoesNotExist:
            return None
        if password is None:
            return user if user else None
        return user if user.check_password(password) else None
