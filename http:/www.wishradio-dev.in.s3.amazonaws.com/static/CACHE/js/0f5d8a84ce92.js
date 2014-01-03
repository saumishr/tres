var get_trending_deals_handler=function(parent_category,sub_category)
{var $url='/'+parent_category+'/'+sub_category+'/trendingdeals/0/5/';var $element=$('#topDealsForStoreCategory');var $scrollContainer=$element.find(".scrollContainer");if($scrollContainer&&$scrollContainer.hasClass('mCustomScrollbar')){$scrollContainer.mCustomScrollbar("scrollTo","left");}
$.get($url,{},function(data){if(data.success===true){var $data_container=$scrollContainer.find('.mCSB_container');if(!$data_container)
$data_container=$scrollContainer
$data_container.html(data.html);install_voting_handlers($scrollContainer);install_share_object_handler($element);$scrollContainer.attr("data-href",$url);$('a.wishimg-deal-homepage').fancybox({scrolling:'yes',minWidth:500,minHeight:450,autoSize:true,helpers:{overlay:{locked:false}}});}else{$scrollContainer.removeAttr("data-href");}});return false;}
var get_top_stores_handler=function(parent_category,sub_category)
{var $element=$('#topStoresForStoreCategory');if(!$element||$element.length==0){return;}
var $scrollContainer=null;if($element.hasClass("scrollContainer")){$scrollContainer=$element;}else{$scrollContainer=$element.find(".scrollContainer");}
if($scrollContainer&&$scrollContainer.hasClass('mCustomScrollbar')){$scrollContainer.mCustomScrollbar("scrollTo","top");}
var $url='/'+parent_category+'/'+sub_category+'/trendingstores/0/15/';$.get($url,{},function(data){if(data.success===true){var $data_container=$scrollContainer.find('.mCSB_container');if(!$data_container)
$data_container=$scrollContainer
$data_container.html(data.html);$scrollContainer.attr("data-href",$url);}else{$scrollContainer.removeAttr("data-href");}});return false;}
var get_top_reviews_handler=function(parent_category,sub_category)
{var $element=$('#topReviewsForStoreCategory');if(!$element||$element.length==0){return;}
var $scrollContainer=null;if($element.hasClass("scrollContainer")){$scrollContainer=$element;}else{$scrollContainer=$element.find(".scrollContainer");}
if($scrollContainer&&$scrollContainer.hasClass('mCustomScrollbar')){$scrollContainer.mCustomScrollbar("scrollTo","top");}
var $url='/'+parent_category+'/'+sub_category+'/trendingreviews/0/10/';$.get($url,{},function(data){if(data.success===true){var $data_container=$scrollContainer.find('.mCSB_container');if(!$data_container)
$data_container=$scrollContainer
$data_container.html(data.html);$scrollContainer.attr("data-href",$url);install_toggle_comment_handler();}else{$scrollContainer.removeAttr("data-href");}});return false;}
var update_trends_handler=function(event,elementClicked)
{var $this=$(elementClicked);if($this.hasClass('imageCategoryBoxSelected')){return;}else{$('.updateTrends').removeClass('imageCategoryBoxSelected');$this.addClass('imageCategoryBoxSelected');var parent_category_slug=$this.text().trim();var sub_category_slug="all";get_top_reviews_handler(parent_category_slug,sub_category_slug);get_top_stores_handler(parent_category_slug,sub_category_slug);get_trending_deals_handler(parent_category_slug,sub_category_slug);}
return false;}