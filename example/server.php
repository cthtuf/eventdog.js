<?php
/**
 * Created by Philipp Sirotkin.
 * Date: 18.03.2015
 * Time: 13:59
 */
$var = $_POST['string-check'];
echo json_encode(array('success' => true, 'return' => $var));