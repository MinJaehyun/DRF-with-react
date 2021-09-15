from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):

	class Meta:
		model  = Post
		fields = "__all__"      # Fixme: 임시로 지정.. 작성자 에러날 것이다.
