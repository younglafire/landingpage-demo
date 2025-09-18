from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.utils import timezone
from django.core.paginator import Paginator
import json
from datetime import datetime, timedelta

from .models import UserProfile, Note, ScheduleItem, StudySession, BookmarkedItem, TimerSettings


def home(request):
    """Landing page view"""
    context = {
        'user': request.user if request.user.is_authenticated else None,
        'is_authenticated': request.user.is_authenticated,
    }
    return render(request, 'main/home.html', context)


@login_required
def dashboard(request):
    """Dashboard view for authenticated users"""
    # Get or create user profile
    profile, created = UserProfile.objects.get_or_create(user=request.user)
    
    # Get recent activity
    recent_notes = Note.objects.filter(user=request.user)[:5]
    recent_sessions = StudySession.objects.filter(user=request.user)[:5]
    upcoming_schedule = ScheduleItem.objects.filter(
        user=request.user,
        start_time__gte=timezone.now()
    )[:5]
    
    # Get timer settings
    timer_settings, created = TimerSettings.objects.get_or_create(user=request.user)
    
    context = {
        'user': request.user,
        'profile': profile,
        'recent_notes': recent_notes,
        'recent_sessions': recent_sessions,
        'upcoming_schedule': upcoming_schedule,
        'timer_settings': timer_settings,
    }
    return render(request, 'main/dashboard.html', context)


def login_view(request):
    """Login view"""
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'success': True, 'redirect': '/dashboard/'})
        else:
            return JsonResponse({'success': False, 'error': 'Tên đăng nhập hoặc mật khẩu không đúng'})
    
    return JsonResponse({'success': False, 'error': 'Method not allowed'})


def register_view(request):
    """Register view"""
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        name = request.POST.get('name', '')
        
        # Check if user exists
        if User.objects.filter(username=username).exists():
            return JsonResponse({'success': False, 'error': 'Tên đăng nhập đã tồn tại'})
        
        if User.objects.filter(email=email).exists():
            return JsonResponse({'success': False, 'error': 'Email đã được sử dụng'})
        
        # Create user
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=name
        )
        
        # Create profile
        UserProfile.objects.create(user=user)
        
        # Login user
        login(request, user)
        return JsonResponse({'success': True, 'redirect': '/dashboard/'})
    
    return JsonResponse({'success': False, 'error': 'Method not allowed'})


def logout_view(request):
    """Logout view"""
    logout(request)
    return redirect('main:home')


# API Views for AJAX calls

@login_required
@csrf_exempt
def notes_api(request):
    """Notes API endpoint"""
    if request.method == 'GET':
        notes = Note.objects.filter(user=request.user)
        notes_data = []
        for note in notes:
            notes_data.append({
                'id': note.id,
                'title': note.title,
                'content': note.content,
                'tags': note.tags,
                'created_at': note.created_at.isoformat(),
                'updated_at': note.updated_at.isoformat(),
                'is_favorite': note.is_favorite,
            })
        return JsonResponse({'notes': notes_data})
    
    elif request.method == 'POST':
        data = json.loads(request.body)
        note = Note.objects.create(
            user=request.user,
            title=data.get('title', ''),
            content=data.get('content', ''),
            tags=data.get('tags', []),
            is_favorite=data.get('is_favorite', False)
        )
        return JsonResponse({
            'success': True,
            'note': {
                'id': note.id,
                'title': note.title,
                'content': note.content,
                'tags': note.tags,
                'created_at': note.created_at.isoformat(),
                'updated_at': note.updated_at.isoformat(),
                'is_favorite': note.is_favorite,
            }
        })


@login_required
@csrf_exempt
def note_detail_api(request, note_id):
    """Note detail API endpoint"""
    note = get_object_or_404(Note, id=note_id, user=request.user)
    
    if request.method == 'PUT':
        data = json.loads(request.body)
        note.title = data.get('title', note.title)
        note.content = data.get('content', note.content)
        note.tags = data.get('tags', note.tags)
        note.is_favorite = data.get('is_favorite', note.is_favorite)
        note.save()
        return JsonResponse({'success': True})
    
    elif request.method == 'DELETE':
        note.delete()
        return JsonResponse({'success': True})


@login_required
@csrf_exempt
def schedule_api(request):
    """Schedule API endpoint"""
    if request.method == 'GET':
        items = ScheduleItem.objects.filter(user=request.user)
        items_data = []
        for item in items:
            items_data.append({
                'id': item.id,
                'title': item.title,
                'subject': item.subject,
                'location': item.location,
                'start_time': item.start_time.isoformat(),
                'end_time': item.end_time.isoformat(),
                'type': item.type,
                'is_completed': item.is_completed,
            })
        return JsonResponse({'items': items_data})
    
    elif request.method == 'POST':
        data = json.loads(request.body)
        item = ScheduleItem.objects.create(
            user=request.user,
            title=data.get('title', ''),
            subject=data.get('subject', ''),
            location=data.get('location', ''),
            start_time=datetime.fromisoformat(data.get('start_time')),
            end_time=datetime.fromisoformat(data.get('end_time')),
            type=data.get('type', 'class'),
            is_completed=data.get('is_completed', False)
        )
        return JsonResponse({'success': True, 'id': item.id})


@login_required
@csrf_exempt
def schedule_detail_api(request, item_id):
    """Schedule item detail API endpoint"""
    item = get_object_or_404(ScheduleItem, id=item_id, user=request.user)
    
    if request.method == 'PUT':
        data = json.loads(request.body)
        item.title = data.get('title', item.title)
        item.subject = data.get('subject', item.subject)
        item.location = data.get('location', item.location)
        if data.get('start_time'):
            item.start_time = datetime.fromisoformat(data.get('start_time'))
        if data.get('end_time'):
            item.end_time = datetime.fromisoformat(data.get('end_time'))
        item.type = data.get('type', item.type)
        item.is_completed = data.get('is_completed', item.is_completed)
        item.save()
        return JsonResponse({'success': True})
    
    elif request.method == 'DELETE':
        item.delete()
        return JsonResponse({'success': True})


@login_required
@csrf_exempt
def study_sessions_api(request):
    """Study sessions API endpoint"""
    if request.method == 'GET':
        sessions = StudySession.objects.filter(user=request.user)
        sessions_data = []
        for session in sessions:
            sessions_data.append({
                'id': session.id,
                'duration': session.duration,
                'subject': session.subject,
                'date': session.date.isoformat(),
                'type': session.type,
            })
        return JsonResponse({'sessions': sessions_data})
    
    elif request.method == 'POST':
        data = json.loads(request.body)
        session = StudySession.objects.create(
            user=request.user,
            duration=data.get('duration', 0),
            subject=data.get('subject', ''),
            type=data.get('type', 'pomodoro')
        )
        return JsonResponse({'success': True, 'id': session.id})


@login_required
@csrf_exempt
def timer_settings_api(request):
    """Timer settings API endpoint"""
    settings, created = TimerSettings.objects.get_or_create(user=request.user)
    
    if request.method == 'GET':
        return JsonResponse({
            'work_duration': settings.work_duration,
            'short_break': settings.short_break,
            'long_break': settings.long_break,
            'auto_start': settings.auto_start,
        })
    
    elif request.method == 'PUT':
        data = json.loads(request.body)
        settings.work_duration = data.get('work_duration', settings.work_duration)
        settings.short_break = data.get('short_break', settings.short_break)
        settings.long_break = data.get('long_break', settings.long_break)
        settings.auto_start = data.get('auto_start', settings.auto_start)
        settings.save()
        return JsonResponse({'success': True})


@login_required
@csrf_exempt
def bookmarks_api(request):
    """Bookmarks API endpoint"""
    if request.method == 'GET':
        bookmarks = BookmarkedItem.objects.filter(user=request.user)
        bookmarks_data = []
        for bookmark in bookmarks:
            bookmarks_data.append({
                'id': bookmark.id,
                'type': bookmark.type,
                'title': bookmark.title,
                'category': bookmark.category,
                'added_at': bookmark.added_at.isoformat(),
            })
        return JsonResponse({'bookmarks': bookmarks_data})
    
    elif request.method == 'POST':
        data = json.loads(request.body)
        bookmark = BookmarkedItem.objects.create(
            user=request.user,
            type=data.get('type', ''),
            title=data.get('title', ''),
            category=data.get('category', '')
        )
        return JsonResponse({'success': True, 'id': bookmark.id})


@login_required
@csrf_exempt
def bookmark_detail_api(request, bookmark_id):
    """Bookmark detail API endpoint"""
    bookmark = get_object_or_404(BookmarkedItem, id=bookmark_id, user=request.user)
    
    if request.method == 'DELETE':
        bookmark.delete()
        return JsonResponse({'success': True})