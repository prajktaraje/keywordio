from rest_framework import routers
from accounts import views as accounts_views
from django.conf.urls import url, include
from django.urls import path

router = routers.DefaultRouter()
router.register(r'register', accounts_views.SignupViewSet, basename='register'),
router.register(r'book_list', accounts_views.BookList, basename='book_list'),
router.register(r'add_into_book_list', accounts_views.AddBook, basename='add_into_book_list'),
router.register(r'delete_book', accounts_views.DeleteBook, basename='delete_book'),
router.register(r'book_details', accounts_views.BookDetails, basename='book_details'),
router.register(r'update_book_details', accounts_views.UpdateBookDetails, basename='update_book_details'),

urlpatterns = [
    url(r'', include(router.urls)),
    url(r'^login', accounts_views.LoginViewSet.as_view(), name="login"),
]
