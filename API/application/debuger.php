<?php
if ((DEBUGING == TRUE) or (DEBUGING == true)) {
	# code...

ini_set('display_errors', 'On');
ini_set('error_log', dirname(__FILE__).'/errorlog.log');
error_reporting(E_ALL);
}
elseif((DEBUGING == FALSE) or (DEBUGING == false))
{
ini_set('display_errors', 'Off');
error_reporting(E_ALL);
}
else
{
ini_set('display_errors', 'On');
ini_set('error_log', dirname(__FILE__).'/errorlog.log');
error_reporting(E_ALL);
}
