<?php
/**
 * AARU AYURVEDA - Automated Database Setup & Seeder Script
 * Executes DDL schema and populates all tables from exported datasets.
 */

header('Content-Type: text/plain; charset=utf-8');

$host = '127.0.0.1';
$user = 'root';
$pass = '';
$dbname = 'aaru_ayurveda';

echo "=== AARU AYURVEDA: MySQL Database Migration ===\n\n";

try {
    $pdo = new PDO("mysql:host=$host;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    echo "[1/6] Connected to MySQL successfully.\n";

    // 1. Create Database
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
    $pdo->exec("USE `$dbname`;");
    echo "[2/6] Database `$dbname` selected.\n";

    // 2. Create Tables
    echo "[3/6] Creating database schema...\n";

    $pdo->exec("
    CREATE TABLE IF NOT EXISTS `categories` (
        `id` VARCHAR(100) PRIMARY KEY,
        `slug` VARCHAR(100) UNIQUE NOT NULL,
        `name_en` VARCHAR(255) NOT NULL,
        `name_hi` VARCHAR(255) NOT NULL,
        `description_en` TEXT,
        `description_hi` TEXT,
        `icon_name` VARCHAR(100),
        `badge` VARCHAR(100),
        `seo_title` VARCHAR(255),
        `seo_description` TEXT,
        `faqs_json` LONGTEXT,
        `display_order` INT DEFAULT 0
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS `products` (
        `id` VARCHAR(100) PRIMARY KEY,
        `slug` VARCHAR(100) UNIQUE NOT NULL,
        `name_en` VARCHAR(255) NOT NULL,
        `name_hi` VARCHAR(255) NOT NULL,
        `subtitle_en` TEXT,
        `subtitle_hi` TEXT,
        `category_id` VARCHAR(100),
        `category_name` VARCHAR(255),
        `price` DECIMAL(10, 2) NOT NULL,
        `original_price` DECIMAL(10, 2) NOT NULL,
        `discount_pct` INT DEFAULT 0,
        `rating` DECIMAL(3, 1) DEFAULT 4.8,
        `reviews_count` INT DEFAULT 0,
        `in_stock` TINYINT(1) DEFAULT 1,
        `stock_count` INT DEFAULT 100,
        `is_bestseller` TINYINT(1) DEFAULT 0,
        `is_featured` TINYINT(1) DEFAULT 0,
        `certified` TINYINT(1) DEFAULT 1,
        `certificate_type` VARCHAR(100),
        `certificate_number` VARCHAR(100),
        `issuing_body` VARCHAR(255),
        `form` VARCHAR(100),
        `life_stage` VARCHAR(100),
        `vegetarian` TINYINT(1) DEFAULT 1,
        `subscription_eligible` TINYINT(1) DEFAULT 1,
        `subscription_discount` INT DEFAULT 15,
        `default_batch` VARCHAR(100),
        `available_batches_json` LONGTEXT,
        `images_json` LONGTEXT,
        `description_en` LONGTEXT,
        `description_hi` LONGTEXT,
        `benefits_json` LONGTEXT,
        `hindi_benefits_json` LONGTEXT,
        `dosage_en` TEXT,
        `dosage_hi` TEXT,
        `who_should_avoid_en` TEXT,
        `who_should_avoid_hi` TEXT,
        `classical_reference` VARCHAR(255),
        `ingredients_json` LONGTEXT,
        `claims_review_status` VARCHAR(50) DEFAULT 'APPROVED',
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS `batches` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `batch_number` VARCHAR(100) UNIQUE NOT NULL,
        `product_name` VARCHAR(255) NOT NULL,
        `mfg_date` VARCHAR(50),
        `expiry_date` VARCHAR(50),
        `testing_lab` VARCHAR(255),
        `nabl_accreditation_no` VARCHAR(100),
        `report_date` VARCHAR(50),
        `status` VARCHAR(50) DEFAULT 'PASSED',
        `heavy_metals_json` LONGTEXT,
        `microbial_json` LONGTEXT,
        `pesticide_residues_json` LONGTEXT,
        `assay_json` LONGTEXT,
        `certified_ayush_doc_url` VARCHAR(255),
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS `claims_audit` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `claim_id` VARCHAR(100),
        `category` VARCHAR(100),
        `product_name` VARCHAR(255),
        `proposed_phrase` TEXT,
        `flagged_keywords_json` LONGTEXT,
        `ayush_compliance_status` VARCHAR(50),
        `recommended_compliant_phrase` TEXT,
        `scientific_justification` TEXT,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS `doctors_vaidyas` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `doctor_id` VARCHAR(100),
        `name` VARCHAR(255),
        `title` VARCHAR(255),
        `qualification` VARCHAR(255),
        `experience_years` INT,
        `specialization` VARCHAR(255),
        `bio` TEXT,
        `image_url` VARCHAR(255)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS `blog_posts` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `slug` VARCHAR(150) UNIQUE NOT NULL,
        `title_en` VARCHAR(255) NOT NULL,
        `title_hi` VARCHAR(255) NOT NULL,
        `excerpt_en` TEXT,
        `excerpt_hi` TEXT,
        `category` VARCHAR(100),
        `author` VARCHAR(150),
        `reviewer` VARCHAR(150),
        `read_time` VARCHAR(50),
        `date_str` VARCHAR(50),
        `cover_image` VARCHAR(255),
        `content_en` LONGTEXT,
        `content_hi` LONGTEXT,
        `tags_json` LONGTEXT,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS `ingredients_wiki` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `slug` VARCHAR(100) UNIQUE NOT NULL,
        `name_en` VARCHAR(150) NOT NULL,
        `name_hi` VARCHAR(150) NOT NULL,
        `botanical_name` VARCHAR(200),
        `sanskrit_name` VARCHAR(255),
        `classical_source` VARCHAR(255),
        `rasa` VARCHAR(255),
        `virya` VARCHAR(100),
        `vipaka` VARCHAR(100),
        `prabhava` VARCHAR(255),
        `overview_en` TEXT,
        `overview_hi` TEXT,
        `science_backing_en` TEXT,
        `science_backing_hi` TEXT,
        `safe_dosage` VARCHAR(255),
        `cautions` TEXT,
        `related_product_slug` VARCHAR(100)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS `quiz_questions` (
        `id` INT PRIMARY KEY,
        `trait_en` VARCHAR(255),
        `trait_hi` VARCHAR(255),
        `options_json` LONGTEXT
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS `quiz_leads` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `full_name` VARCHAR(150) NOT NULL,
        `phone` VARCHAR(50) NOT NULL,
        `email` VARCHAR(150),
        `selected_concern` VARCHAR(100),
        `vata_score` INT DEFAULT 0,
        `pitta_score` INT DEFAULT 0,
        `kapha_score` INT DEFAULT 0,
        `primary_dosha` VARCHAR(50),
        `answers_json` LONGTEXT,
        `recommended_products_json` LONGTEXT,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS `orders` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `order_number` VARCHAR(50) UNIQUE NOT NULL,
        `customer_name` VARCHAR(150) NOT NULL,
        `customer_phone` VARCHAR(50) NOT NULL,
        `customer_email` VARCHAR(150),
        `shipping_address` TEXT NOT NULL,
        `city` VARCHAR(100) NOT NULL,
        `state` VARCHAR(100) NOT NULL,
        `pincode` VARCHAR(20) NOT NULL,
        `payment_method` VARCHAR(50) NOT NULL,
        `payment_status` VARCHAR(50) DEFAULT 'pending',
        `order_status` VARCHAR(50) DEFAULT 'confirmed',
        `subtotal` DECIMAL(10, 2) NOT NULL,
        `discount` DECIMAL(10, 2) DEFAULT 0.00,
        `shipping_fee` DECIMAL(10, 2) DEFAULT 0.00,
        `total_amount` DECIMAL(10, 2) NOT NULL,
        `items_json` LONGTEXT NOT NULL,
        `notes` TEXT,
        `tracking_number` VARCHAR(100),
        `courier_partner` VARCHAR(100) DEFAULT 'Delhivery Express',
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS `contact_messages` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `name` VARCHAR(150) NOT NULL,
        `email` VARCHAR(150),
        `phone` VARCHAR(50) NOT NULL,
        `subject` VARCHAR(200),
        `message` TEXT NOT NULL,
        `consultation_type` VARCHAR(100) DEFAULT 'General Inquiry',
        `status` VARCHAR(50) DEFAULT 'new',
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    echo "Schema created successfully.\n";

    $dataPath = __DIR__ . '/data';

    // 3. Seed Categories
    echo "[4/6] Seeding Categories & Products...\n";
    if (file_exists("$dataPath/categories.json")) {
        $cats = json_decode(file_get_contents("$dataPath/categories.json"), true);
        $stmt = $pdo->prepare("INSERT INTO `categories` (`id`, `slug`, `name_en`, `name_hi`, `description_en`, `description_hi`, `icon_name`, `badge`, `seo_title`, `seo_description`, `faqs_json`, `display_order`) 
            VALUES (:id, :slug, :name_en, :name_hi, :description_en, :description_hi, :icon_name, :badge, :seo_title, :seo_description, :faqs_json, :display_order)
            ON DUPLICATE KEY UPDATE `name_en` = VALUES(`name_en`), `name_hi` = VALUES(`name_hi`), `description_en` = VALUES(`description_en`);");

        $i = 1;
        foreach ($cats as $c) {
            $stmt->execute([
                ':id' => $c['id'],
                ':slug' => $c['slug'],
                ':name_en' => $c['name'],
                ':name_hi' => $c['hindiName'] ?? $c['name'],
                ':description_en' => $c['description'] ?? '',
                ':description_hi' => $c['hindiDescription'] ?? '',
                ':icon_name' => $c['iconName'] ?? 'Leaf',
                ':badge' => $c['badge'] ?? null,
                ':seo_title' => $c['seoTitle'] ?? null,
                ':seo_description' => $c['seoDescription'] ?? null,
                ':faqs_json' => isset($c['faqs']) ? json_encode($c['faqs'], JSON_UNESCAPED_UNICODE) : null,
                ':display_order' => $i++
            ]);
        }
        echo "   -> " . count($cats) . " Categories seeded.\n";
    }

    // 4. Seed Products
    if (file_exists("$dataPath/products.json")) {
        $prods = json_decode(file_get_contents("$dataPath/products.json"), true);
        $stmt = $pdo->prepare("INSERT INTO `products` (
            `id`, `slug`, `name_en`, `name_hi`, `subtitle_en`, `subtitle_hi`, `category_id`, `category_name`,
            `price`, `original_price`, `discount_pct`, `rating`, `reviews_count`, `in_stock`, `stock_count`,
            `is_bestseller`, `is_featured`, `certified`, `certificate_type`, `certificate_number`, `issuing_body`,
            `form`, `life_stage`, `vegetarian`, `subscription_eligible`, `subscription_discount`, `default_batch`,
            `available_batches_json`, `images_json`, `description_en`, `description_hi`, `benefits_json`,
            `hindi_benefits_json`, `dosage_en`, `dosage_hi`, `who_should_avoid_en`, `who_should_avoid_hi`,
            `classical_reference`, `ingredients_json`, `claims_review_status`
        ) VALUES (
            :id, :slug, :name_en, :name_hi, :subtitle_en, :subtitle_hi, :category_id, :category_name,
            :price, :original_price, :discount_pct, :rating, :reviews_count, :in_stock, :stock_count,
            :is_bestseller, :is_featured, :certified, :certificate_type, :certificate_number, :issuing_body,
            :form, :life_stage, :vegetarian, :subscription_eligible, :subscription_discount, :default_batch,
            :available_batches_json, :images_json, :description_en, :description_hi, :benefits_json,
            :hindi_benefits_json, :dosage_en, :dosage_hi, :who_should_avoid_en, :who_should_avoid_hi,
            :classical_reference, :ingredients_json, :claims_review_status
        ) ON DUPLICATE KEY UPDATE 
            `name_en` = VALUES(`name_en`), `name_hi` = VALUES(`name_hi`), `price` = VALUES(`price`), `description_en` = VALUES(`description_en`);");

        foreach ($prods as $p) {
            $stmt->execute([
                ':id' => $p['id'],
                ':slug' => $p['slug'],
                ':name_en' => $p['name'],
                ':name_hi' => $p['hindiName'] ?? $p['name'],
                ':subtitle_en' => $p['subtitle'] ?? '',
                ':subtitle_hi' => $p['hindiSubtitle'] ?? '',
                ':category_id' => $p['categoryId'] ?? 'general',
                ':category_name' => $p['categoryName'] ?? '',
                ':price' => $p['price'] ?? 0,
                ':original_price' => $p['originalPrice'] ?? 0,
                ':discount_pct' => $p['discountPercentage'] ?? 0,
                ':rating' => $p['rating'] ?? 4.8,
                ':reviews_count' => $p['reviewsCount'] ?? 0,
                ':in_stock' => !empty($p['inStock']) ? 1 : 0,
                ':stock_count' => $p['stockCount'] ?? 100,
                ':is_bestseller' => !empty($p['isBestSeller']) ? 1 : 0,
                ':is_featured' => !empty($p['isFeatured']) ? 1 : 0,
                ':certified' => !empty($p['certified']) ? 1 : 0,
                ':certificate_type' => $p['certificateType'] ?? 'AYUSH',
                ':certificate_number' => $p['certificateNumber'] ?? '',
                ':issuing_body' => $p['issuingBody'] ?? '',
                ':form' => $p['form'] ?? 'tablet',
                ':life_stage' => $p['lifeStage'] ?? 'all',
                ':vegetarian' => !empty($p['vegetarian']) ? 1 : 0,
                ':subscription_eligible' => !empty($p['subscriptionEligible']) ? 1 : 0,
                ':subscription_discount' => $p['subscriptionDiscount'] ?? 15,
                ':default_batch' => $p['defaultBatch'] ?? '',
                ':available_batches_json' => json_encode($p['availableBatches'] ?? [], JSON_UNESCAPED_UNICODE),
                ':images_json' => json_encode($p['images'] ?? [], JSON_UNESCAPED_UNICODE),
                ':description_en' => $p['description'] ?? '',
                ':description_hi' => $p['hindiDescription'] ?? '',
                ':benefits_json' => json_encode($p['benefits'] ?? [], JSON_UNESCAPED_UNICODE),
                ':hindi_benefits_json' => json_encode($p['hindiBenefits'] ?? [], JSON_UNESCAPED_UNICODE),
                ':dosage_en' => $p['dosage'] ?? '',
                ':dosage_hi' => $p['hindiDosage'] ?? '',
                ':who_should_avoid_en' => $p['whoShouldAvoid'] ?? '',
                ':who_should_avoid_hi' => $p['hindiWhoShouldAvoid'] ?? '',
                ':classical_reference' => $p['classicalReference'] ?? '',
                ':ingredients_json' => json_encode($p['ingredients'] ?? [], JSON_UNESCAPED_UNICODE),
                ':claims_review_status' => $p['claimsReviewStatus'] ?? 'APPROVED'
            ]);
        }
        echo "   -> " . count($prods) . " Formulations seeded.\n";
    }

    // 5. Seed Batches
    echo "[5/6] Seeding Batches, Blogs, Ingredients, Doctors, & Quiz...\n";
    if (file_exists("$dataPath/batches.json")) {
        $batches = json_decode(file_get_contents("$dataPath/batches.json"), true);
        $stmt = $pdo->prepare("INSERT INTO `batches` (
            `batch_number`, `product_name`, `mfg_date`, `expiry_date`, `testing_lab`, `nabl_accreditation_no`,
            `report_date`, `status`, `heavy_metals_json`, `microbial_json`, `pesticide_residues_json`, `assay_json`, `certified_ayush_doc_url`
        ) VALUES (
            :batch_number, :product_name, :mfg_date, :expiry_date, :testing_lab, :nabl_accreditation_no,
            :report_date, :status, :heavy_metals_json, :microbial_json, :pesticide_residues_json, :assay_json, :certified_ayush_doc_url
        ) ON DUPLICATE KEY UPDATE `product_name` = VALUES(`product_name`), `testing_lab` = VALUES(`testing_lab`);");

        foreach ($batches as $code => $b) {
            $stmt->execute([
                ':batch_number' => $b['batchNumber'] ?? $code,
                ':product_name' => $b['productName'] ?? '',
                ':mfg_date' => $b['mfgDate'] ?? '',
                ':expiry_date' => $b['expiryDate'] ?? '',
                ':testing_lab' => $b['testingLab'] ?? '',
                ':nabl_accreditation_no' => $b['nablAccreditationNo'] ?? '',
                ':report_date' => $b['reportDate'] ?? '',
                ':status' => $b['status'] ?? 'PASSED',
                ':heavy_metals_json' => json_encode($b['heavyMetals'] ?? [], JSON_UNESCAPED_UNICODE),
                ':microbial_json' => json_encode($b['microbial'] ?? [], JSON_UNESCAPED_UNICODE),
                ':pesticide_residues_json' => json_encode($b['pesticideResidues'] ?? [], JSON_UNESCAPED_UNICODE),
                ':assay_json' => json_encode($b['assay'] ?? [], JSON_UNESCAPED_UNICODE),
                ':certified_ayush_doc_url' => $b['certifiedAyushDocUrl'] ?? ''
            ]);
        }
        echo "   -> " . count($batches) . " Batch Reports seeded.\n";
    }

    // 6. Seed Blogs
    if (file_exists("$dataPath/blogs.json")) {
        $blogs = json_decode(file_get_contents("$dataPath/blogs.json"), true);
        $stmt = $pdo->prepare("INSERT INTO `blog_posts` (
            `slug`, `title_en`, `title_hi`, `excerpt_en`, `excerpt_hi`, `category`, `author`, `reviewer`, `read_time`, `date_str`, `cover_image`, `content_en`, `content_hi`, `tags_json`
        ) VALUES (
            :slug, :title_en, :title_hi, :excerpt_en, :excerpt_hi, :category, :author, :reviewer, :read_time, :date_str, :cover_image, :content_en, :content_hi, :tags_json
        ) ON DUPLICATE KEY UPDATE `title_en` = VALUES(`title_en`), `content_en` = VALUES(`content_en`);");

        foreach ($blogs as $bl) {
            $stmt->execute([
                ':slug' => $bl['slug'],
                ':title_en' => $bl['title'],
                ':title_hi' => $bl['hindiTitle'] ?? $bl['title'],
                ':excerpt_en' => $bl['excerpt'] ?? '',
                ':excerpt_hi' => $bl['hindiExcerpt'] ?? '',
                ':category' => $bl['category'] ?? 'Ayurveda',
                ':author' => $bl['author'] ?? 'Vaidya',
                ':reviewer' => $bl['reviewer'] ?? '',
                ':read_time' => $bl['readTime'] ?? '5 min',
                ':date_str' => $bl['date'] ?? '',
                ':cover_image' => $bl['coverImage'] ?? '',
                ':content_en' => $bl['content'] ?? '',
                ':content_hi' => $bl['hindiContent'] ?? '',
                ':tags_json' => json_encode($bl['tags'] ?? [], JSON_UNESCAPED_UNICODE)
            ]);
        }
        echo "   -> " . count($blogs) . " Blog Posts seeded.\n";
    }

    // 7. Seed Ingredients Wiki
    if (file_exists("$dataPath/ingredients.json")) {
        $ings = json_decode(file_get_contents("$dataPath/ingredients.json"), true);
        $stmt = $pdo->prepare("INSERT INTO `ingredients_wiki` (
            `slug`, `name_en`, `name_hi`, `botanical_name`, `sanskrit_name`, `classical_source`, `rasa`, `virya`, `vipaka`, `prabhava`, `overview_en`, `overview_hi`, `science_backing_en`, `science_backing_hi`, `safe_dosage`, `cautions`, `related_product_slug`
        ) VALUES (
            :slug, :name_en, :name_hi, :botanical_name, :sanskrit_name, :classical_source, :rasa, :virya, :vipaka, :prabhava, :overview_en, :overview_hi, :science_backing_en, :science_backing_hi, :safe_dosage, :cautions, :related_product_slug
        ) ON DUPLICATE KEY UPDATE `name_en` = VALUES(`name_en`);");

        foreach ($ings as $ig) {
            $stmt->execute([
                ':slug' => $ig['slug'],
                ':name_en' => $ig['name'],
                ':name_hi' => $ig['hindiName'] ?? $ig['name'],
                ':botanical_name' => $ig['botanicalName'] ?? '',
                ':sanskrit_name' => $ig['sanskritName'] ?? '',
                ':classical_source' => $ig['classicalSource'] ?? '',
                ':rasa' => $ig['rasa'] ?? '',
                ':virya' => $ig['virya'] ?? '',
                ':vipaka' => $ig['vipaka'] ?? '',
                ':prabhava' => $ig['prabhava'] ?? '',
                ':overview_en' => $ig['overview'] ?? '',
                ':overview_hi' => $ig['hindiOverview'] ?? '',
                ':science_backing_en' => $ig['scienceBacking'] ?? '',
                ':science_backing_hi' => $ig['hindiScienceBacking'] ?? '',
                ':safe_dosage' => $ig['safeDosage'] ?? '',
                ':cautions' => $ig['cautions'] ?? '',
                ':related_product_slug' => $ig['relatedProductSlug'] ?? ''
            ]);
        }
        echo "   -> " . count($ings) . " Ingredient Wiki Entries seeded.\n";
    }

    // 8. Seed Doctors
    if (file_exists("$dataPath/doctors.json")) {
        $docs = json_decode(file_get_contents("$dataPath/doctors.json"), true);
        $stmt = $pdo->prepare("INSERT INTO `doctors_vaidyas` (`doctor_id`, `name`, `title`, `qualification`, `experience_years`, `specialization`, `bio`, `image_url`)
            VALUES (:doctor_id, :name, :title, :qualification, :experience_years, :specialization, :bio, :image_url);");
        $pdo->exec("TRUNCATE TABLE `doctors_vaidyas`;");
        foreach ($docs as $d) {
            $stmt->execute([
                ':doctor_id' => $d['id'] ?? '',
                ':name' => $d['name'],
                ':title' => $d['title'] ?? '',
                ':qualification' => $d['qualification'] ?? '',
                ':experience_years' => $d['experience'] ?? 10,
                ':specialization' => $d['specialization'] ?? '',
                ':bio' => $d['bio'] ?? '',
                ':image_url' => $d['image'] ?? ''
            ]);
        }
        echo "   -> " . count($docs) . " Vaidyas seeded.\n";
    }

    // 9. Seed Quiz Questions
    if (file_exists("$dataPath/quiz_questions.json")) {
        $qs = json_decode(file_get_contents("$dataPath/quiz_questions.json"), true);
        $stmt = $pdo->prepare("INSERT INTO `quiz_questions` (`id`, `trait_en`, `trait_hi`, `options_json`)
            VALUES (:id, :trait_en, :trait_hi, :options_json)
            ON DUPLICATE KEY UPDATE `trait_en` = VALUES(`trait_en`), `options_json` = VALUES(`options_json`);");
        foreach ($qs as $q) {
            $stmt->execute([
                ':id' => $q['id'],
                ':trait_en' => $q['trait'],
                ':trait_hi' => $q['hindiTrait'] ?? $q['trait'],
                ':options_json' => json_encode($q['options'] ?? [], JSON_UNESCAPED_UNICODE)
            ]);
        }
        echo "   -> " . count($qs) . " Prakriti Questions seeded.\n";
    }

    // 10. Seed Claims
    if (file_exists("$dataPath/claims.json")) {
        $claims = json_decode(file_get_contents("$dataPath/claims.json"), true);
        $stmt = $pdo->prepare("INSERT INTO `claims_audit` (`claim_id`, `category`, `product_name`, `proposed_phrase`, `flagged_keywords_json`, `ayush_compliance_status`, `recommended_compliant_phrase`, `scientific_justification`)
            VALUES (:claim_id, :category, :product_name, :proposed_phrase, :flagged_keywords_json, :ayush_compliance_status, :recommended_compliant_phrase, :scientific_justification);");
        $pdo->exec("TRUNCATE TABLE `claims_audit`;");
        foreach ($claims as $cl) {
            $stmt->execute([
                ':claim_id' => $cl['id'] ?? '',
                ':category' => $cl['category'] ?? '',
                ':product_name' => $cl['productName'] ?? '',
                ':proposed_phrase' => $cl['proposedPhrase'] ?? '',
                ':flagged_keywords_json' => json_encode($cl['flaggedKeywords'] ?? [], JSON_UNESCAPED_UNICODE),
                ':ayush_compliance_status' => $cl['ayushComplianceStatus'] ?? 'COMPLIANT',
                ':recommended_compliant_phrase' => $cl['recommendedCompliantPhrase'] ?? '',
                ':scientific_justification' => $cl['scientificJustification'] ?? ''
            ]);
        }
        echo "   -> " . count($claims) . " Claims seeded.\n";
    }

    // 11. Seed Demo Orders for Admin Dashboard
    $orderCount = $pdo->query("SELECT COUNT(*) FROM `orders`")->fetchColumn();
    if ($orderCount == 0) {
        $demoOrders = [
            [
                'order_number' => 'AARU-ORD-8821',
                'customer_name' => 'Rahul Sharma',
                'customer_phone' => '+91 98765 43210',
                'customer_email' => 'rahul.s@gmail.com',
                'shipping_address' => 'Flat 402, Lotus Greens, Sector 78',
                'city' => 'Noida',
                'state' => 'Uttar Pradesh',
                'pincode' => '201301',
                'payment_method' => 'upi',
                'payment_status' => 'paid',
                'order_status' => 'shipped',
                'subtotal' => 1448.00,
                'discount' => 72.40,
                'shipping_fee' => 0.00,
                'total_amount' => 1375.60,
                'items_json' => json_encode([
                    ['name' => 'Pure Himalayan Shilajit Gold Resin', 'price' => 999, 'quantity' => 1, 'batch' => 'AARU-24-SH02'],
                    ['name' => 'Triphala Gut & Colon Detox', 'price' => 449, 'quantity' => 1, 'batch' => 'AARU-24-GT01']
                ], JSON_UNESCAPED_UNICODE),
                'tracking_number' => 'DELH9928172901',
                'courier_partner' => 'Delhivery Express'
            ],
            [
                'order_number' => 'AARU-ORD-8822',
                'customer_name' => 'Priya Nair',
                'customer_phone' => '+91 98234 11223',
                'customer_email' => 'priya.nair@outlook.com',
                'shipping_address' => '12B, Coral Heights, Indiranagar',
                'city' => 'Bengaluru',
                'state' => 'Karnataka',
                'pincode' => '560038',
                'payment_method' => 'cod',
                'payment_status' => 'pending',
                'order_status' => 'processing',
                'subtotal' => 849.00,
                'discount' => 0.00,
                'shipping_fee' => 0.00,
                'total_amount' => 849.00,
                'items_json' => json_encode([
                    ['name' => 'Shatavari Hormonal Balance Elixir', 'price' => 549, 'quantity' => 1, 'batch' => 'AARU-24-SW01'],
                    ['name' => 'Triphala Gut & Colon Detox', 'price' => 300, 'quantity' => 1, 'batch' => 'AARU-24-GT01']
                ], JSON_UNESCAPED_UNICODE),
                'tracking_number' => 'DELH9928172902',
                'courier_partner' => 'Delhivery Express'
            ]
        ];

        $stmt = $pdo->prepare("INSERT INTO `orders` (
            `order_number`, `customer_name`, `customer_phone`, `customer_email`, `shipping_address`,
            `city`, `state`, `pincode`, `payment_method`, `payment_status`, `order_status`, `subtotal`,
            `discount`, `shipping_fee`, `total_amount`, `items_json`, `tracking_number`, `courier_partner`
        ) VALUES (
            :order_number, :customer_name, :customer_phone, :customer_email, :shipping_address,
            :city, :state, :pincode, :payment_method, :payment_status, :order_status, :subtotal,
            :discount, :shipping_fee, :total_amount, :items_json, :tracking_number, :courier_partner
        );");

        foreach ($demoOrders as $ord) {
            $stmt->execute($ord);
        }
        echo "   -> 2 Demo Orders seeded for admin analytics.\n";
    }

    echo "\n[6/6] ✅ Migration & Seeding completed successfully!\n";

} catch (PDOException $e) {
    echo "❌ Database Error: " . $e->getMessage() . "\n";
    exit(1);
}
