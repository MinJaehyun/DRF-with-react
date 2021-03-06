from .common import *

INSTALLED_APPS += [
  "debug_toolbar",
]

MIDDLEWARE += [
  "debug_toolbar.middleware.DebugToolbarMiddleware",
]

INTERNAL_IPS = ["127.0.0.1"]

# CORS_ORIGIN_WHITELIST = ["http://localhost:3000"]  # 별칭
CORS_ALLOWED_ORIGINS = ["http://localhost:3000"]
