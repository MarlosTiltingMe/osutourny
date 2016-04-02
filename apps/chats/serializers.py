from rest_framework import serializers
from apps.chats.models import Message


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('body', 'author')
        read_only_fields = ('author')
