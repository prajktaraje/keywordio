from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(User)
class adminUser(admin.ModelAdmin):
    list_display = ['id', 'name', 'email','password']

admin.site.register(Books)


