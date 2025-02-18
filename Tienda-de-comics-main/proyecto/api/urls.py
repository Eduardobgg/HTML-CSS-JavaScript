from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import *

router = DefaultRouter()
router.register(r'roles', RolesViewSet)
router.register(r'users', UsersViewSet)
router.register(r'user_tokens', UserTokensViewSet)
router.register(r'ofertas', OfertasViewSet)
router.register(r'subastas', SubastasViewSet)


urlpatterns = [
    path('api/', include(router.urls)),
    path('users/create/', UsersCreateView.as_view()),
    path('users/verify/', VerifyUser.as_view()),
    path('productos/', ViewProdcuts.as_view()),
    path('productos/crear/', RegisterProduct.as_view()),
    path('ventas/', VentaRegister.as_view()),
    path('productos/disponibles/', ProductosDisponibles.as_view()),
]
