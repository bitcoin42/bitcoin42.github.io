<?php

/*
 * ==========================================================
 * ADMINISTRATION PAGE
 * ==========================================================
 *
 * Administration page to manage the settings and reply to the users.
 *
 */

global $SB_CONNECTION;
$connection_success = false;
$connection_check = false;
$minify = false;
$is_cloud = false;
$sb_url = '';
define('SB_PATH', getcwd());
if (file_exists('config.php')) {
    require('include/functions.php');
    $is_cloud = defined('SB_CLOUD');
    if ($is_cloud) {
        sb_cloud_load();
        if (!defined('SB_DB_NAME') || !sb_is_agent()) die('<script>document.location = "' . CLOUD_URL . '/account?login"</script>');
        sb_cloud_membership_validation();
    } else if (!defined('SB_URL')) define('SB_URL', '');
    $connection_check = sb_db_check_connection();
    $connection_success = $connection_check === true;
    $minify = false;
    $sb_url = '';
    if ($connection_success) {
        $sb_url = SB_URL . '/';
        $minify = sb_get_multi_setting('performance', 'performance-minify');
        sb_updates_validation();
    }
} else {
    define('SB_URL', '');
    $file = fopen('config.php', 'w');
    fwrite(fopen('config.php', 'w'), '');
    fclose($file);
    require('include/functions.php');
}
require('include/components.php');

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
    <meta name="theme-color" content="#566069" />
    <title>
        <?php echo !$is_cloud && $connection_success && sb_get_setting('admin-title') ? sb_get_setting('admin-title') : ($is_cloud ? SB_CLOUD_BRAND_NAME : 'Support Board') ?>
    </title>
    <script src="<?php echo $sb_url . 'js/min/jquery.min.js?v=' . SB_VERSION ?>"></script>
    <script src="<?php echo $sb_url . ($is_cloud || $minify ? 'js/min/main.min.js?v=' : 'js/main.js?v=') . SB_VERSION ?>"></script>
    <script src="<?php echo $sb_url . ($is_cloud || $minify ? 'js/admin.js?v=' : 'js/admin.js?v=') . SB_VERSION //temp?>"></script>
    <?php if (sb_get_multi_setting('grammarly', 'grammarly-active')) echo '<script src="https://unpkg.com/@grammarly/editor-sdk?clientId=' . sb_get_multi_setting('grammarly', 'grammarly-client-id') . '"></script>' ?>
    <link rel="stylesheet" href="<?php echo $sb_url . 'css/min/admin.min.css?v=' . SB_VERSION ?>" media="all" />
    <link rel="stylesheet" href="<?php echo $sb_url . 'css/min/responsive-admin.min.css?v=' . SB_VERSION ?>" media="(max-width: 428px)" />
    <?php if ($connection_success && (sb_get_setting('rtl-admin') || ($is_cloud && defined('SB_CLOUD_DEFAULT_RTL')))) echo '<link rel="stylesheet" href="' . $sb_url . 'css/min/rtl-admin.min.css?v=' . SB_VERSION . '" />' ?>
    <link rel="shortcut icon" type="image/png" href="<?php echo $is_cloud ? SB_CLOUD_BRAND_ICON_PNG : sb_get_setting('admin-icon', $sb_url . '/media/icon.png') ?>" />
    <link rel="apple-touch-icon" href="<?php echo $is_cloud ? SB_CLOUD_BRAND_ICON_PNG : sb_get_setting('admin-icon', $sb_url . 'resources/pwa/icons/icon-192x192.png') ?>" />
    <link rel="manifest" href="<?php echo $is_cloud ? SB_CLOUD_MANIFEST_URL : sb_get_setting('manifest-url', $sb_url . 'resources/pwa/manifest.json') ?>" />
    <?php if ($is_cloud) echo '<script src="' . CLOUD_URL . '/account/js/admin.js?v=' . SB_VERSION . '"></script>' ?>
    <?php
    if ($connection_success) {
        sb_js_global();
        sb_js_admin();
    }
    ?>
</head>
<body>
    <?php
    if (!$connection_success) {
        sb_installation_box($connection_check);
        die();
    }
    sb_component_admin();
    ?>
</body>
</html>