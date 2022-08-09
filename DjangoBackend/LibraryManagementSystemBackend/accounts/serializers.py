from rest_framework import serializers
from accounts.models import *
from rest_framework.authtoken.models import Token
import json


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password')


class UserSerializer(serializers.ModelSerializer):
    auth_token = serializers.SerializerMethodField()
    password = serializers.CharField(required=False)
    
    class Meta:
        model = User
        fields = ('id','name','email','password','auth_token')

    
    def get_auth_token(self, user):
        try:
            token = user.auth_token.key
        except:
            token = Token.objects.create(user=user)
            token = token.key
        return token

    def get_role(self, instance):
        return instance.role.name if instance.role else ''

    def create(self, validated_data):

        request = self.context.get('request')

        user_obj = User.objects.filter(email__iexact=validated_data.get('email'))

        if user_obj.exists():
            user_obj.update(**validated_data)
            user_obj = User.objects.get(email__iexact=validated_data.get('email'))
        else:
            user_obj = User.objects.create(**validated_data)
            Token.objects.create(user=user_obj)
        if validated_data.get('password'):
            user_obj.set_password(validated_data.get('password'))

        user_obj.email = validated_data.get('email').lower()
        user_obj.save()
        return user_obj


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Books
        fields = ('id','book_name')