from izeni.django.accounts.models import AbstractEmailUser
from django.db import models

class EmailUser(AbstractEmailUser):
    username = models.CharField(max_length=24)
    pass
