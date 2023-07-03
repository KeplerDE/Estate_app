# Generated by Django 4.2.2 on 2023-07-03 08:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("listings", "0002_alter_listing_area"),
    ]

    operations = [
        migrations.AlterField(
            model_name="listing",
            name="area",
            field=models.CharField(
                blank=True,
                choices=[
                    ("Inner London", "Inner London"),
                    ("Outer London", "Outer London"),
                ],
                max_length=20,
                null=True,
            ),
        ),
    ]
