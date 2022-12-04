# Generated by Django 4.1.3 on 2022-12-01 16:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('studio', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='amenity',
            name='studio',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='amenities', to='studio.studio'),
        ),
        migrations.AlterField(
            model_name='photo',
            name='studio',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='photos', to='studio.studio'),
        ),
    ]