# Generated by Django 5.0 on 2023-12-26 15:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_answers_info_questions_results_delete_yourmodel'),
    ]

    operations = [
        migrations.AddField(
            model_name='answers',
            name='answer_id',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='answers',
            name='question_id',
            field=models.IntegerField(),
        ),
    ]
