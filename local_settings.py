DEBUG = False
ALLOWED_HOSTS = [
    '.wishradio-dev.in',
]

COMPRESS_PARSER = 'compressor.parser.HtmlParser'

DATABASES = {
    "default": {
        # Ends with "postgresql_psycopg2", "mysql", "sqlite3" or "oracle".
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        # DB name or path to database file if using sqlite3.
        "NAME": "ubuntu",
        # Not used with sqlite3.
        "USER": "ubuntu",
        # Not used with sqlite3.
        "PASSWORD": "W1shrad10",
        # Set to empty string for localhost. Not used with sqlite3.
        "HOST": "localhost",
        # Set to empty string for default. Not used with sqlite3.
        "PORT": "5432",
    }
}
