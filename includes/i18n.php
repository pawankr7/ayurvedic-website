<?php
/**
 * AARU AYURVEDA - Internationalization (English & Hindi)
 */

if (!defined('AARU_EXEC')) {
    define('AARU_EXEC', true);
}

class I18n {
    private static ?array $dictionary = null;

    public static function load(): array {
        if (self::$dictionary === null) {
            $transFile = dirname(__DIR__) . '/database/data/translations.json';
            if (file_exists($transFile)) {
                self::$dictionary = json_decode(file_get_contents($transFile), true) ?: [];
            } else {
                self::$dictionary = ['en' => [], 'hi' => []];
            }
        }
        return self::$dictionary;
    }

    public static function get(string $keyPath, string $default = ''): string {
        $dict = self::load();
        $lang = CURRENT_LANG;

        $target = $dict[$lang] ?? [];
        $parts = explode('.', $keyPath);

        foreach ($parts as $part) {
            if (is_array($target) && isset($target[$part])) {
                $target = $target[$part];
            } else {
                // Fallback to English if missing in Hindi
                $fallback = $dict['en'] ?? [];
                foreach ($parts as $fpart) {
                    if (is_array($fallback) && isset($fallback[$fpart])) {
                        $fallback = $fallback[$fpart];
                    } else {
                        return $default ?: $keyPath;
                    }
                }
                return is_string($fallback) ? $fallback : ($default ?: $keyPath);
            }
        }

        return is_string($target) ? $target : ($default ?: $keyPath);
    }
}

function __t(string $keyPath, string $default = ''): string {
    return I18n::get($keyPath, $default);
}
