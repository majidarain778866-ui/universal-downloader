<?php
/**
 * SOCIAL DOWNLOADER PRO - WORDPRESS ROOT API & DOWNLOAD PROXY
 * Upload this file to your WordPress root directory (e.g. public_html/downloader-api.php or htdocs/downloader-api.php)
 * using WP File Manager plugin or FTP.
 */

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Netlify Backend Endpoint
define('NETLIFY_BASE_URL', 'https://getintodevices.netlify.app');

$action = isset($_GET['action']) ? trim($_GET['action']) : '';

// Handle POST request OR action=video-info
if ($_SERVER['REQUEST_METHOD'] === 'POST' || $action === 'video-info' || strpos($_SERVER['REQUEST_URI'], 'video-info') !== false) {
    header("Content-Type: application/json; charset=utf-8");

    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!$data || empty($data['url'])) {
        if (!empty($_POST['url'])) {
            $data = ['url' => $_POST['url']];
        } else if (!empty($_GET['url'])) {
            $data = ['url' => $_GET['url']];
        } else {
            echo json_encode(['error' => 'Please provide a valid media URL.']);
            exit();
        }
    }

    $videoUrl = trim($data['url']);

    // Send request to Netlify API backend
    $ch = curl_init(NETLIFY_BASE_URL . '/api/video-info');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['url' => $videoUrl]));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    ]);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlErr = curl_error($ch);
    curl_close($ch);

    if ($response === false || empty($response)) {
        // Fallback using file_get_contents if cURL fails
        $opts = [
            'http' => [
                'method'  => 'POST',
                'header'  => "Content-Type: application/json\r\n",
                'content' => json_encode(['url' => $videoUrl]),
                'timeout' => 30
            ],
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false
            ]
        ];
        $context = stream_context_create($opts);
        $response = @file_get_contents(NETLIFY_BASE_URL . '/api/video-info', false, $context);
    }

    if ($response) {
        echo $response;
    } else {
        echo json_encode(['error' => 'Unable to connect to downloader backend server. Please try again.']);
    }
    exit();
}

// Handle action=download (Media File Streaming Proxy)
if ($action === 'download' || isset($_GET['id']) || isset($_GET['download_url'])) {
    $id = isset($_GET['id']) ? trim($_GET['id']) : '';
    $fileUrl = isset($_GET['download_url']) ? trim($_GET['download_url']) : (isset($_GET['url']) ? trim($_GET['url']) : '');
    $filename = isset($_GET['filename']) ? trim($_GET['filename']) : 'social-media-download.mp4';

    // Clean filename
    $filename = preg_replace('/[^\w\s\.-]/', '', $filename);
    if (empty($filename)) $filename = 'social-media-download.mp4';

    if ($id) {
        $downloadTarget = NETLIFY_BASE_URL . '/api/download?id=' . urlencode($id);
    } else if ($fileUrl) {
        $downloadTarget = $fileUrl;
    } else {
        header("Content-Type: application/json");
        echo json_encode(['error' => 'Missing download ID or URL parameter.']);
        exit();
    }

    // Stream download directly to client
    header("Content-Description: File Transfer");
    header("Content-Type: application/octet-stream");
    header("Content-Disposition: attachment; filename=\"" . $filename . "\"");
    header("Expires: 0");
    header("Cache-Control: must-revalidate");
    header("Pragma: public");

    $ch = curl_init($downloadTarget);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, false); // Stream directly to output
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    curl_exec($ch);
    curl_close($ch);
    exit();
}

// Default status response if accessed directly in browser
header("Content-Type: application/json");
echo json_encode([
    'status' => 'online',
    'service' => 'Social Downloader Pro API Proxy',
    'version' => '2.1.0',
    'instructions' => 'Upload this downloader-api.php file to your WordPress root directory (htdocs/downloader-api.php or public_html/downloader-api.php).'
]);
exit();
