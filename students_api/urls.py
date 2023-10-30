from django.urls import path
from .views import StudentList, StudentDetail, DepartmentList, DepartmentDetail, TeacherList, TeacherDetail

urlpatterns = [
    path('students/', StudentList.as_view() ),
    path('students/<int:pk>/', StudentDetail.as_view()),
    path('departments/', DepartmentList.as_view() ),
    path('departments/<int:pk>/', DepartmentDetail.as_view()),
    path('teachers/', TeacherList.as_view()),
    path('teachers/<int:pk>/', StudentDetail.as_view()),
    
]