from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('create/', views.create_test, name='create_test'),
    path('save/', views.save_data, name='save_data'),
    path('list/', views.list, name='list'),
    path('test/', views.test, name='test'),
]