<?php
/**
 * AARU AYURVEDA - Database Connection (PDO Singleton)
 */

if (!defined('AARU_EXEC')) {
    define('AARU_EXEC', true);
}

class Database {
    private static ?PDO $instance = null;

    public static function getConnection(): PDO {
        if (self::$instance === null) {
            $host = '127.0.0.1';
            $db   = 'aaru_ayurveda';
            $user = 'root';
            $pass = '';
            $charset = 'utf8mb4';

            $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];

            try {
                self::$instance = new PDO($dsn, $user, $pass, $options);
            } catch (PDOException $e) {
                // If database hasn't been initialized yet, auto-redirect or fail gracefully
                die("AARU Database Connection Failed: " . htmlspecialchars($e->getMessage()));
            }
        }
        return self::$instance;
    }
}

function getDB(): PDO {
    return Database::getConnection();
}
