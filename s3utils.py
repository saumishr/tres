from storages.backends.s3boto import S3BotoStorage

class StaticS3Backend(S3BotoStorage):
	location = 'static'

class MediaS3Backend(S3BotoStorage):
	location = 'static/media'
