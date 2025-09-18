from django.contrib import admin
from .models import UserProfile, Note, ScheduleItem, StudySession, BookmarkedItem, TimerSettings


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'plan', 'join_date']
    list_filter = ['plan', 'join_date']
    search_fields = ['user__username', 'user__email']


@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'is_favorite', 'created_at', 'updated_at']
    list_filter = ['is_favorite', 'created_at', 'updated_at']
    search_fields = ['title', 'content', 'user__username']


@admin.register(ScheduleItem)
class ScheduleItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'type', 'start_time', 'end_time', 'is_completed']
    list_filter = ['type', 'is_completed', 'start_time']
    search_fields = ['title', 'subject', 'user__username']


@admin.register(StudySession)
class StudySessionAdmin(admin.ModelAdmin):
    list_display = ['subject', 'user', 'duration', 'type', 'date']
    list_filter = ['type', 'date']
    search_fields = ['subject', 'user__username']


@admin.register(BookmarkedItem)
class BookmarkedItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'type', 'category', 'added_at']
    list_filter = ['type', 'category', 'added_at']
    search_fields = ['title', 'user__username']


@admin.register(TimerSettings)
class TimerSettingsAdmin(admin.ModelAdmin):
    list_display = ['user', 'work_duration', 'short_break', 'long_break', 'auto_start']
    search_fields = ['user__username']