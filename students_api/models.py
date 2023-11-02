from django.db import models


# Create your models here.
class Department(models.Model):
    department_name = models.CharField(max_length=200)
    department_code = models.CharField(max_length=20,unique=True)
    head_of_department = models.CharField(max_length=200)
    
    def __str__(self):
        return self.department_name
        
    

    
class Teacher(models.Model):

    GENDER = [
        ('MALE', 'MALE'),
        ('FEMALE', 'FEMALE'),
       
    ]
    
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    teacher_id = models.CharField(max_length=50, unique=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
   
    gender = models.CharField(max_length=50, choices=GENDER)
    
    def __str__(self):
       return f'{self.first_name} {self.last_name}'

        
                
class Student(models.Model):
    GENDER = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('other', 'other')
    ]
    
    RELIGION = [
        ('Christian', 'Christian'),
        ('Muslim', 'Muslim'),
        ('Hindu', 'Hindu'),
        ('Other', 'Other')
    ]
    
 
    first_name = models.CharField(max_length=250, blank=True, null=True)
    last_name = models.CharField(max_length=250, blank=True, null=True)
    email =models.EmailField()
    gender = models.CharField(choices=GENDER, max_length=100, blank=True, null=True)
    date_of_birth = models.DateField()
    reg_number = models.CharField(null=True, max_length = 100, blank=True)
    religion = models.CharField(choices=RELIGION ,max_length=50, null=True, blank=True)
    
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    class Meta:
        db_table = 'student'
        
    

