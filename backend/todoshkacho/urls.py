from django.urls import path
from .views import TodoListView, TodoDetailView

urlpatterns = [
    path('todos', TodoListView.as_view(), name='todo-list'),
    path('todo/<int:pk>', TodoDetailView.as_view(), name='todo-detail'),
]
