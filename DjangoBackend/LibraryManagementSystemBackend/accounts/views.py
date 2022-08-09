from django.shortcuts import render
from django.contrib.auth import login, logout, authenticate
from rest_framework.response import Response
from rest_framework import viewsets, status, permissions
from .serializers import *
from accounts.models import User
from rest_framework.generics import GenericAPIView
from LibraryManagementSystemBackend.backends.backends import AuthBackend


class LoginViewSet(GenericAPIView):
    serializer_class = LoginSerializer
    queryset = User.objects.filter().exclude(is_superuser=True)
    auth_obj = AuthBackend()

    def post(self, request):
        data = request.data
        query = User.objects.filter(email__iexact=data.get('email'))
        if query:
            query = self.auth_obj.authenticate(email=data.get('email'), password=data.get('password'))
            if query and query.is_active:
                login(request, query)
                return Response({"user_details": UserSerializer(query, many=False,
                                                                context={"request": request}).data,
                                 }, status=status.HTTP_200_OK)
            elif not query:
                return Response({"detail": "Incorrect Password."},
                                status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"detail": "Incorrect Email Id"},
                            status=status.HTTP_400_BAD_REQUEST)


# Create your views here.
"""This API is for registration"""
class SignupViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.filter().exclude(is_superuser=True)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        data = request.data
        if User.objects.filter(email__iexact=data.get('email')).exists():
            return Response({"detail": 'user with this email address already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = UserSerializer(data=data, many=False, context={"request": request})
        if serializer.is_valid():
            user = serializer.save()
            context = {
                "user_details": UserSerializer(user, many=False, context={"request": request}).data
            }
            return Response(context, status=status.HTTP_200_OK)
        elif serializer.errors:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)



class BookList(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Books.objects.all()
    # permission_classes = (permissions.IsAuthenticated,)
    http_method_names = ['get']

    """This API is for books listing"""
    def list(self, request, *args, **kwargs):
        obj = Books.objects.all()
        data = BookSerializer(obj, many=True, context={"request": request}).data
        return Response(data, status=status.HTTP_200_OK)


class AddBook(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Books.objects.all()
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        data = request.data

        obj = Books.objects.create(book_name=data.get('book_name'))
        obj.save()

        return Response({"detail": "Book name uploaded successfully."},
                        status=status.HTTP_200_OK)

class DeleteBook(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Books.objects.all()
    http_method_names = ['delete']

    def destroy(self, request, *args, **kwargs):
        user = request.user
        pk = self.kwargs.get('pk')
        book_obj = Books.objects.filter(id=pk).exists()
        if book_obj:
            Books.objects.filter(id=pk).delete()
            context = {
                'message': 'Data deleted successfully!'
            }
            return Response(context, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Data not found."},
                            status=status.HTTP_400_BAD_REQUEST)



class BookDetails(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Books.objects.all()
    # permission_classes = (permissions.IsAuthenticated,)
    http_method_names = ['get']

    """This API is for books listing"""
    def list(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        obj = Books.objects.filter(id = pk).exists()
        if obj:
            book_details = Books.objects.get(id = pk)
        data = BookSerializer(book_details, many=False, context={"request": request}).data
        return Response(data, status=status.HTTP_200_OK)


class UpdateBookDetails(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Books.objects.all()
    # permission_classes = (permissions.IsAuthenticated,)
    http_method_names = ['put']

    def update(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        data = request.data
        book_name = data.get('book_name')

        if Books.objects.filter(id=pk).exists():
            book = Books.objects.get(id=pk)
            book.book_name = book_name
            book.save()
            data = BookSerializer(book, many=False, context={"request": request}).data
            return Response(data, status=status.HTTP_200_OK)

        else:
            return Response({"message": "No data found."},
                            status=status.HTTP_400_BAD_REQUEST)
