from django.conf.urls.defaults import patterns, include, url
from django.contrib import admin
from mezzanine.core.views import direct_to_template
from django.conf.urls.defaults import *
from django.contrib.comments.models import Comment
from voting.views import vote_on_object
from imagestore.models import Album, Image
from hitcount.views import update_hit_count_ajax
from mezzanine.generic.models import ThreadedComment, Review, RequiredReviewRating
from userProfile.models import Broadcast, BroadcastDeal, BroadcastWish, GenericWish
from userProfile.views import edit_blog_image, broadcast, userwish, view_wish, get_wishlist, get_deallist, get_filtered_deallist, get_related_stores, shareObject, deleteObject, shareWish, shareDeal, shareStore, close_login_popup, get_profile_image , view_deal, view_post 
from userProfile.views import suggest_store, facebook_view, getShopTalk, getUserReviews, followObject, unfollowObject, followWish, unfollowWish, getTrendingStores, getTrendingDeals, getTrendingReviews, render_wish, get_reldata, get_reviews_by_user
from mezzanine.blog.views import blog_subcategories, get_vendors, get_vendors_all, get_vendors_allsub

comment_dict = {
    'model': ThreadedComment,
    'template_object_name': 'comment',
    'slug_field': 'slug',
    'allow_xmlhttprequest': 'true',    
}

review_rating_dict = {
    'model': RequiredReviewRating,
    'template_object_name': 'review',
    'slug_field': 'slug',
    'allow_xmlhttprequest': 'true',    
}

review_dict = {
    'model': Review,
    'template_object_name': 'review',
    'slug_field': 'slug',
    'allow_xmlhttprequest': 'true',    
}

album_dict = {
    'model': Album,
    'template_object_name': 'album',
    'slug_field': 'slug',
    'allow_xmlhttprequest': 'true',
}
image_dict = {
    'model': Image,
    'template_object_name': 'image',
    'slug_field': 'slug',
    'allow_xmlhttprequest': 'true',
}
generic_wish_dict = {
    'model': GenericWish,
    'template_object_name': 'GenericWish',
    'slug_field': 'slug',
    'allow_xmlhttprequest': 'true',    
}
broadcast_wish_dict = {
    'model': BroadcastWish,
    'template_object_name': 'BroadcastWish',
    'slug_field': 'slug',
    'allow_xmlhttprequest': 'true',    
}
broadcast_deal_dict = {
    'model': BroadcastDeal,
    'template_object_name': 'BroadcastDeal',
    'slug_field': 'slug',
    'allow_xmlhttprequest': 'true',    
}

admin.autodiscover()

# Add the urlpatterns for any custom Django applications here.
# You can also change the ``home`` view to add your own functionality
# to the project's homepage.

urlpatterns = patterns("",
    url(r'', include('social_auth.urls')),
    url(r'^relationships/', include('relationships.urls')),
    ('^activity/', include('actstream.urls')),
    url(r'^admin/chronograph/job/(?P<pk>\d+)/run/$', 'chronograph.views.job_run', name="chronograph_job_run"),
    # Change the admin prefix here to use an alternate URL for the
    # admin interface, which would be marginally more secure.
    ("^admin/", include(admin.site.urls)),
    url(r'^cropper/', include('cropper.urls')),
    url(r'^comments/(?P<object_id>\d+)/(?P<direction>up|down|clear)/vote/?$', vote_on_object, comment_dict, name="vote_on_comments"),
    url(r'^review/(?P<object_id>\d+)/(?P<direction>up|down|clear)/vote/?$', vote_on_object, review_dict, name="vote_on_reviews"),
    url(r'^reviewrating/(?P<object_id>\d+)/(?P<direction>up|down|clear)/vote/?$', vote_on_object, review_rating_dict, name="rating_on_reviews"),
    url(r'^albums/(?P<object_id>\d+)/(?P<direction>up|down|clear)/vote/?$', vote_on_object, album_dict, name="vote_on_albums"),
    url(r'^images/(?P<object_id>\d+)/(?P<direction>up|down|clear)/vote/?$', vote_on_object, image_dict, name="vote_on_images"),
    url(r'^post/(?P<object_id>\d+)/(?P<direction>up|down|clear)/vote/?$', vote_on_object, generic_wish_dict, name="vote_on_post"),
    url(r'^wish/(?P<object_id>\d+)/(?P<direction>up|down|clear)/vote/?$', vote_on_object, broadcast_wish_dict, name="vote_on_wish"), 
    url(r'^deal/(?P<object_id>\d+)/(?P<direction>up|down|clear)/vote/?$', vote_on_object, broadcast_deal_dict, name="vote_on_deal"),    
    url(r'^voters/(?P<content_type_id>\d+)/(?P<object_id>\d+)/$', 'voting.views.get_voters_info', name='get_voters_info'), 
    url(r'^voters/(?P<content_type_id>\d+)/(?P<object_id>\d+)/(?P<sIndex>\d+)/(?P<lIndex>\d+)/$', 'voting.views.get_voters_info_inc', name='get_voters_info_inc'), 
    (r"^gallery/", include("imagestore.urls", namespace="imagestore")),
    url(r'^object/hit/$', update_hit_count_ajax, name='hitcount_update_ajax'),
    url(r'^close_login_popup/$', close_login_popup, name='login_popup_close'),
    url(r'^find-friends/', include('social_friends_finder.urls')),
    (r'^messages/', include('django_messages.urls')),
    url(r'^notification/', include('notification.urls')),
    url(r'^broadcast/', broadcast, name="broadcast" ),
    url(r'^userwish/', userwish, name="userwish" ),
    url(r'^view_wish/(?P<wish_id>[\d]+)/$', view_wish, name='view_wish'),
    url(r'^view_deal/(?P<deal_id>[\d]+)/$', view_deal, name='view_deal'),
    url(r'^view_post/(?P<post_id>[\d]+)/$', view_post, name='view_post'),
    url('^', include('follow.urls')),
    url(r'^get_wishlist/(?P<content_type_id>\d+)/(?P<object_id>\d+)/(?P<sIndex>\d+)/(?P<lIndex>\d+)/$',
        get_wishlist, name='get_wishlist'),
    url(r'^get_deallist/(?P<content_type_id>\d+)/(?P<object_id>\d+)/(?P<sIndex>\d+)/(?P<lIndex>\d+)/$',
        get_deallist, name='get_deallist'),
    url(r'^filter/deals/(?P<store_id>\d+)/(?P<sub_category>[%&-_ \w\d]+)/(?P<sIndex>\d+)/(?P<lIndex>\d+)/$',
        get_filtered_deallist, name='get_filtered_deallist'),
    url(r'^filter/relatedstores/(?P<store_id>\d+)/(?P<sub_category>[%&-_ \w\d]+)/(?P<sIndex>\d+)/(?P<lIndex>\d+)/$',
        get_related_stores, name='get_related_stores'),
    url(r'^shareWish/(?P<wish_id>\d+)/$', shareWish, name='shareWish'),
    url(r'^shareDeal/(?P<deal_id>\d+)/$', shareDeal, name='shareDeal'),
    url(r'^share/store/(?P<store_id>\d+)/$', shareStore, name='shareStore'),
    url(r'^share/(?P<content_type_id>\d+)/(?P<object_id>\d+)/$', shareObject, name='shareObject'),
    url(r'^deleteObject/(?P<content_type_id>\d+)/(?P<object_id>\d+)/$', deleteObject, name='deleteObject'),
    url(r'^(?P<parent_category>[%&-_ \w\d]+)/(?P<sub_category>[%&-_ \w\d]+)/trendingstores/(?P<sIndex>\d+)/(?P<lIndex>\d+)/$', getTrendingStores , name='getTrendingStores'),
    url(r'^(?P<parent_category>[%&-_ \w\d]+)/(?P<sub_category>[%&-_ \w\d]+)/trendingdeals/(?P<sIndex>\d+)/(?P<lIndex>\d+)/$', getTrendingDeals , name='getTrendingDeals'),
    url(r'^(?P<parent_category>[%&-_ \w\d]+)/(?P<sub_category>[%&-_ \w\d]+)/trendingreviews/(?P<sIndex>\d+)/(?P<lIndex>\d+)/$', getTrendingReviews , name='getTrendingReviews'),
    url(r'^follow/wish/(?P<wish_id>\d+)/$', followWish, name='followWish'),
    url(r'^unfollow/wish/(?P<wish_id>\d+)/$', unfollowWish, name='unfollowWish'),
    url(r'^follow/(?P<content_type_id>\d+)/(?P<object_id>\d+)/$', followObject, name='followObject'),
    url(r'^unfollow/(?P<content_type_id>\d+)/(?P<object_id>\d+)/$', unfollowObject, name='unfollowObject'), 
    url(r'^(?P<category_slug>[-\w\d]+)/subcategories/$', blog_subcategories , name='blog_subcategories'),
    url(r'^getvendors/(?P<parent_category_slug>[%&-_ \w\d]+)/(?P<sub_category_slug>[%&-_ \w\d]+)/$', get_vendors, name="get_vendors" ),
    url(r'^getvendors/[%&-_ \w\d]+/$', get_vendors_allsub, name="get_vendors_allsub" ),
    url(r'^getvendors/$', get_vendors_all, name="get_vendors_all" ),
    url(r'^users/profile_image/(?P<username>[%&-_ \w\d]+)/$', get_profile_image, name="get_profile_image" ),
    url(r'^wish/(?P<wish_id>\d+)/$', render_wish, name='render_wish'),
    url(r'^reldata/(?P<content_type_id>\d+)/(?P<object_id>\d+)/$', get_reldata, name='get_reldata'),
    url(r'^get_reviews_by_user/(?P<user_id>\d+)/$', get_reviews_by_user, name='get_reviews_by_user'),  
    url(r'^blog/image/edit/(?P<blogpost_id>[\d]+)/$', edit_blog_image, name='edit_blog_image'),  
    url(r'^admin/django-ses/', include('django_ses.urls')),
    url(r'^user/reviews/(?P<user_id>\d+)/(?P<sIndex>\d+)/(?P<lIndex>\d+)/$', getUserReviews , name='getUserReviews'),
    url(r'^shop-talk/$', getShopTalk, name='getShopTalk'), 
    url(r'^facebook/$', facebook_view, name='facebook_view'),
    url(r'^suggest-store/$', suggest_store, name='suggest_store'),
    

    # We don't want to presume how your homepage works, so here are a
    # few patterns you can use to set it up.

    # HOMEPAGE AS STATIC TEMPLATE
    # ---------------------------
    # This pattern simply loads the index.html template. It isn't
    # commented out like the others, so it's the default. You only need
    # one homepage pattern, so if you use a different one, comment this
    # one out.

    url("^$", direct_to_template, {"template": "index.html"}, name="home"),
    # HOMEPAGE AS AN EDITABLE PAGE IN THE PAGE TREE
    # ---------------------------------------------
    # This pattern gives us a normal ``Page`` object, so that your
    # homepage can be managed via the page tree in the admin. If you
    # use this pattern, you'll need to create a page in the page tree,
    # and specify its URL (in the Meta Data section) as "/", which
    # is the value used below in the ``{"slug": "/"}`` part. Make
    # sure to uncheck all templates for the "show in menus" field
    # when you create the page, since the link to the homepage is
    # always hard-coded into all the page menus that display navigation
    # on the site. Also note that the normal rule of adding a custom
    # template per page with the template name using the page's slug
    # doesn't apply here, since we can't have a template called
    # "/.html" - so for this case, the template "pages/index.html" can
    # be used.

    # url("^$", "mezzanine.pages.views.page", {"slug": "/"}, name="home"),

    # HOMEPAGE FOR A BLOG-ONLY SITE
    # -----------------------------
    # This pattern points the homepage to the blog post listing page,
    # and is useful for sites that are primarily blogs. If you use this
    # pattern, you'll also need to set BLOG_SLUG = "" in your
    # ``settings.py`` module, and delete the blog page object from the
    # page tree in the admin if it was installed.

    # url("^$", "mezzanine.blog.views.blog_post_list", name="home"),

    # MEZZANINE'S URLS
    # ----------------
    # ADD YOUR OWN URLPATTERNS *ABOVE* THE LINE BELOW.
    # ``mezzanine.urls`` INCLUDES A *CATCH ALL* PATTERN
    # FOR PAGES, SO URLPATTERNS ADDED BELOW ``mezzanine.urls``
    # WILL NEVER BE MATCHED!

    # If you'd like more granular control over the patterns in
    # ``mezzanine.urls``, go right ahead and take the parts you want
    # from it, and use them directly below instead of using
    # ``mezzanine.urls``.
    ("^", include("mezzanine.urls")),

    # MOUNTING MEZZANINE UNDER A PREFIX
    # ---------------------------------
    # You can also mount all of Mezzanine's urlpatterns under a
    # URL prefix if desired. When doing this, you need to define the
    # ``SITE_PREFIX`` setting, which will contain the prefix. Eg:
    # SITE_PREFIX = "my/site/prefix"
    # For convenience, and to avoid repeating the prefix, use the
    # commented out pattern below (commenting out the one above of course)
    # which will make use of the ``SITE_PREFIX`` setting. Make sure to
    # add the import ``from django.conf import settings`` to the top
    # of this file as well.
    # Note that for any of the various homepage patterns above, you'll
    # need to use the ``SITE_PREFIX`` setting as well.

    # ("^%s/" % settings.SITE_PREFIX, include("mezzanine.urls"))

)

# Adds ``STATIC_URL`` to the context of error pages, so that error
# pages can use JS, CSS and images.
handler404 = "mezzanine.core.views.page_not_found"
handler500 = "mezzanine.core.views.server_error"
