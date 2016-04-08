from izeni.django.accounts.views import BaseUserViewSet
from apps.accounts.models import EmailUser
from rest_framework import viewsets
from izeni.django.accounts import serializers

class CurrentUser(viewsets.ModelViewSet):
    querset = EmailUser.objects.all()
    model = EmailUser
    serializer_class = serializers.UserSerializer

    def get_object(self):
        return self.request.user

    def list(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

class UserViewSet(BaseUserViewSet):
    pass
