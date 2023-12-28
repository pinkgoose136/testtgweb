from django.db import models

class info(models.Model):
    test_id = models.IntegerField()
    name = models.CharField(max_length=400)
    desc = models.CharField(max_length=2000)
    type = models.CharField(max_length=16)
    class Meta:
        app_label = 'myapp'

class questions(models.Model):
    test_id = models.IntegerField()
    question_id = models.IntegerField()
    question = models.CharField(max_length=500)
    right = models.IntegerField()
    class Meta:
        app_label = 'myapp'

class answers(models.Model):
    test_id = models.IntegerField()
    question_id = models.IntegerField()
    answer_id = models.IntegerField()
    answer = models.CharField(max_length=500)
    class Meta:
        app_label = 'myapp'

class results(models.Model):
    test_id = models.IntegerField()
    res_id = models.IntegerField()
    min = models.IntegerField()
    max = models.IntegerField()
    text = models.CharField(max_length=600)
    class Meta:
        app_label = 'myapp'

        