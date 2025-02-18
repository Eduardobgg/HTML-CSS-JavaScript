from rest_framework import serializers
from .models import *


class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = '__all__'
    
class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'

class UserTokensSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTokens
        fields = '__all__'

class OfertasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ofertas
        fields = '__all__'

class SubastasSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Subastas
        fields = '__all__'

class ProductosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Productos
        fields = '__all__'
