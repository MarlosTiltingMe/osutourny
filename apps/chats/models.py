from django.db import models
from apps.accounts.models import EmailUser


class Message(models.Model):
    body = models.CharField(max_length=280, unique=False)
    author = models.ForeignKey(EmailUser, related_name='messages')
