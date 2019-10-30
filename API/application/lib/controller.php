<?php
ob_start();
session_start();
/**
 * This is the "base controller class". All other "real" controllers extend this class.
 */
class Controller
{
    /**
     * @var null Database Connection
     */
    public $db = null;

    /**
     * Whenever a controller is created, open a database connection too. The idea behind is to have ONE connection
     * that can be used by multiple models (there are frameworks that open one connection per model).
     */
    function __construct()
    {
        $this->openDatabaseConnection();
        header('Access-Control-Allow-Origin: *');
        /** Remember To change  This Commemnt Dta When Angular Tuterial Warp up*/
        
    }

    /**
     * Open the database connection with the credentials from application/config/config.php
     */
    private function openDatabaseConnection()
    {
        // set the (optional) options of the PDO connection. in this case, we set the fetch mode to
        // "objects", which means all results will be objects, like this: $result->user_name !
        // For example, fetch mode FETCH_ASSOC would return results like this: $result["user_name] !
        // @see http://www.php.net/manual/en/pdostatement.fetch.php
        $options = array(PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ, PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING);
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

        // generate a database connection, using the PDO connector
        // @see http://net.tutsplus.com/tutorials/php/why-you-should-be-using-phps-pdo-for-database-access/
        $this->db = $conn;
        
    }

    private function isLoginSessionExpired()
    {

        $login_session_duration = 3600;

        $current_time = time();

        if (isset($_SESSION['loggedin_time']) and isset($_SESSION["user_id"])) {

            if (((time() - $_SESSION['loggedin_time']) > $login_session_duration)) {

                return 'true';
            }
        }
        return 'false';
    }

   private function checkLogInStatus()
    {
        if ($this->isLoginSessionExpired() == 'false' && isset($_SESSION['user_id']) && $_SESSION['user_id'] != '') {
            return true;
        } else {
            return false;
        }
    }

    public function getLoginStatus()
    {
        return $this->checkLogInStatus();
    }

    public function checkApiKey($key)
    {
        if ($key === "APKEYRBDUFFUE2786287GFEWFFQUFQG38847KK09BCM") {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Load the model with the given name.
     * loadModel("SongModel") would include models/songmodel.php and create the object in the controller, like this:
     * $songs_model = $this->loadModel('SongsModel');
     * Note that the model class name is written in "CamelCase", the model's filename is the same in lowercase letters
     * @param string $model_name The name of the model
     * @return object model
     */
    public function loadModel($model_name)
    {
        require 'application/debuger.php';
        require 'application/model/' . strtolower($model_name) . '.php';
        // return new model (and pass the database connection to the model)
        return new $model_name($this->db);
    }
}
