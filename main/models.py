from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class UserProfile(models.Model):
    PLAN_CHOICES = [
        ('free', 'Free'),
        ('premium', 'Premium'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    plan = models.CharField(max_length=10, choices=PLAN_CHOICES, default='free')
    join_date = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"{self.user.username} - {self.plan}"


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField()
    tags = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    is_favorite = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-updated_at']
    
    def __str__(self):
        return self.title


class ScheduleItem(models.Model):
    TYPE_CHOICES = [
        ('class', 'Lớp học'),
        ('study', 'Tự học'),
        ('exam', 'Thi cử'),
        ('assignment', 'Bài tập'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    subject = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=200, blank=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='class')
    is_completed = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['start_time']
    
    def __str__(self):
        return f"{self.title} - {self.start_time.strftime('%d/%m/%Y %H:%M')}"


class StudySession(models.Model):
    TYPE_CHOICES = [
        ('pomodoro', 'Pomodoro'),
        ('focus', 'Focus'),
        ('break', 'Break'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    duration = models.IntegerField()  # in seconds
    subject = models.CharField(max_length=100)
    date = models.DateTimeField(default=timezone.now)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='pomodoro')
    
    class Meta:
        ordering = ['-date']
    
    def __str__(self):
        return f"{self.subject} - {self.duration//60}m - {self.date.strftime('%d/%m/%Y')}"


class BookmarkedItem(models.Model):
    TYPE_CHOICES = [
        ('material', 'Material'),
        ('ai-tool', 'AI Tool'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    added_at = models.DateTimeField(default=timezone.now)
    
    class Meta:
        ordering = ['-added_at']
    
    def __str__(self):
        return f"{self.title} - {self.type}"


class TimerSettings(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    work_duration = models.IntegerField(default=25)  # in minutes
    short_break = models.IntegerField(default=5)  # in minutes
    long_break = models.IntegerField(default=15)  # in minutes
    auto_start = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.user.username} - Timer Settings"