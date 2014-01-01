
######################
# MEZZANINE SETTINGS #
######################
 
from django.template.defaultfilters import slugify
# The following settings are already defined with default values in
# the ``defaults.py`` module within each of Mezzanine's apps, but are
# common enough to be put here, commented out, for convenient
# overriding. Please consult the settings documentation for a full list
# of settings Mezzanine implements:
# http://mezzanine.jupo.org/docs/configuration.html#default-settings

# Controls the ordering and grouping of the admin menu.
#
# ADMIN_MENU_ORDER = (
#     ("Content", ("pages.Page", "blog.BlogPost",
#        "generic.ThreadedComment", ("Media Library", "fb_browse"),)),
#     ("Site", ("sites.Site", "redirects.Redirect", "conf.Setting")),
#     ("Users", ("auth.User", "auth.Group",)),
# )

# A three item sequence, each containing a sequence of template tags
# used to render the admin dashboard.
#
# DASHBOARD_TAGS = (
#     ("blog_tags.quick_blog", "mezzanine_tags.app_list"),
#     ("comment_tags.recent_comments",),
#     ("mezzanine_tags.recent_actions",),
# )

# A sequence of templates used by the ``page_menu`` template tag. Each
# item in the sequence is a three item sequence, containing a unique ID
# for the template, a label for the template, and the template path.
# These templates are then available for selection when editing which
# menus a page should appear in. Note that if a menu template is used
# that doesn't appear in this setting, all pages will appear in it.

# PAGE_MENU_TEMPLATES = (
#     (1, "Top navigation bar", "pages/menus/dropdown.html"),
#     (2, "Left-hand tree", "pages/menus/tree.html"),
#     (3, "Footer", "pages/menus/footer.html"),
# )

# A sequence of fields that will be injected into Mezzanine's (or any
# library's) models. Each item in the sequence is a four item sequence.
# The first two items are the dotted path to the model and its field
# name to be added, and the dotted path to the field class to use for
# the field. The third and fourth items are a sequence of positional
# args and a dictionary of keyword args, to use when creating the
# field instance. When specifying the field class, the path
# ``django.models.db.`` can be omitted for regular Django model fields.
#
# EXTRA_MODEL_FIELDS = (
#     (
#         # Dotted path to field.
#         "mezzanine.blog.models.BlogPost.image",
#         # Dotted path to field class.
#         "somelib.fields.ImageField",
#         # Positional args for field class.
#         ("Image",),
#         # Keyword args for field class.
#         {"blank": True, "upload_to": "blog"},
#     ),
#     # Example of adding a field to *all* of Mezzanine's content types:
#     (
#         "mezzanine.pages.models.Page.another_field",
#         "IntegerField", # 'django.db.models.' is implied if path is omitted.
#         ("Another name",),
#         {"blank": True, "default": 1},
#     ),
# )

# Setting to turn on featured images for blog posts. Defaults to False.
BLOG_USE_FEATURED_IMAGE = True
# vdhawal: enable account verification for production
#ACCOUNTS_VERIFICATION_REQUIRED = True 

# If True, the south application will be automatically added to the
# INSTALLED_APPS setting.
USE_SOUTH = True

########################
# MAIN DJANGO SETTINGS #
########################

# People who get code error notifications.
# In the format (('Full Name', 'email@example.com'),
#                ('Full Name', 'anotheremail@example.com'))
ADMINS = (
    ('Saurabh Mishra', 'msaurabh.nitw@gmail.com'),
)
MANAGERS = ADMINS

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# On Unix systems, a value of None will cause Django to use the same
# timezone as the operating system.
# If running in a Windows environment this must be set to the same as your
# system time zone.
TIME_ZONE = "Asia/Calcutta"

# If you set this to True, Django will use timezone-aware datetimes.
USE_TZ = True

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = "en"

# A boolean that turns on/off debug mode. When set to ``True``, stack traces
# are displayed for error pages. Should always be set to ``False`` in
# production. Best set to ``True`` in local_settings.py
DEBUG = False

# Whether a user's session cookie expires when the Web browser is closed.
SESSION_EXPIRE_AT_BROWSER_CLOSE = True

SITE_ID = 1

SITE_TITLE = "WishRadio"

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = False

# Make this unique, and don't share it with anybody.
SECRET_KEY = "bcc8efa3-34be-472c-9e7f-229b13e406fc1da67a66-99d5-40f8-8400-ec15329f02667184b876-7a6a-45e0-b89d-f8208accf1d5"

# Tuple of IP addresses, as strings, that:
#   * See debug comments, when DEBUG is true
#   * Receive x-headers
INTERNAL_IPS = ("127.0.0.1",)

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    "django.template.loaders.app_directories.Loader",
    "django.template.loaders.filesystem.Loader",
)

AUTHENTICATION_BACKENDS = (
    "mezzanine.core.auth_backends.MezzanineBackend",
)

# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = (
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
    "compressor.finders.CompressorFinder",
#    'django.contrib.staticfiles.finders.DefaultStorageFinder',
)


#############
# DATABASES #
#############

DATABASES = {
    "default": {
        # Add "postgresql_psycopg2", "mysql", "sqlite3" or "oracle".
        "ENGINE": "django.db.backends.",
        # DB name or path to database file if using sqlite3.
        "NAME": "",
        # Not used with sqlite3.
        "USER": "",
        # Not used with sqlite3.
        "PASSWORD": "",
        # Set to empty string for localhost. Not used with sqlite3.
        "HOST": "",
        # Set to empty string for default. Not used with sqlite3.
        "PORT": "",
    }
}


#########
# PATHS #
#########

import os
import sys
from django.conf import settings
SITE_ROOT = os.path.dirname(os.path.realpath(__file__))
PROJECT_PATH = os.path.abspath(os.path.dirname(__name__))

# Full filesystem path to the project.
PROJECT_ROOT = os.path.dirname(os.path.realpath(__file__))
sys.path.insert(0,os.path.join(PROJECT_ROOT,"apps"))
sys.path.insert(0,os.path.join(PROJECT_ROOT,"django-relationships"))
sys.path.insert(0,os.path.join(PROJECT_ROOT,"django-voting"))
sys.path.insert(0,os.path.join(PROJECT_ROOT,"django-hitcount"))
sys.path.insert(0,os.path.join(PROJECT_ROOT,"django-social-friends-finder"))
sys.path.insert(0,os.path.join(PROJECT_ROOT,"django-messages"))
sys.path.insert(0,os.path.join(PROJECT_ROOT,"django-notification"))
sys.path.insert(0,os.path.join(PROJECT_ROOT,"django-follow"))
sys.path.insert(0,os.path.join(PROJECT_ROOT,"django-image-cropper"))
sys.path.insert(0,os.path.join(PROJECT_ROOT,"django-widget-tweaks"))

DEFAULT_FILE_STORAGE = 's3utils.MediaS3Backend'  #'storages.backends.s3boto.S3BotoStorage'
#STATICFILES_STORAGE = 'storages.backends.s3boto.S3BotoStorage'
STATICFILES_STORAGE = 's3utils.StaticS3Backend'
COMPRESS_STORAGE = STATICFILES_STORAGE
AWS_QUERYSTRING_AUTH = False
AWS_S3_SECURE_URLS = False
AWS_S3_URL_PROTOCOL = 'http'
AWS_ACCESS_KEY_ID = 'AKIAJIJ53XPMKAOV7TDQ'
AWS_SECRET_ACCESS_KEY = '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'
AWS_STORAGE_BUCKET_NAME = 'www.wishradio-dev.in'
AWS_LOCATION = 'static'

S3_URL = 'http://%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME
STATIC_DIRECTORY = '/static/'
STATIC_URL = S3_URL + STATIC_DIRECTORY

STORAGE_ROOT = 'static/media'

#sys.path.insert(0,os.path.join(PROJECT_ROOT,"django-social-path"))
# Name of the directory for the project.
PROJECT_DIRNAME = PROJECT_ROOT.split(os.sep)[-1]

# Every cache key will get prefixed with this value - here we set it to
# the name of the directory the project is in to try and use something
# project specific.
CACHE_MIDDLEWARE_KEY_PREFIX = PROJECT_DIRNAME

# URL prefix for static files.
# Example: "http://media.lawrence.com/static/"
#STATIC_URL = "/static/"

# Absolute path to the directory static files should be collected to.
# Don't put anything in this directory yourself; store your static files
# in apps' "static/" subdirectories and in STATICFILES_DIRS.
# Example: "/home/media/media.lawrence.com/static/"
STATIC_ROOT = STATIC_URL  #os.path.join(PROJECT_ROOT, STATIC_URL.strip("/"))

# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash.
# Examples: "http://media.lawrence.com/media/", "http://example.com/media/"
MEDIA_URL = STATIC_URL + "media/"

# Absolute filesystem path to the directory that will hold user-uploaded files.
# Example: "/home/media/media.lawrence.com/media/"
MEDIA_ROOT = ''#os.path.join(PROJECT_ROOT, *MEDIA_URL.strip("/").split("/"))

# URL prefix for admin media -- CSS, JavaScript and images. Make sure to use a
# trailing slash.
# Examples: "http://foo.com/media/", "/media/".
ADMIN_MEDIA_PREFIX = STATIC_URL + "grappelli/"

# Package/module name to import the root urlpatterns from for the project.
ROOT_URLCONF = "%s.urls" % PROJECT_DIRNAME

# Put strings here, like "/home/html/django_templates"
# or "C:/www/django/templates".
# Always use forward slashes, even on Windows.
# Don't forget to use absolute paths, not relative paths.
TEMPLATE_DIRS = (os.path.join(PROJECT_ROOT, "templates"),)
SITE_ROOT = os.path.dirname(os.path.realpath(__file__))
PROJECT_PATH = os.path.abspath(os.path.dirname(__name__))

################
# APPLICATIONS #
################

INSTALLED_APPS = (   
    "cropper",
    "userProfile", 
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.redirects",
    "django.contrib.sessions",
    "django.contrib.sites",
    "django.contrib.sitemaps",
    "django.contrib.staticfiles",
    "mezzanine.boot",
    "mezzanine.conf",
    "mezzanine.core",
    "mezzanine.generic",
    "mezzanine.blog",
    "mezzanine.forms",
    "mezzanine.pages",
    "mezzanine.galleries",
    "mezzanine.twitter",
    "mezzanine.accounts",
    "mezzanine.mobile",
    "social_auth",
    "relationships",
    "south",
    "actstream",
    "voting",
    "tagging",
    "sorl.thumbnail",
    "imagestore",
    "hitcount",
    "social_friends_finder",
    "notification",
    "django_messages",
    "follow",
    "widget_tweaks",
    "storages",
    "django_ses",
    "chronograph",
)

# List of processors used by RequestContext to populate the context.
# Each one should be a callable that takes the request object as its
# only parameter and returns a dictionary to add to the context.
TEMPLATE_CONTEXT_PROCESSORS = (
    "django.contrib.auth.context_processors.auth",
    "django.contrib.messages.context_processors.messages",
    "django.core.context_processors.debug",
    "django.core.context_processors.i18n",
    "django.core.context_processors.static",
    "django.core.context_processors.media",
    "django.core.context_processors.request",
    "django.core.context_processors.tz",
    "mezzanine.conf.context_processors.settings",
    "social_auth.context_processors.social_auth_by_type_backends",
#)
    "social_auth.context_processors.social_auth_by_name_backends",
    "social_auth.context_processors.social_auth_backends",
    "social_auth.context_processors.social_auth_by_type_backends",
    "social_auth.context_processors.social_auth_login_redirect",
    'django_messages.context_processors.inbox',
)

# List of middleware classes to use. Order is important; in the request phase,
# these middleware classes will be applied in the order given, and in the
# response phase the middleware will be applied in reverse order.
MIDDLEWARE_CLASSES = (
    "mezzanine.core.middleware.UpdateCacheMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.redirects.middleware.RedirectFallbackMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "mezzanine.core.request.CurrentRequestMiddleware",
    "mezzanine.core.middleware.TemplateForDeviceMiddleware",
    "mezzanine.core.middleware.TemplateForHostMiddleware",
    "mezzanine.core.middleware.AdminLoginInterfaceSelectorMiddleware",
    "mezzanine.core.middleware.SitePermissionMiddleware",
    # Uncomment the following if using any of the SSL settings:
    # "mezzanine.core.middleware.SSLRedirectMiddleware",
    "mezzanine.pages.middleware.PageMiddleware",
    "mezzanine.core.middleware.FetchFromCacheMiddleware",
)

# Store these package names here as they may change in the future since
# at the moment we are using custom forks of them.
PACKAGE_NAME_FILEBROWSER = "filebrowser_safe"
PACKAGE_NAME_GRAPPELLI = "grappelli_safe"

#########################
# OPTIONAL APPLICATIONS #
#########################

# These will be added to ``INSTALLED_APPS``, only if available.
OPTIONAL_APPS = (
    "debug_toolbar",
    "django_extensions",
    "compressor",
    PACKAGE_NAME_FILEBROWSER,
    PACKAGE_NAME_GRAPPELLI,
)

DEBUG_TOOLBAR_CONFIG = {"INTERCEPT_REDIRECTS": False}

###################
# DEPLOY SETTINGS #
###################

# These settings are used by the default fabfile.py provided.
# Check fabfile.py for defaults.

# FABRIC = {
#     "SSH_USER": "", # SSH username
#     "SSH_PASS":  "", # SSH password (consider key-based authentication)
#     "SSH_KEY_PATH":  "", # Local path to SSH key file, for key-based auth
#     "HOSTS": [], # List of hosts to deploy to
#     "VIRTUALENV_HOME":  "", # Absolute remote path for virtualenvs
#     "PROJECT_NAME": "", # Unique identifier for project
#     "REQUIREMENTS_PATH": "", # Path to pip requirements, relative to project
#     "GUNICORN_PORT": 8000, # Port gunicorn will listen on
#     "LOCALE": "en_US.UTF-8", # Should end with ".UTF-8"
#     "LIVE_HOSTNAME": "www.example.com", # Host for public site.
#     "REPO_URL": "", # Git or Mercurial remote repo URL for the project
#     "DB_PASS": "", # Live database password
#     "ADMIN_PASS": "", # Live admin user password
# }


##################
# LOCAL SETTINGS #
##################

# Allow any settings to be defined in local_settings.py which should be
# ignored in your version control system allowing for settings to be
# defined per machine.
try:
    from local_settings import *
except ImportError:
    pass

####################
# DYNAMIC SETTINGS #
####################

# set_dynamic_settings() will rewrite globals based on what has been
# defined so far, in order to provide some better defaults where
# applicable. We also allow this settings module to be imported
# without Mezzanine installed, as the case may be when using the
# fabfile, where setting the dynamic settings below isn't strictly
# required.
try:
    from mezzanine.utils.conf import set_dynamic_settings
except ImportError:
    pass
else:
    set_dynamic_settings(globals())


# SOCIAL AUTH SETTINGS
FACEBOOK_APP_ID 		= '1401801733391485'
FACEBOOK_API_SECRET 		= '7b361ac05bef9539b7010c9505b89b6c'
TWITTER_CONSUMER_KEY         	= 'tDEt17kvm6TMCeOqwZ1ow'
TWITTER_CONSUMER_SECRET      	= 'M9rSGr5h2FtE1xk4X8R5b0ysr2QfCHP5HETlNVITjM'
GOOGLE_OAUTH2_CLIENT_ID 	= '618532174899-rf35i3t4f6l9drhthgc007scs24a7orl.apps.googleusercontent.com'
GOOGLE_OAUTH2_CLIENT_SECRET 	= 'hSfKg98h7W4R5Zp3vSBt27O2'
GOOGLE_OAUTH_EXTRA_SCOPE =  [ 
                                 'https://www.google.com/m8/feeds', 
                            ]
SOCIAL_AUTH_ENABLED_BACKENDS = ('facebook', 'twitter', 'google',)
SOCIAL_AUTH_COMPLETE_URL_NAME = 'socialauth_complete'
SOCIAL_AUTH_ASSOCIATE_URL_NAME = 'associate_complete'
SOCIAL_AUTH_DEFAULT_USERNAME =  'new_social_auth_user' # you'll need to import slugify from 'django.template.defaultfilters'
SOCIAL_AUTH_EXTRA_DATA = False
SOCIAL_AUTH_CHANGE_SIGNAL_ONLY = True
SOCIAL_AUTH_ASSOCIATE_BY_MAIL = True
#FACEBOOK_AUTH_EXTRA_ARGUMENTS = {'display': 'popup'}

TWITTER_EXTRA_DATA = [('profile_image_url', 'profile_image_url'), ('location', 'location')]
FACEBOOK_EXTRA_DATA = [('birthday', 'birthday'), ('location', 'location'), ('gender', 'gender')]
GOOGLE_OAUTH2_EXTRA_DATA = [('picture', 'picture'), ('birthday', 'birthday'), ('gender', 'gender')]
AUTHENTICATION_BACKENDS = (
    'social_auth.backends.google.GoogleOAuth2Backend',
    'social_auth.backends.twitter.TwitterBackend',
    'social_auth.backends.facebook.FacebookBackend',
    'mezzanine.core.auth_backends.MezzanineBackend',
    'django.contrib.auth.backends.ModelBackend',
)




LOGIN_URL          = '/login-form/'
LOGIN_REDIRECT_URL = '/'
LOGIN_ERROR_URL    = '/login-error/'
AUTH_PROFILE_MODULE= 'userProfile.UserProfile'
#AUTH_PROFILE_MODULE= 'socialprofile.SocialProfile'
DJANGORESIZED_DEFAULT_SIZE = [800, 600]
#HITCOUNT_KEEP_HIT_ACTIVE = { 'days': 7 }
#HITCOUNT_HITS_PER_IP_LIMIT = 0
#HITCOUNT_EXCLUDE_USER_GROUP = ('',)

# NOTIFICATION_BACKENDS = [
#     ("email", "seacucumber.backend.SESBackend"),
# ]

AWS_QUERYSTRING_AUTH = False
NOTIFICATION_QUEUE_ALL=True
EMAIL_USE_TLS = True
EMAIL_HOST = 'email-smtp.us-east-1.amazonaws.com'
EMAIL_HOST_USER = 'AKIAI6IIA6QQEEVDFKQQ'    #SES username
EMAIL_HOST_PASSWORD = 'AnykCYSamXcYO16WNs0HvjzHpM+lSH3v/05C68n/FGoQ'  #SES password
EMAIL_PORT = 587
AWS_SES_REGION_NAME = 'us-east-1'
AWS_SES_REGION_ENDPOINT = 'email.us-east-1.amazonaws.com'
DEFAULT_FROM_EMAIL = 'msaurabh.nitw@gmail.com'
SERVER_EMAIL = 'msaurabh.nitw@gmail.com'
# NOTIFICATION_BACKENDS = [("tresratings@gmail.com", "seacucumber.backend.SESBackend"),]
EMAIL_BACKEND = 'django_ses.SESBackend' #'seacucumber.backend.SESBackend'
AWS_ACCESS_KEY_ID = 'AKIAJIJ53XPMKAOV7TDQ'
AWS_SECRET_ACCESS_KEY = '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'

COMPRESS_ENABLED = True
COMPRESS_OFFLINE = True
COMPRESS_URL = STATIC_URL
COMPRESS_ROOT = STATIC_ROOT
#other code....

#Imagestore Settings
MAX_IMAGES_PER_VENDOR = 50
IMAGESTORE_IMAGE_QUALITY = 95
FILE_UPLOAD_PERMISSIONS = 0644
MAX_IMAGE_WIDTH = 1000.0
MAX_IMAGE_HEIGHT = 1000.0
#Django Cache Settings
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
        'LOCATION': '/var/tmp/django_cache',
    }
}

#Activity Feed Settings
ACTSTREAM_SETTINGS = {
    'MODELS': ('auth.user', 'auth.group', 'sites.site', 'comments.comment', 'blog.blogpost','generic.threadedcomment','voting.Vote','imagestore.Album','imagestore.Image','actstream.action','mezzanine.blog.BlogPost','userProfile.broadcast','userProfile.genericwish','userProfile.broadcastwish','userProfile.broadcastdeal','generic.review',),
    'MANAGER': 'userProfile.streams.FeedActionManager',
    'FETCH_RELATIONS': True,
    'USE_PREFETCH': True,
    'USE_JSONFIELD': True,
    'GFK_FETCH_DEPTH': 0,
}
WISH_LIKE_VERB              = u'liked the wish'
DEAL_LIKE_VERB              = u'liked the deal'
POST_LIKE_VERB              = u'liked the post'
ALBUM_LIKE_WISH             = u'liked the album'
REVIEW_COMMENT_LIKE_VERB    = u'liked the comment on the review'
ALBUM_COMMENT_LIKE_VERB     = u'liked the comment on the album'
IMAGE_COMMENT_LIKE_VERB     = u'liked the comment on the image'
DEAL_COMMENT_LIKE_VERB      = u'liked the comment on the deal'
WISH_COMMENT_LIKE_VERB      = u'liked the comment on the wish'
POST_COMMENT_LIKE_VERB      = u'liked the comment on the post'
REVIEW_LIKE_VERB            = u'liked the review'
PHOTO_LIKE_VERB             = u'liked the photo'
REVIEW_POST_VERB            = u'has posted a review'
GOT_REVIEW_VERB             = u'has got a new review'
REVIEW_COMMENT_VERB         = u'has commented on review'
ALBUM_COMMENT_VERB          = u'has commented on the album'
IMAGE_COMMENT_VERB          = u'has commented on the image'
DEAL_COMMENT_VERB           = u'has commented on the deal'
WISH_COMMENT_VERB           = u'has commented on the wish'
ALBUM_ADD_VERB              = u'added new album'
ALBUM_ADD_IMAGE_VERB        = u'added new images to the album'
FOLLOW_VERB                 = u'started following'
UNFOLLOW_VERB               = u'stopped following'
SAID_VERB                   = u'said:'
SHARE_VERB                  = u'shared'
DEAL_POST_VERB              = u'posted a deal'
WISH_POST_VERB              = u'posted a wish'
POST_COMMENT_VERB           = u'has commented on post'

REVIEWS_PER_PAGE = 10
#Trend Settings
SEARCH_PER_PAGE = 10
MAX_PAGING_LINKS = 10
DEALS_NUM_LATEST =  10
STORES_NUM_LATEST = 15
MIN_STORES_HOME_PAGE = 15
MIN_REVIEWS_HOME_PAGE = 10
MIN_DEALS_HOME_PAGE = 10
USE_X_FORWARDED_HOST = True
REVIEW_TITLE_MAX_LENGTH = 250

MIN_VOTERS_CHUNK = 10
MIN_FOLLOWERS_CHUNK = 10 
MIN_COMMENTERS_CHUNK = 10
MIN_REVIEWS_STORE_PAGE = 10
MIN_REVIEWS_FOR_USER = 10
BASE_URL = 'http://www.domain1.com'

#Error Codes
DEAL_IMAGE_REQUIRED                 = 100
DEAL_EXPIRY_DATE_REQUIRED           = 101
DEAL_SUB_CATEGORY_REQUIRED          = 102
WISH_PARENT_CATEGORY_REQUIRED       = 103
WISH_SUB_CATEGORY_REQUIRED          = 104
POST_DATA_REQUIRED                  = 105
WISH_PARENT_CATEGORY_MISMATCH       = 106
DEAL_EXPIRY_DATE_INVALID            = 107

UNAUTHORIZED_OPERATION              = 400
OBJECT_DOES_NOT_EXIST               = 401
AJAX_ONLY_SUPPORT                   = 402
INSUFFICIENT_DATA                   = 403
