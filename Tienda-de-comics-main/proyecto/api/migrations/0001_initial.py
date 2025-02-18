# Generated by Django 5.1.3 on 2024-12-02 07:21

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Productos',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('nombre', models.TextField()),
                ('autor', models.TextField()),
                ('descripcion', models.TextField()),
                ('precio', models.TextField()),
                ('url_imagen', models.TextField()),
                ('vendido', models.BooleanField(default=False)),
                ('vendedor_nombre', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Roles',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('name', models.TextField()),
                ('description', models.TextField(max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('user_name', models.TextField()),
                ('email', models.TextField()),
                ('password', models.TextField()),
                ('phone_number', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Subastas',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('oferta_inicial', models.TextField()),
                ('fecha_inicio', models.TextField()),
                ('fecha_fin', models.TextField()),
                ('descripcion', models.TextField()),
                ('url_imagen', models.TextField()),
                ('completada', models.BooleanField(default=False)),
                ('oferta_maxima', models.TextField()),
                ('vendedor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.users')),
            ],
        ),
        migrations.CreateModel(
            name='Ofertas',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('producto', models.TextField()),
                ('fecha_emision', models.DateTimeField()),
                ('objeto_trueque', models.TextField()),
                ('aceptada', models.BooleanField(default=False)),
                ('visto', models.BooleanField(default=False)),
                ('emisor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ofertas_emitidas', to='api.users')),
            ],
        ),
        migrations.CreateModel(
            name='UserTokens',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(default=uuid.uuid4, max_length=255, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.users')),
            ],
        ),
    ]
