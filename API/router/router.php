<?php
// In case one is using PHP 5.4's built-in cli-server
//error_reporting(0);
$filename = __DIR__ . preg_replace('#(\?.*)$#', '', $_SERVER['REQUEST_URI']);
if (php_sapi_name() === 'cli-server' && is_file($filename)) {
  return false;
}
require_once __DIR__ . '/parent/router.php';
/**
 * Creating Routing Class Name space And Object
 */
$router = new  \Inkxe\Router\Router();

$router->before('GET', '/.*', function () 
{
  header('X-Powered-By: inkxe/router');
});



/**
 * For Controller Test Routing Mechanisim
 */
$router->all('/userLogin', function () {
    $controller = "userLogin";
    $method = "index";
    require 'application/controller/' . $controller . '/' . $controller . '.php';
    $call = new $controller();
    $call->index();
});

$router->all('/userLogin/(\w+)', function ($name) {
    $controller = "userLogin";
    require 'application/controller/' . $controller . '/' . $controller . '.php';
    $call = new $controller();
    $call->$name();
});

$router->get('/userLogin/(.*)', function ($name) {
    $controller = "userLogin";
    require 'application/controller/' . $controller . '/' . $controller . '.php';
    $url = rtrim($name, '/');
    $url = filter_var($name, FILTER_SANITIZE_URL);
    $url = explode('/', $name);
    // Put URL parts into according properties
    // By the way, the syntax here is just a short form of if/else, called "Ternary Operators"
    // @see http://davidwalsh.name/php-shorthand-if-else-ternary-operators
    $url_controller = (isset($url[0]) ? $url[0] : null);
    $url_action = (isset($url[1]) ? $url[1] : null);
    $url_parameter_1 = (isset($url[2]) ? $url[2] : null);
    $url_parameter_2 = (isset($url[3]) ? $url[3] : null);
    $url_parameter_3 = (isset($url[4]) ? $url[4] : null);
    /*echo 'Controller: ' .  $url_controller . '<br />';
    echo 'Action: ' . $url_action . '<br />';
    echo 'Parameter 1: ' . $url_parameter_1 . '<br />';
    echo 'Parameter 2: ' . $url_parameter_2 . '<br />';
    echo 'Parameter 3: ' . $url_parameter_3 . '<br />';
    // /exit(0);*/
    $call = new $controller();
    $call->$url_controller($url_action);
});


/**
 * For Controller Test Routing Mechanisim
 */
$router->all('/textReport', function () {
    $controller = "textReport";
    $method = "index";
    require 'application/controller/' . $controller . '/' . $controller . '.php';
    $call = new $controller();
    $call->index();
});

$router->all('/textReport/(\w+)', function ($name) {
    $controller = "textReport";
    require 'application/controller/' . $controller . '/' . $controller . '.php';
    $call = new $controller();
    $call->$name();
});

$router->get('/textReport/(.*)', function ($name) {
    $controller = "textReport";
    require 'application/controller/' . $controller . '/' . $controller . '.php';
    $url = rtrim($name, '/');
    $url = filter_var($name, FILTER_SANITIZE_URL);
    $url = explode('/', $name);
    // Put URL parts into according properties
    // By the way, the syntax here is just a short form of if/else, called "Ternary Operators"
    // @see http://davidwalsh.name/php-shorthand-if-else-ternary-operators
    $url_controller = (isset($url[0]) ? $url[0] : null);
    $url_action = (isset($url[1]) ? $url[1] : null);
    $url_parameter_1 = (isset($url[2]) ? $url[2] : null);
    $url_parameter_2 = (isset($url[3]) ? $url[3] : null);
    $url_parameter_3 = (isset($url[4]) ? $url[4] : null);
    /*echo 'Controller: ' .  $url_controller . '<br />';
    echo 'Action: ' . $url_action . '<br />';
    echo 'Parameter 1: ' . $url_parameter_1 . '<br />';
    echo 'Parameter 2: ' . $url_parameter_2 . '<br />';
    echo 'Parameter 3: ' . $url_parameter_3 . '<br />';
    // /exit(0);*/
    $call = new $controller();
    $call->$url_controller($url_action);
});



  $router->run();

