from django.contrib import admin
from .models import Student, Department, Teacher
admin.site.site_header = 'STUDENT MANAGEMENT SYSTEM API'
admin.site.site_title = 'SMS API'
admin.site.index_title = 'Student Management app'

# Register your models here.

@admin.register(Student)
class StudentAdminModel(admin.ModelAdmin):
    list_display = [ 'first_name', 'last_name', 'gender', 'date_of_birth', 'reg_number', 'religion']
@admin.register(Teacher)    
class TeacherAdminModel(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'teacher_id', 'department', 'gender']   
    
@admin.register(Department)    
class DepartmentAdminModel(admin.ModelAdmin):
    list_display = ['department_name', 'department_code', 'head_of_department']
    

        
    
      
    
    