from django.db import models
from django.contrib.auth.hashers import make_password, check_password
import uuid
from django.utils import timezone
from datetime import timedelta

class Roles(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.TextField()
    description = models.TextField(max_length=128)


class Users(models.Model):
    id = models.BigAutoField(primary_key=True)
    user_name = models.TextField()
    email = models.TextField()
    password = models.TextField()
    phone_number = models.TextField()

    def save(self, *args, **kwargs):
        # Si la contraseña se cambió, se encripta antes de guardarla
        if not self.password.startswith('pbkdf2_'):  # Verifica si ya está encriptada
            self.password = make_password(self.password)
        super(Users, self).save(*args, **kwargs)

    def __str__(self):
        return self.user_name
    
    def check_password(self, raw_password):
        # Verifica la contraseña proporcionada con el hash almacenado
        return check_password(raw_password, self.password)


class UserTokens(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    value = models.CharField(max_length=255, unique=True, default=uuid.uuid4)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        # Calcula si el token tiene más de 2 días de antigüedad
        return timezone.now() > self.created_at + timedelta(days=2)


class Ofertas(models.Model):
    id = models.BigAutoField(primary_key=True)
    emisor = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='ofertas_emitidas')
    producto = models.TextField()
    fecha_emision = models.DateTimeField()
    objeto_trueque = models.TextField()
    aceptada = models.BooleanField(default=False)
    visto = models.BooleanField(default=False)


class Subastas(models.Model):
    oferta_inicial = models.TextField()
    fecha_inicio = models.TextField()
    fecha_fin = models.TextField()
    descripcion = models.TextField()
    url_imagen = models.TextField()
    vendedor = models.ForeignKey(Users, on_delete=models.CASCADE)
    completada = models.BooleanField(default=False)
    oferta_maxima = models.TextField()
   
class Productos(models.Model):
    id = models.BigAutoField(primary_key=True)
    nombre = models.TextField()
    autor = models.TextField()
    descripcion = models.TextField()
    precio = models.TextField()
    url_imagen = models.TextField()
    vendido = models.BooleanField(default=False)
    vendedor_nombre = models.TextField()