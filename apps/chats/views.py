from django.shortcuts import render
from rest_framework import viewsets, generics, views, status
from rest_framework.response import Response
from apps.chats.models import Message
from apps.chats.serializers import MessageSerializer

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
