from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.utils.safestring import mark_safe
from django.views.generic.base import RedirectView
from izeni.django.accounts.views import obtain_auth_token, social_auth,\
    ValidateUserView, ResetPassword, RequestPasswordChange
# from izeni.django.accounts.admin import admin_cleanup # TODO admin_cleanup?
from rest_framework.routers import DefaultRouter

from apps.landing.views import LandingView
from apps.accounts.views import UserViewSet
from apps.chats.views import MessageViewSet
from apps.accounts.views import CurrentUser
from osu.views import IndexView

admin.site.site_title = admin.site.index_title = "osu backend"
admin.site.site_header = mark_safe('<img src="{img}" alt="{alt}"/>'.format(
    img=settings.STATIC_URL + 'admin/img/logo-140x60.png',
    alt=admin.site.site_title,
))

router = DefaultRouter()
router.register(r'users', UserViewSet, base_name='users')
router.register(r'messages', MessageViewSet, base_name='messages')
router.register(r'current', CurrentUser, base_name='current')

urlpatterns = [
    url(r'^favicon.ico$', RedirectView.as_view(
        url=settings.STATIC_URL + 'favicon.ico')),

    url(r'^api/', include(router.urls)),
    url(r'^$', LandingView.as_view(), name='landing-page'),

    # Administration
    url(r'^admin/', include(admin.site.urls)),

    # General Api
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),
    url(r'^api-token-auth/', obtain_auth_token),
    url(r'^social/(?P<backend>[^/]+)/', social_auth),
    url(r'reset-password/(?P<email>[a-zA-Z0-9-.+@_]+)/$',
        RequestPasswordChange.as_view(), name='reset-password'),
    url(r'reset/(?P<validation_key>[a-z0-9\-]+)/$',
        ResetPassword.as_view(), name='reset-request'),
    url(r'validate/(?P<validation_key>[a-z0-9\-]+)/$',
        ValidateUserView.as_view(), name='user-validation'),
    url(r'^.*$', IndexView.as_view(), name='index'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
