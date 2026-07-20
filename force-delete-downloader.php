<?php
/**
 * Social Downloader - Force Delete Script
 * 
 * Upload this file to the root of your WordPress site (htdocs/ directory)
 * and visit http://yourdomain.com/force-delete-downloader.php in your browser.
 * It will instantly delete the locked social-downloader folder using the web server user.
 */

// Basic security check: Make sure the user has to pass a query param or confirm
if (!isset($_GET['confirm'])) {
    echo '<h2>Force Delete Social Downloader Directory</h2>';
    echo '<p>This script will delete the locked <code>wp-content/plugins/social-downloader/</code> folder using web server permissions.</p>';
    echo '<a href="?confirm=1" style="background:#ef4444;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none;font-weight:bold;">Yes, Force Delete Folder</a>';
    exit;
}

$plugin_dir = dirname(__FILE__) . '/wp-content/plugins/social-downloader';

function recursive_delete_dir($dir) {
    if (!file_exists($dir)) {
        return true;
    }
    if (!is_dir($dir)) {
        // Try to force change permission if locked, then unlink
        @chmod($dir, 0777);
        return @unlink($dir);
    }
    foreach (scandir($dir) as $item) {
        if ($item == '.' || $item == '..') {
            continue;
        }
        if (!recursive_delete_dir($dir . '/' . $item)) {
            return false;
        }
    }
    @chmod($dir, 0777);
    return @rmdir($dir);
}

echo '<h3>Processing deletion...</h3>';

if (recursive_delete_dir($plugin_dir)) {
    echo '<div style="background:#d1fae5;color:#065f46;padding:15px;border-radius:6px;font-weight:bold;margin-bottom:15px;">';
    echo 'SUCCESS: The locked folder "social-downloader" was successfully deleted!';
    echo '</div>';
    echo '<p>You can now go back to WordPress, upload the new <strong>social-downloader.zip</strong>, and it will install successfully!</p>';
    echo '<p style="color:#ef4444;font-weight:bold;">IMPORTANT: Please delete this "force-delete-downloader.php" file from your root directory for security.</p>';
} else {
    echo '<div style="background:#fee2e2;color:#991b1b;padding:15px;border-radius:6px;font-weight:bold;">';
    echo 'ERROR: Could not delete the folder. Some files are heavily locked by the server process.';
    echo '</div>';
}
