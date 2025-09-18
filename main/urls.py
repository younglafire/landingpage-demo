from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    path('', views.home, name='home'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('auth/login/', views.login_view, name='login'),
    path('auth/register/', views.register_view, name='register'),
    path('auth/logout/', views.logout_view, name='logout'),
    
    # API endpoints for AJAX calls
    path('api/notes/', views.notes_api, name='notes_api'),
    path('api/notes/<int:note_id>/', views.note_detail_api, name='note_detail_api'),
    path('api/schedule/', views.schedule_api, name='schedule_api'),
    path('api/schedule/<int:item_id>/', views.schedule_detail_api, name='schedule_detail_api'),
    path('api/study-sessions/', views.study_sessions_api, name='study_sessions_api'),
    path('api/timer-settings/', views.timer_settings_api, name='timer_settings_api'),
    path('api/bookmarks/', views.bookmarks_api, name='bookmarks_api'),
    path('api/bookmarks/<int:bookmark_id>/', views.bookmark_detail_api, name='bookmark_detail_api'),
]