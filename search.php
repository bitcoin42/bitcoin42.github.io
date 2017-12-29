<?php 
//////////////////
//Text variables//
//////////////////
$searched_message = 'You have searched for:';
$has_results = 'Pages that matches your query:';
$no_results = 'No pages matches your query';


if(isset($_POST['search'])) {

	if(!empty($_POST['search'])) {
		$search  = stripslashes(strip_tags(trim($_POST['search'])));
		//if search is empty - exit with no results
		if(!$search) {	
			echo $no_results;
			exit();
		}
	}

	$dir = ".";
	$found_files = array();

	//serching query string inside site root dierectory in HTML files
	foreach( new DirectoryIterator($dir) as $file) {
	    if( $file->isFile() && strtolower($file->getExtension()) === 'html') {
	        $content = strip_tags(file_get_contents($file->getBasename()));
	        if(stripos($content, $search) !== false) {
	        	$found_files[] = $file->getBasename('.html');
	        }
	        
	    }
	}

	//building response text
	echo $searched_message . ' <strong>' . $search . '</strong><br>';

	//if found something
	if($found_files) {
		echo $has_results . '<br>';
		foreach ($found_files as $key => $file) {
			echo '<a href="' . $file . '.html">' . ucfirst($file) . '</a><br>';
		}
	//if no search results
	} else {
		echo $no_results;
	}
}


?>