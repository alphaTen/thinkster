# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-02-06 17:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='content',
            field=models.TextField(blank=True),
        ),
    ]
