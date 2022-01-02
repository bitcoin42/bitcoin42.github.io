<?php

/*
 * ==========================================================
 * API.PHP
 * ==========================================================
 *
 * API main file. This file listens the POST queries and return the result. © 2017-2021 board.support. All rights reserved.
 *
 */

// SMS
if (isset($_POST['AccountSid']) && isset($_POST['From'])) {
    require('functions.php');

    // User and conversation
    $GLOBALS['SB_FORCE_ADMIN'] = true;
    sb_cloud_load_by_url();
    if ($_POST['AccountSid'] != sb_get_multi_setting('sms', 'sms-user')) sb_api_error(new SBError('security-error', '', 'Wrong AccountSid.'));
    $phone = $_POST['From'];
    $message = $_POST['Body'];
    $user = sb_get_user_by('phone', $phone);
    $conversation_id = false;
    if (!$user) {
        $extra = ['phone' => [$phone, 'Phone']];
        if (!empty($_POST['FromCity'])) {
            $extra['city'] = [ucwords(mb_strtolower($_POST['FromCity'])), 'City'];
        }
        if (!empty($_POST['FromCountry'])) {
            $country_codes = json_decode(file_get_contents(SB_PATH . '/resources/json/countries.json'), true);
            $code = strtoupper($_POST['FromCountry']);
            if (isset($country_codes[$code])) {
                $extra['country'] = [$country_codes[$code], 'Country'];
            }
        }
        if ($message && sb_get_multi_setting('dialogflow-language-detection', 'dialogflow-language-detection-active')) {
            $detected_language = sb_google_language_detection($message);
            if (!empty($detected_language)) $extra['language'] = [$detected_language, 'Language'];
        }
        $user_id = sb_add_user([], $extra);
        $user = sb_get_user($user_id);
    } else {
        $user_id = $user['id'];
        $conversation_id = sb_isset(sb_db_get('SELECT id FROM sb_conversations WHERE user_id = ' . $user_id . ' ORDER BY id DESC LIMIT 1'), 'id');
    }
    $GLOBALS['SB_LOGIN'] = $user;

    // Attachments
    $attachments = [];
    for ($i = 0; $i < 10; $i++) {
        $url = sb_isset($_POST, 'MediaUrl' . $i);
    	if ($url && isset($_POST['MediaContentType' . $i])) {
            switch ($_POST['MediaContentType0']) {
                case 'video/mp4':
                    $extension = '.mp4';
                    break;
                case 'image/gif':
                    $extension = '.gif';
                    break;
                case 'image/png':
                    $extension = '.png';
                    break;
                case 'image/jpg':
                case 'image/jpeg':
                    $extension = '.jpg';
                    break;
                case 'image/webp':
                    $extension = '.webp';
                    break;
                case 'audio/ogg':
                    $extension = '.ogg';
                    break;
                case 'audio/mpeg':
                    $extension = '.mp3';
                    break;
                case 'audio/amr':
                    $extension = '.amr';
                    break;
                case 'application/pdf':
                    $extension = '.pdf';
                    break;
            }
            if ($extension) {
                $file_name = basename($url) . $extension;
                array_push($attachments, [$file_name, sb_download_file($url, $file_name)]);
            }
        }
    }

    // Send message to Support Board
    if (!$conversation_id) $conversation_id = sb_isset(sb_new_conversation($user_id, 2, '', false, -1, 'tm'), 'details', [])['id'];
    sb_send_message($user_id, $conversation_id, $message, $attachments, 2);

    $GLOBALS['SB_FORCE_ADMIN'] = false;
    die();
}

// API
if (!isset($_POST['function'])) die(json_encode(['status' => 'error', 'response' => 'missing-function-name', 'message' => 'Function name is required. Get it from the docs.']));
require('functions.php');
define('SB_API', true);
sb_process_api();

function sb_process_api() {
    $function_name = $_POST['function'];
    $functions = [
        'is-online' => ['user_id'],
        'get-setting' => ['setting'],
        'get-external-setting' => ['setting'],
        'saved-replies' => [],
        'get-settings' => [],
        'add-user' => [],
        'get-user' => ['user_id'],
        'get-user-extra' => ['user_id'],
        'get-user-language' => ['user_id'],
        'get-new-users' => ['datetime'],
        'get-users' => [],
        'get-online-users' => [],
        'get-user-from-conversation' => ['conversation_id'],
        'get-users-with-details' => ['details'],
        'search-users' => ['search'],
        'delete-user' => ['user_id'],
        'delete-users' => ['user_ids'],
        'update-user' => ['user_id'],
        'count-users' => [],
        'update-user-to-lead' => ['user_id'],
        'get-conversations' => [],
        'get-new-conversations' => ['datetime'],
        'get-conversation' => ['conversation_id'],
        'search-conversations' => ['search'],
        'search-user-conversations' => ['search', 'user_id'],
        'new-conversation' => ['user_id'],
        'get-user-conversations' => ['user_id'],
        'get-new-user-conversations' => ['user_id', 'datetime'],
        'update-conversation-status' => ['conversation_id', 'status_code'],
        'update-conversation-department' => ['conversation_id', 'department'],
        'set-rating' => ['settings'],
        'get-rating' => ['user_id'],
        'get-new-messages' => ['user_id', 'conversation_id', 'datetime'],
        'send-message' => ['user_id', 'conversation_id'],
        'send-bot-message' => ['conversation_id', 'message'], // Deprecated
        'send-slack-message' => ['user_id'],
        'update-message' => ['message_id'],
        'delete-message' => ['message_id'],
        'send-email' => ['recipient_id', 'message'],
        'send-custom-email' => ['to', 'subject', 'message'],
        'slack-users' => [],
        'archive-slack-channels' => [],
        'current-url' => [],
        'get-articles' => [],
        'get-articles-categories' => [],
        'save-articles-categories' => ['categories'],
        'save-articles' => ['articles'],
        'search-articles' => ['search'],
        'article-ratings' => [],
        'get-versions' => [],
        'update' => [],
        'wp-sync' => [],
        'app-get-key' => ['app_name'],
        'app-activation' => ['app_name', 'key'],
        'csv-users' => [],
        'csv-conversations' => ['conversation_id'],
        'transcript' => ['conversation_id'],
        'cron-jobs' => [],
        'is-agent-typing' => ['conversation_id'],
        'push-notification' => ['title' , 'message', 'interests'],
        'dialogflow-message' => ['conversation_id', 'message'],
        'dialogflow-create-intent' => ['expressions', 'response'],
        'dialogflow-entity' => ['entity_name', 'synonyms'],
        'dialogflow-get-entity' => [],
        'dialogflow-get-token' => [],
        'dialogflow-get-agent' => ['context_name', 'user_id'],
        'dialogflow-set-active-context' => ['context_name'],
        'dialogflow-curl' => ['url_part', 'query'],
        'dialogflow-intent' => ['expressions', 'response'], // Deprecated
        'woocommerce-get-customer' => ['session_key'],
        'woocommerce-get-user-orders' => ['user_id'],
        'woocommerce-get-order' => ['order_id'],
        'woocommerce-get-product' => ['product_id'],
        'woocommerce-get-taxonomies' => ['type'],
        'woocommerce-get-attributes' => [],
        'woocommerce-get-product-id-by-name' => ['name'],
        'woocommerce-get-product-images' => ['product_id'],
        'woocommerce-get-product-taxonomies' => ['product_id'],
        'woocommerce-get-attribute-by-term' => ['term_name'],
        'woocommerce-get-attribute-by-name' => ['name'],
        'woocommerce-is-in-stock' => ['product_id'],
        'woocommerce-coupon' => ['discount', 'expiration'],
        'woocommerce-coupon-check' => ['user_id'],
        'woocommerce-coupon-delete-expired' => [],
        'woocommerce-get-url' => ['type'],
        'woocommerce-get-session' => ['session_key'],
        'woocommerce-get-session-key' => ['user_id'],
        'woocommerce-payment-methods' => [],
        'woocommerce-shipping-locations' => [],
        'woocommerce-get-products' => [],
        'woocommerce-search-products' => ['search'],
        'woocommerce-dialogflow-entities' => [],
        'woocommerce-dialogflow-intents' => [],
        'pusher-trigger' => ['channel', 'event'],
        'chat-css' => [],
        'download-file' => ['url'],
        'get-avatar' => ['first_name'],
        'get-agents-ids' => [],
        'text-formatting-to-html' => ['message'],
        'clear-text-formatting' => ['message'],
        'send-sms' => ['message', 'to'],
        'get-notes' => ['conversation_id'],
        'add-note' => ['conversation_id', 'user_id', 'name', 'message'],
        'delete-note' => ['conversation_id', 'note_id'],
        'automations-get' => [],
        'automations-save' => ['automations'],
        'automations-run' => ['automation'],
        'automations-run-all' => [],
        'automations-validate' => ['automation'],
        'email-piping' => [],
        'get-agents-in-conversation' => ['conversation_id']
    ];

    if (!isset($functions[$function_name])) {
        sb_api_error(new SBError('function-not-found', $function_name, 'Function ' . $function_name . ' not found. Check the function name.'));
    }

    if (!isset($_POST['token'])) {
        sb_api_error(new SBError('token-not-found', $function_name, 'Admin token is required. Get it from the Users > Your admin user profile details box.'));
    } else if (!sb_api_security($_POST['token'])) {
        sb_api_error(new SBError('invalid-token', $function_name, 'Use an admin user token.'));
    }

    if (count($functions[$function_name]) > 0) {
        for ($i = 0; $i < count($functions[$function_name]); $i++) {
            if (!isset($_POST[$functions[$function_name][$i]])) {
                sb_api_error(new SBError('missing-argument', $function_name, 'Missing argument: ' . $functions[$function_name][$i]));
            }
        }
    }

    // Check if the app required by a method is installed
    $apps = [
        'SB_WP'=> ['wp-sync'],
        'SB_DIALOGFLOW'=> ['dialogflow-message', 'dialogflow-create-intent', 'dialogflow-intent', 'dialogflow-entity', 'dialogflow-get-entity', 'dialogflow-get-token', 'dialogflow-get-agent', 'dialogflow-set-active-context', 'dialogflow-curl', 'send-bot-message'],
        'SB_SLACK'=> ['send-slack-message', 'slack-users', 'archive-slack-channels']
    ];

    foreach ($apps as $key => $value) {
        if ((in_array($function_name, $value) && !defined($key))) {
            sb_api_error(new SBError('app-not-installed', $function_name));
        }
    }

    // Convert JSON to array
    $json_keys = [];
    switch ($function_name) {
        case 'get-users':
            $json_keys = ['user_types'];
            break;
        case 'save-articles-categories':
            $json_keys = ['categories'];
            break;
        case 'get-online-users':
            $json_keys = ['exclude_id'];
            break;
        case 'update-user':
        case 'add-user':
            $json_keys = ['extra'];
            break;
        case 'delete-users':
            $json_keys = ['user_ids'];
            break;
        case 'set-rating':
            $json_keys = ['settings'];
            break;
        case 'update-message':
        case 'send-message':
            $json_keys = ['attachments', 'payload'];
            break;
        case 'send-email':
        case 'send-slack-message':
        case 'dialogflow-message':
        case 'send-bot-message': // Deprecated
            $json_keys = ['attachments'];
            break;
        case 'dialogflow-intent': // Deprecated
            $json_keys = ['expressions'];
            break;
        case 'dialogflow-create-intent':
            $json_keys = ['expressions'];
            break;
        case 'dialogflow-entity':
            $json_keys = ['synonyms'];
            break;
        case 'dialogflow-set-active-context':
            $json_keys = ['parameters'];
            break;
        case 'woocommerce-get-products':
            $json_keys = ['filters'];
            break;
        case 'save-articles':
            $json_keys = ['articles'];
            break;
        case 'pusher-trigger':
            $json_keys = ['data'];
            break;
    }
    for ($i = 0; $i < count($json_keys); $i++) {
        if (isset($_POST[$json_keys[$i]])) {
            $_POST[$json_keys[$i]] = json_decode($_POST[$json_keys[$i]], true);
        }
    }

    // Additional WEB API
    switch ($function_name) {
        case 'get-external-setting':
            die(sb_api_success(sb_get_external_setting($_POST['setting'])));
        case 'get-setting':
            die(sb_api_success(sb_get_setting($_POST['setting'])));
        case 'update-user':
        case 'add-user':
            $values = ['first_name', 'last_name', 'email', 'profile_image', 'password', 'user_type', 'department'];
            $settings = [];
            $extra = isset($_POST['extra']) ? $_POST['extra'] : [];
            for ($i = 0; $i < count($values); $i++) {
                if (isset($_POST[$values[$i]])) {
                    $settings[$values[$i]] = [$_POST[$values[$i]]];
                }
            }
            die(sb_api_success($function_name == 'add-user' ? sb_add_user($settings, $extra) : sb_update_user($_POST['user_id'], $settings, $extra)));
        case 'text-formatting-to-html':
            die(sb_json_response(sb_text_formatting_to_html($_POST['message'])));
        case 'clear-text-formatting':
            die(sb_json_response(sb_clear_text_formatting($_POST['message'])));
        default:
            require_once('ajax.php');
            break;
    }
}

/*
 * -----------------------------------------------------------
 * # FUNCTIONS
 * -----------------------------------------------------------
 *
 * Help functions used only by the APIs
 *
 */

function sb_api_error($error) {
    $response = ['status' => 'error', 'response' => $error->code()];
    if ($error->message() != '') {
        $response['message'] = $error->message();
    }
    die(json_encode($response));
}

function sb_api_success($result) {
    $response = [];
    if (sb_is_validation_error($result)) {
        $response['success'] = false;
        $response['response'] = $result->code();
    } else {
        $response['success'] = true;
        $response['response'] = $result;
    }
    die(json_encode($response));
}

function sb_api_security($token) {
    $admin = sb_db_get('SELECT * FROM sb_users WHERE token = "' . sb_db_escape($_POST['token']) . '" LIMIT 1');
    if (isset($admin['user_type']) && $admin['user_type'] === 'admin') {
        global $SB_LOGIN;
        $SB_LOGIN = ['id' => $admin['id'], 'profile_image' => $admin['profile_image'], 'first_name' => $admin['first_name'], 'last_name' => $admin['last_name'], 'email' => $admin['email'], 'user_type' => 'admin', 'token' => $_POST['token']];
        return true;
    }
    return false;
}

?>