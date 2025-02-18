from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework import status
from .models import *
from .serializers import *
from django.contrib.auth.hashers import make_password

# Vista para crear un usuario
class UsersCreateView(APIView):
    def post(self, request):
        data = request.data

        # Encriptar la contraseña antes de crear el usuario
        if 'password' in data:
            data['password'] = make_password(data['password'])

        name = data.get('user_name')
        description = data.get('role')


        serializer = UsersSerializer(data=data)

        serializer_rol = RolesSerializer(data={'name': name, 'description': description})        

        print(serializer_rol)   

        if serializer.is_valid() and serializer_rol.is_valid():
            serializer.save()
            serializer_rol.save()
            return Response( status=status.HTTP_201_CREATED)  # Código HTTP 201
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyUser(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        try:
            user = Users.objects.get(email=email)
            
            if user.check_password(password):
                # Verifica si hay un token no expirado para el usuario
                token_auth = UserTokens.objects.filter(user=user).order_by('-created_at').first()

                if token_auth and not token_auth.is_expired():
                    # Si hay un token y no ha expirado, se devuelve el token existente
                    token = token_auth.value
                else:
                    # Si no hay un token o ha expirado, se crea uno nuevo
                    token_auth = UserTokens.objects.create(user=user)
                    token = token_auth.value
                
                rol = Roles.objects.get(name=user.user_name)

                return Response({
                    "exists": True,
                    "id": user.id,
                    "token": token,
                    "username": user.user_name,
                    "role": rol.description,
                    }, status=status.HTTP_200_OK)
            else:
                return Response({"exists 01": False}, status=status.HTTP_200_OK)
        except Users.DoesNotExist:
            return Response({"exists 02": False}, status=status.HTTP_200_OK)

class ViewProdcuts(APIView):
    def get(self, request):
        products = Productos.objects.all()
        serializer = ProductosSerializer(products, many=True)
        return Response(serializer.data)
    

class RegisterProduct(APIView):
    def post(self, request):
        data = request.data
        serializer = ProductosSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VentaRegister(APIView):
    def post(self, request):
        data = request.data
        print(data)

        producto = Productos.objects.get(id=data.get('producto'))
        
        Productos.objects.filter(id=data.get('producto')).update(vendido=True)

        data['emisor'] = data.get('comprador')
        data['producto'] = data.get('producto')
        data['fecha_emision'] = timezone.now()
        data['objeto_trueque'] = "dinero"
        data['aceptada'] = True
        data['visto'] = True
        
        serializer = OfertasSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ProductosDisponibles(APIView):
    def get(self, request):
        products = Productos.objects.filter(vendido=False)
        serializer = ProductosSerializer(products, many=True)
        return Response(serializer.data)

class RolesViewSet(viewsets.ModelViewSet):
    queryset = Roles.objects.all()
    serializer_class = RolesSerializer


class UsersViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer

class UserTokensViewSet(viewsets.ModelViewSet):
    queryset = UserTokens.objects.all()
    serializer_class = UserTokensSerializer

class OfertasViewSet(viewsets.ModelViewSet):
    queryset = Ofertas.objects.all()
    serializer_class = OfertasSerializer

class SubastasViewSet(viewsets.ModelViewSet):
    queryset = Subastas.objects.all()
    serializer_class = SubastasSerializer

