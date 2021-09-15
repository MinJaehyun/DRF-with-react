from django.conf import settings
from django.db import models


class TimestampedModel(models.Model):
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
    abstract = True


class Post(TimestampedModel):
  photo         = models.ImageField(upload_to="instagram/post/%Y/%m/%d")
  caption       = models.CharField(max_length=500)
  location      = models.CharField(max_length=100)
  author        = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="my_post_set", on_delete=models.CASCADE)
  tag_set       = models.ManyToManyField("Tag", blank=True)
  like_user_set = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name="like_post_set")

  def __str__(self):
    return self.caption

  class Meta:
    ordering = ["-id"]


class Comment(TimestampedModel):
  author  = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  post    = models.ForeignKey(Post, on_delete=models.CASCADE)
  message = models.TextField()

  class Meta:
    ordering = ["-id"]


class Tag(TimestampedModel):
  name = models.CharField(max_length=50, unique=True)

  def __str__(self):
    return self.name
