from django.contrib import admin
from izeni.django.accounts.admin import EmailUserAdmin
from .models import EmailUser
from apps.chats.models import Message

class UserAdmin(EmailUserAdmin):
    pass
    
admin.site.register(EmailUser, EmailUserAdmin)
admin.site.register(Message)
