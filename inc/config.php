<?php
	session_start();
	require_once("twitter/twitteroauth/twitteroauth.php"); //Path to twitteroauth library
	 
	$twitteruser = "mauricio_freela";
	$notweets = 10;
	$consumerkey = "RhBqC3S9FUTREj3gGaT2V6G9C";
	$consumersecret = "NPLGJ6apDKCNtgSC2CBRQqYzBnXmxu0svRzsSd3TMZFVARH3gO";
	$accesstoken = "2820664460-DO9WH8rsq0D0WiEoQHDeiJkdjCv99Bc0hve1e3S";
	$accesstokensecret = "y7PkEHLyCVpUeeB5EtqKiM3HgAQ8kY6vslOncylXU76Fk";
	 
	function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
	  $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
	  return $connection;
	}
	 
	$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);
	 
	$tweets = $connection->get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=".$twitteruser."&count=".$notweets);
	
	$dataTwitter = new stdClass;
	$dataTwitter->tweets = $tweets; 
	echo json_encode($dataTwitter);
?>