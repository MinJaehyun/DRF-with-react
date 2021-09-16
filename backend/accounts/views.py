from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny

from .serializers import SignupSerializer


class SignupView(CreateAPIView):
  model = get_user_model() # User 대신 사용
  serializer_class = SignupSerializer # FIXME:
  permission_classes = [AllowAny]     # FIXME:
