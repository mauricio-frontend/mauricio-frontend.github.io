/*
	token 
	CAAJYx9p7LZBYBAJ3VfoD0SFsxh9TDZA3rawmFLMY6xlVSSTqGz3qvPUpgy3kJKB0GIpvPMYZALGsYDB98gsdBi5nByIRbbo6KZBRd6P1G0AZCUPHoOQonPrg449IYRZCUXzdlGRHkNyDxWFgeMl866ABhrb2nCkqEvReUl7bZBcKAnhn5y2z8YQM5n8FzbzhmiP4XbIlUtPtn318fLjHUFJ
*/	

var site = (function(){
	var bindLinkMorePosts = function() {
		$('.link-more-posts').off().on({
			'click' : function() {
				var $this = $(this);
				var nextUl = $('#section-posts').find('ul:hidden:eq(0)');
				if (nextUl.length > 0) {
					nextUl.css({
						'opacity' : 0,
						'display' : 'block'
					});

					nextUl.removeClass('hide-container');

					var nextUlYet = $('#section-posts').find('.hide-container');
					if (nextUlYet.length <= 0) {
						$this.animate({
							opacity : 0
						}, 500);
					}

					nextUl.animate({
							opacity : 1
						}, 
						{
							duration : 500
					})
				}
			}
		});
	};

	var loadImagePost = function(element) {
		var id = element.data('image');
		$.get('https://graph.facebook.com/v2.2/' + id + '?access_token=CAAJYx9p7LZBYBAJ3VfoD0SFsxh9TDZA3rawmFLMY6xlVSSTqGz3qvPUpgy3kJKB0GIpvPMYZALGsYDB98gsdBi5nByIRbbo6KZBRd6P1G0AZCUPHoOQonPrg449IYRZCUXzdlGRHkNyDxWFgeMl866ABhrb2nCkqEvReUl7bZBcKAnhn5y2z8YQM5n8FzbzhmiP4XbIlUtPtn318fLjHUFJ', function(dataImage){
			element.css('background-image' , 'url(' + dataImage['source'] + ')');
		});			
	};

	var buildPosts = function(posts) {		
		var containerPosts = $('#section-posts');
		var contentPosts = [],
			countPost = 1,
			classFirstPost = "first-post",
			newUl = "",
			iconPOst = "",
			textPost = "",
			linkPost = "",
			imagePost = "";


		contentPosts.push(
			'<ul class="list-posts full-width clearfix">'
		);

		for (var key in posts) {

			if (posts[key]['created_at']) {
				iconPOst = "icon-post-twitter";
				textPost = posts[key]['text'];
				linkPost = "https://twitter.com/mauricio_freela/status/" + posts[key]['id_str'];
				idImagePost = "";
			} else {
				iconPOst = "icon-post-facebook";
				textPost = posts[key]['message'];
				linkPost = posts[key]['actions']['0']['link'];
				idImagePost = posts[key]['object_id'];
			}

			if (countPost == 5) {
				contentPosts.push(
					'</ul><ul class="list-posts full-width clearfix hide-container">'
				);
				countPost = 1;
			}

			if (countPost == 1) {
				classFirstPost = "first-post";
			} else {
				classFirstPost = "";
			}

			contentPosts.push(
				'<li class="' + classFirstPost + '">',
						'<h3 class="title-post clearfix full-width">',
							'<span class="sprite ' + iconPOst + '"></span>',
							'<span class="text-title-post left"></span>',
						'</h3>',
						'<p class="description-posts">' + textPost + '</p>'
			);

			if (idImagePost != "") {
				contentPosts.push(
					'<div class="block-image-post" data-image="' + idImagePost + '"></div>'
				)
			}

			contentPosts.push(
						'<a class="link-details-post" href="' + linkPost + '" target="_blank">ver mais <span class="hover-details"></span></a>',
				'</li>'
			);

			countPost++;
		}

		contentPosts.push('</ul>');
		containerPosts.html(contentPosts.join(''));

		$("#description-posts").dotdotdot();

		$('#section-posts ul').animate({
				opacity : 1
			},
			{
				duration: 500
		});

		$('#section-posts').find('.block-image-post').each(function(){
			loadImagePost($(this));
		});

		if (posts.length > 4) {
			$('.link-more-posts').css({
				'visibility' : 'visible',
				'opacity' : '1'	
			});

			bindLinkMorePosts();
		}
	};

	var buildArray = function(fbData, twData) {
		var numIndex = 1, 
			arrayPosts = [];

		for (var fb in fbData['data']) {
			arrayPosts.push(fbData['data'][fb]);
		}


		for (var key in twData['tweets']) {
			arrayPosts.splice((parseInt(numIndex)), 0, twData['tweets'][key])
			numIndex = numIndex + 2;
		}

		buildPosts(arrayPosts);
	};

	var getPosts = function getPosts() {
		$.get('https://graph.facebook.com/v2.2/mauriciofrontend/promotable_posts?type=PHOTO&limit=10&access_token=CAAJYx9p7LZBYBAJ3VfoD0SFsxh9TDZA3rawmFLMY6xlVSSTqGz3qvPUpgy3kJKB0GIpvPMYZALGsYDB98gsdBi5nByIRbbo6KZBRd6P1G0AZCUPHoOQonPrg449IYRZCUXzdlGRHkNyDxWFgeMl866ABhrb2nCkqEvReUl7bZBcKAnhn5y2z8YQM5n8FzbzhmiP4XbIlUtPtn318fLjHUFJ', function(facebookData){
			$.getJSON('inc/config.php', function(twitterData){
				buildArray(facebookData, twitterData);
			});
		});
	};

	return {
		getPosts : function() {
			getPosts();
		}
	}

}());

site.getPosts();