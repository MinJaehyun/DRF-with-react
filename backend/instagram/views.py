from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet

from .models import Post
from .serializers import PostSerializer


class PostViewSet(ModelViewSet):
    queryset             = Post.objects.all()
    serializer_class     = PostSerializer
    permission_classes   = [AllowAny]
    # FIXME: permission_classes 는 아래에서 글로벌 설정한 뒤 삭제하기!
