-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 192.168.223.53    Database: dbPruebaTecnica
-- ------------------------------------------------------
-- Server version	8.0.43-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `author_book`
--

DROP TABLE IF EXISTS `author_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author_book` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `author_id` bigint unsigned NOT NULL,
  `book_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `author_book_author_id_book_id_unique` (`author_id`,`book_id`),
  KEY `author_book_book_id_foreign` (`book_id`),
  CONSTRAINT `author_book_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE CASCADE,
  CONSTRAINT `author_book_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author_book`
--

LOCK TABLES `author_book` WRITE;
/*!40000 ALTER TABLE `author_book` DISABLE KEYS */;
INSERT INTO `author_book` VALUES (1,1,1,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(2,2,2,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(3,3,3,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(4,4,4,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(5,5,5,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(6,6,6,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(7,7,7,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(8,8,8,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(9,9,9,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(10,10,10,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(11,2,11,NULL,NULL);
/*!40000 ALTER TABLE `author_book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authors` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthdate` date DEFAULT NULL,
  `nationality` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (1,'Gabriel García Márquez','1927-03-06','Colombiano','2025-08-31 16:52:37','2025-08-31 16:52:37'),(2,'Isabel Allende','1942-08-02','Chilena','2025-08-31 16:52:37','2025-08-31 16:52:37'),(3,'Mario Vargas Llosa','1936-03-28','Peruano','2025-08-31 16:52:37','2025-08-31 16:52:37'),(4,'Julio Cortázar','1914-08-26','Argentino','2025-08-31 16:52:37','2025-08-31 16:52:37'),(5,'Jorge Luis Borges','1899-08-24','Argentino','2025-08-31 16:52:37','2025-08-31 16:52:37'),(6,'Laura Esquivel','1950-09-30','Mexicana','2025-08-31 16:52:37','2025-08-31 16:52:37'),(7,'Carlos Fuentes','1928-11-11','Mexicano','2025-08-31 16:52:37','2025-08-31 16:52:37'),(8,'Pablo Neruda','1904-07-12','Chileno','2025-08-31 16:52:37','2025-08-31 16:52:37'),(9,'Octavio Paz','1914-03-31','Mexicano','2025-08-31 16:52:37','2025-08-31 16:52:37'),(10,'Elena Poniatowska','1932-05-19','Mexicana','2025-08-31 16:52:37','2025-08-31 16:52:37'),(11,'Gabriel García Márquez',NULL,NULL,'2025-08-31 22:23:47','2025-08-31 22:23:47');
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_genre`
--

DROP TABLE IF EXISTS `book_genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_genre` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `book_id` bigint unsigned NOT NULL,
  `genre_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `book_genre_book_id_genre_id_unique` (`book_id`,`genre_id`),
  KEY `book_genre_genre_id_foreign` (`genre_id`),
  CONSTRAINT `book_genre_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  CONSTRAINT `book_genre_genre_id_foreign` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_genre`
--

LOCK TABLES `book_genre` WRITE;
/*!40000 ALTER TABLE `book_genre` DISABLE KEYS */;
INSERT INTO `book_genre` VALUES (1,1,1,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(2,1,3,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(3,2,1,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(4,2,8,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(5,3,1,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(6,4,1,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(7,5,1,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(8,5,3,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(9,6,1,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(10,6,5,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(11,7,1,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(12,7,8,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(13,8,10,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(14,9,10,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(15,10,9,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(16,11,1,NULL,NULL);
/*!40000 ALTER TABLE `book_genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isbn` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `published_year` int DEFAULT NULL,
  `copies_total` int NOT NULL DEFAULT '1',
  `copies_available` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `books_isbn_unique` (`isbn`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'Cien años de soledad','9788437604947',1967,5,5,'2025-08-31 16:52:37','2025-09-01 11:44:07'),(2,'La casa de los espíritus','9788401337208',1982,4,4,'2025-08-31 16:52:37','2025-09-01 11:36:02'),(3,'La ciudad y los perros','9788437604948',1963,3,3,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(4,'Rayuela','9788437604949',1963,6,6,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(5,'Ficciones','9788437604950',1944,4,4,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(6,'Como agua para chocolate','9788437604951',1989,5,5,'2025-08-31 16:52:37','2025-09-01 11:58:07'),(7,'La región más transparente','9788437604952',1958,3,3,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(8,'Veinte poemas de amor','9788437604953',1924,7,7,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(9,'El laberinto de la soledad','9788437604954',1950,4,4,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(10,'La noche de Tlatelolco','9788437604955',1971,3,3,'2025-08-31 16:52:37','2025-08-31 16:52:37'),(11,'las aventuras del diablo','123456789645',2025,5,5,'2025-09-01 08:02:21','2025-09-01 08:02:21');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `genres_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Ficción','Obras de literatura imaginativa','2025-08-31 16:52:36','2025-08-31 16:52:36'),(2,'Ciencia Ficción','Narrativa sobre futuros imaginarios y tecnología','2025-08-31 16:52:36','2025-08-31 16:52:36'),(3,'Fantasía','Mundos mágicos y seres sobrenaturales','2025-08-31 16:52:36','2025-08-31 16:52:36'),(4,'Misterio','Historias de detectives y crímenes por resolver','2025-08-31 16:52:36','2025-08-31 16:52:36'),(5,'Romance','Historias de amor y relaciones','2025-08-31 16:52:36','2025-08-31 16:52:36'),(6,'Terror','Narrativa que busca provocar miedo','2025-08-31 16:52:36','2025-08-31 16:52:36'),(7,'Aventura','Historias de acción y exploración','2025-08-31 16:52:36','2025-08-31 16:52:36'),(8,'Histórico','Ficción ambientada en el pasado','2025-08-31 16:52:36','2025-08-31 16:52:36'),(9,'Biografía','Relatos de vidas reales','2025-08-31 16:52:36','2025-08-31 16:52:36'),(10,'Ciencia','Libros sobre descubrimientos científicos','2025-08-31 16:52:36','2025-08-31 16:52:36'),(11,'apacionados','apacionadosapacionados','2025-09-01 09:28:52','2025-09-01 09:28:52'),(12,'prueba daniel','libros de prueba','2025-09-01 10:00:23','2025-09-01 10:00:23');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loans`
--

DROP TABLE IF EXISTS `loans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loans` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `book_id` bigint unsigned NOT NULL,
  `status_id` bigint unsigned NOT NULL,
  `loan_date` datetime NOT NULL,
  `due_date` datetime NOT NULL,
  `return_date` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `loans_book_id_foreign` (`book_id`),
  KEY `loans_status_id_foreign` (`status_id`),
  KEY `loans_user_id_book_id_index` (`user_id`,`book_id`),
  KEY `loans_due_date_index` (`due_date`),
  CONSTRAINT `loans_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  CONSTRAINT `loans_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `loans_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loans`
--

LOCK TABLES `loans` WRITE;
/*!40000 ALTER TABLE `loans` DISABLE KEYS */;
INSERT INTO `loans` VALUES (1,2,2,2,'2025-09-01 05:56:02','2025-09-16 00:00:00','2025-09-01 06:37:01','2025-09-01 10:56:02','2025-09-01 11:37:01'),(2,2,1,2,'2025-09-01 06:43:12','2025-09-04 00:00:00','2025-09-01 06:44:07','2025-09-01 11:43:12','2025-09-01 11:44:07'),(3,2,1,2,'2025-09-01 06:43:53','2025-09-05 00:00:00','2025-09-01 06:56:06','2025-09-01 11:43:53','2025-09-01 11:56:06'),(4,2,6,2,'2025-09-01 06:57:34','2025-09-10 00:00:00','2025-09-01 06:58:07','2025-09-01 11:57:34','2025-09-01 11:58:07');
/*!40000 ALTER TABLE `loans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_reset_tokens_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2019_12_14_000001_create_personal_access_tokens_table',1),(5,'2025_08_30_154426_create_statuses_table',2),(6,'2025_08_30_154435_create_authors_table',2),(7,'2025_08_30_154442_create_books_table',2),(8,'2025_08_30_154451_create_author_book_table',2),(9,'2025_08_30_154459_create_loans_table',2),(10,'2025_08_30_154813_add_fields_to_users_table',2),(11,'2025_08_30_170923_create_genres_table',3),(12,'2025_08_30_170952_create_book_genre_table',3);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (1,'Domain\\Entities\\User',2,'auth_token','da14dd0431597c728b80a4ace02bb9ed92d855b3e93a96a84bec9e89c56c3a6f','[\"*\"]',NULL,'2025-08-30 09:58:20','2025-08-30 09:58:20','2025-08-30 09:58:20'),(2,'Domain\\Entities\\User',2,'refresh_token','698219b6e3c0950001ae8f0cc897fa6351270650f004d207c9abcfa2898ca58a','[\"refresh\"]',NULL,'2025-09-06 09:58:20','2025-08-30 09:58:20','2025-08-30 09:58:20'),(3,'Domain\\Entities\\User',2,'auth_token','3e292778711e4c188135ecabac45a27551c9e67358a12123de435e30afff31f2','[\"*\"]',NULL,'2025-08-30 10:04:39','2025-08-30 10:04:39','2025-08-30 10:04:39'),(4,'Domain\\Entities\\User',2,'refresh_token','5b792aabf9489d9ff4cc3462472c162e8ea830cc814e95a6e12a68a4dd8a278c','[\"refresh\"]',NULL,'2025-09-06 10:04:39','2025-08-30 10:04:39','2025-08-30 10:04:39'),(5,'Domain\\Entities\\User',2,'auth_token','ba51891a5f22fea24b103e2efccc821969c043bdfdb1d500f98ef50d6d5a41ff','[\"*\"]',NULL,'2025-08-30 11:23:32','2025-08-30 11:23:32','2025-08-30 11:23:32'),(6,'Domain\\Entities\\User',2,'refresh_token','273ce035295f9b61938159919dc279bb403490a7dd88fbbb33edddbf25a65415','[\"refresh\"]',NULL,'2025-09-06 11:23:32','2025-08-30 11:23:32','2025-08-30 11:23:32'),(7,'Domain\\Entities\\User',2,'auth_token','23f0d52deae958d04bfdee9469627f8418763367e331f1131c207d55b256d843','[\"*\"]',NULL,'2025-08-30 11:28:06','2025-08-30 11:28:06','2025-08-30 11:28:06'),(8,'Domain\\Entities\\User',2,'refresh_token','9e28fbcce022de29f8835d329632adeba47a31ba0d1bf3dd074d77f40c1ab44a','[\"refresh\"]',NULL,'2025-09-06 11:28:06','2025-08-30 11:28:06','2025-08-30 11:28:06'),(9,'Domain\\Entities\\User',2,'auth_token','704301a761b987bcc12d6b811d20cb37fc698e8855fff3e0e22d74008e1d9e29','[\"*\"]',NULL,'2025-08-30 11:31:21','2025-08-30 11:31:21','2025-08-30 11:31:21'),(10,'Domain\\Entities\\User',2,'refresh_token','a12f57b5c72f7fa2254ca438c46653fe6e3f6d77acfcb882dfa47da1b5bf3022','[\"refresh\"]',NULL,'2025-09-06 11:31:21','2025-08-30 11:31:21','2025-08-30 11:31:21'),(11,'Domain\\Entities\\User',2,'auth_token','6d4276069bd76ddabccb2e450e27f5eb4c18b0a4fe7c9993073532a26ddc45a2','[\"*\"]',NULL,'2025-09-01 03:13:37','2025-09-01 03:13:37','2025-09-01 03:13:37'),(12,'Domain\\Entities\\User',2,'refresh_token','0310e8eec079808940bb39a38411c6066e80fde30f4c7e9918b593eb13d534f1','[\"refresh\"]',NULL,'2025-09-08 03:13:37','2025-09-01 03:13:37','2025-09-01 03:13:37'),(13,'Domain\\Entities\\User',2,'auth_token','38ea2576085cb541fac0aecec1d9109a911270dccd1efb812d412771b43de2ac','[\"*\"]',NULL,'2025-09-01 03:13:48','2025-09-01 03:13:48','2025-09-01 03:13:48'),(14,'Domain\\Entities\\User',2,'refresh_token','f45a6ecf09d5f7ff33d07c7295414f740303499c8d2b489edd46f6eba8da15a2','[\"refresh\"]',NULL,'2025-09-08 03:13:48','2025-09-01 03:13:48','2025-09-01 03:13:48'),(15,'Domain\\Entities\\User',2,'auth_token','ac0a3cd08f4d611f1687cd76831b28e5fd75cf69f9133c6f31982ef9a7db9fc1','[\"*\"]',NULL,'2025-09-01 03:15:21','2025-09-01 03:15:21','2025-09-01 03:15:21'),(16,'Domain\\Entities\\User',2,'refresh_token','55319e416f75d5d2fa6759663021b9639f3753b45a030c18ed0bb50ff6ae885f','[\"refresh\"]',NULL,'2025-09-08 03:15:21','2025-09-01 03:15:21','2025-09-01 03:15:21'),(17,'Domain\\Entities\\User',2,'auth_token','4450c23fbba1239bc47a62d6c1c97f7e2b76a3fcf4c4b27f2a95f6c3c6cb2ade','[\"*\"]',NULL,'2025-09-01 03:24:21','2025-09-01 03:24:21','2025-09-01 03:24:21'),(18,'Domain\\Entities\\User',2,'refresh_token','5b572dacce483be1d5845b65fdf9ce2b78e3f29293f26a4c6e0058a892458ca2','[\"refresh\"]',NULL,'2025-09-08 03:24:21','2025-09-01 03:24:21','2025-09-01 03:24:21'),(19,'Domain\\Entities\\User',2,'auth_token','fbf145803b5d7dfb2dcd58d2fcef01e26fe67b587945a68655a2c2f4e161d175','[\"*\"]',NULL,'2025-09-01 03:30:36','2025-09-01 03:30:36','2025-09-01 03:30:36'),(20,'Domain\\Entities\\User',2,'refresh_token','52855f592f6c786d896a78639d08c9cfc9809c66c63fee30c51e6dcb0ac35e88','[\"refresh\"]',NULL,'2025-09-08 03:30:36','2025-09-01 03:30:36','2025-09-01 03:30:36'),(21,'Domain\\Entities\\User',2,'auth_token','3b0c517830e980f91acc6198bdaf2ee3e76b08d4499aa40cd04b3e279585385d','[\"*\"]',NULL,'2025-09-01 03:35:10','2025-09-01 03:35:10','2025-09-01 03:35:10'),(22,'Domain\\Entities\\User',2,'refresh_token','f6e1c9865850d8562c1c9886bebe8e1b655ddfda1dc955fa505f4d0d12290fba','[\"refresh\"]',NULL,'2025-09-08 03:35:10','2025-09-01 03:35:10','2025-09-01 03:35:10'),(23,'Domain\\Entities\\User',2,'auth_token','662a19195a330f4bd659f754e19e8f655eb6a5b68e73358afb09c942aab9f60e','[\"*\"]',NULL,'2025-09-01 03:36:26','2025-09-01 03:36:26','2025-09-01 03:36:26'),(24,'Domain\\Entities\\User',2,'refresh_token','c65f561ef3aa223eda88687fb7be7418511c7cf8229cfe5a8f89f1059f6a947f','[\"refresh\"]',NULL,'2025-09-08 03:36:26','2025-09-01 03:36:26','2025-09-01 03:36:26'),(25,'Domain\\Entities\\User',2,'auth_token','37255fd5c92745f008ca70e81484262cbef406262b5d43df1f80a23aad70cd65','[\"*\"]',NULL,'2025-09-01 03:37:14','2025-09-01 03:37:14','2025-09-01 03:37:14'),(26,'Domain\\Entities\\User',2,'refresh_token','c5ce0ba568c3d2346891072235a9c98c2d975996304d1717d30b69b4a9b534db','[\"refresh\"]',NULL,'2025-09-08 03:37:14','2025-09-01 03:37:14','2025-09-01 03:37:14'),(27,'Domain\\Entities\\User',2,'auth_token','65a0d93c871b4c556af5f8a3cdcd5f157f533ced6440794d191399faa5ae6da3','[\"*\"]',NULL,'2025-09-01 03:37:15','2025-09-01 03:37:15','2025-09-01 03:37:15'),(28,'Domain\\Entities\\User',2,'refresh_token','add8a89e8d6afd79d3c3fa1364158c294be170e2d32f2671dae5b3ee4303a9f3','[\"refresh\"]',NULL,'2025-09-08 03:37:15','2025-09-01 03:37:15','2025-09-01 03:37:15'),(29,'Domain\\Entities\\User',2,'auth_token','d5169d5ea0264d12c7cce22c11e4a9afaf48c046c58342989caf9d85a32c5c63','[\"*\"]',NULL,'2025-09-01 03:37:23','2025-09-01 03:37:23','2025-09-01 03:37:23'),(30,'Domain\\Entities\\User',2,'refresh_token','574f002de89239a2288491ca7c69c2cf6b27755291efcd90630c79737a089fa5','[\"refresh\"]',NULL,'2025-09-08 03:37:23','2025-09-01 03:37:23','2025-09-01 03:37:23'),(31,'Domain\\Entities\\User',2,'auth_token','a1a45b7f2962958cd56feefbbb81b774a2b2473fb028fdd186e8ab1f436a097b','[\"*\"]',NULL,'2025-09-01 03:37:53','2025-09-01 03:37:53','2025-09-01 03:37:53'),(32,'Domain\\Entities\\User',2,'refresh_token','60578eb8b0f24099f8d9afae2dcefb2328212f87eca8e779c2b548ebd238ac0f','[\"refresh\"]',NULL,'2025-09-08 03:37:53','2025-09-01 03:37:53','2025-09-01 03:37:53'),(33,'Domain\\Entities\\User',2,'auth_token','d335c131c40e1a79f0ba2a4ffb965929c47ac0ae62a5b300f6931bfe38d17aa2','[\"*\"]',NULL,'2025-09-01 03:40:42','2025-09-01 03:40:42','2025-09-01 03:40:42'),(34,'Domain\\Entities\\User',2,'refresh_token','d13590c7e27d57543b27130aff3ece71436f3d2f745303ef1773ca23ad233eb7','[\"refresh\"]',NULL,'2025-09-08 03:40:42','2025-09-01 03:40:42','2025-09-01 03:40:42'),(35,'Domain\\Entities\\User',2,'auth_token','62c99d08540ec56a074aec5ececf720249208f270dc99a5739aced3ce685926e','[\"*\"]',NULL,'2025-09-01 03:41:05','2025-09-01 03:41:05','2025-09-01 03:41:05'),(36,'Domain\\Entities\\User',2,'refresh_token','cfc8a78993b13dc9c4ad57a84190791517c5fd0389830dfd94eb1a2f47bb55d0','[\"refresh\"]',NULL,'2025-09-08 03:41:05','2025-09-01 03:41:05','2025-09-01 03:41:05'),(37,'Domain\\Entities\\User',2,'auth_token','5fa0b8ed109788e78bc008293011054567cd985759129e70a6dfa13b64ab359a','[\"*\"]',NULL,'2025-09-01 03:41:12','2025-09-01 03:41:12','2025-09-01 03:41:12'),(38,'Domain\\Entities\\User',2,'refresh_token','84503cc3bbd685c3d1a5aae6b5c9f2ee27cdc644133e67c733d35fbdd6c4d149','[\"refresh\"]',NULL,'2025-09-08 03:41:12','2025-09-01 03:41:12','2025-09-01 03:41:12'),(39,'Domain\\Entities\\User',2,'auth_token','2b234525bab3a2ce49d2ab81ee36326bb167ddaf4e8103549d202a2c1688501b','[\"*\"]',NULL,'2025-09-01 03:45:34','2025-09-01 03:45:34','2025-09-01 03:45:34'),(40,'Domain\\Entities\\User',2,'refresh_token','ee4146c15c586c3455d3e7f14dd000b1e2caa3c8c3986b9b378a45b1b4f44355','[\"refresh\"]',NULL,'2025-09-08 03:45:34','2025-09-01 03:45:34','2025-09-01 03:45:34'),(41,'Domain\\Entities\\User',2,'auth_token','e7f07d0c07fda22fde8a876744c645d156969f8cc44ecd26a1306038a0d64e5a','[\"*\"]',NULL,'2025-09-01 03:46:58','2025-09-01 03:46:58','2025-09-01 03:46:58'),(42,'Domain\\Entities\\User',2,'refresh_token','f29268a587332f7a405a18d383dfc2d6139eed4b431e3eac07c4da88bda4b02e','[\"refresh\"]',NULL,'2025-09-08 03:46:58','2025-09-01 03:46:58','2025-09-01 03:46:58'),(43,'Domain\\Entities\\User',2,'auth_token','57ebc1c693279ddaaf0bb561ace4dc69511cc212fc796842a6643ebb92590523','[\"*\"]',NULL,'2025-09-01 03:48:20','2025-09-01 03:48:20','2025-09-01 03:48:20'),(44,'Domain\\Entities\\User',2,'refresh_token','2f13e330130e7ad868320d00b6af23dd43056c77beedc8972ca3d37ab5506d4b','[\"refresh\"]',NULL,'2025-09-08 03:48:20','2025-09-01 03:48:20','2025-09-01 03:48:20'),(45,'Domain\\Entities\\User',2,'auth_token','16445e7b8b9603d263311698292bfa7488f090eaa5b73b0bb8e78a89f853b859','[\"*\"]',NULL,'2025-09-01 03:49:05','2025-09-01 03:49:05','2025-09-01 03:49:05'),(46,'Domain\\Entities\\User',2,'refresh_token','aa24602807ae1b069a7571695204d0b8c94d89b543423328954e29159e43c31e','[\"refresh\"]',NULL,'2025-09-08 03:49:05','2025-09-01 03:49:05','2025-09-01 03:49:05'),(47,'Domain\\Entities\\User',2,'auth_token','bb438f2902acf52e591f3ddef0b67b862156a59b471e487e08c0b65be3c8ee87','[\"*\"]',NULL,'2025-09-01 03:52:39','2025-09-01 03:52:39','2025-09-01 03:52:39'),(48,'Domain\\Entities\\User',2,'refresh_token','f9c25e979e200fe202d1c859b2cff9e227266191aff00fb2db2b916013e9234d','[\"refresh\"]',NULL,'2025-09-08 03:52:39','2025-09-01 03:52:39','2025-09-01 03:52:39'),(49,'Domain\\Entities\\User',2,'auth_token','326385ea20ce5ec951af5f9fa16d35fb851e1f81f004d2d6b2c01d75ffab14cf','[\"*\"]',NULL,'2025-09-01 03:53:03','2025-09-01 03:53:03','2025-09-01 03:53:03'),(50,'Domain\\Entities\\User',2,'refresh_token','c29d8b20aa7526ca27cd8044133a878b38f18092b26fb4458ed38ef5247685c9','[\"refresh\"]',NULL,'2025-09-08 03:53:03','2025-09-01 03:53:03','2025-09-01 03:53:03'),(51,'Domain\\Entities\\User',2,'auth_token','e7fb09b73d9f9f03a4f6462ca1a10de972e76b31d0b96ecf21b14b6a10fab81d','[\"*\"]',NULL,'2025-09-01 03:53:10','2025-09-01 03:53:10','2025-09-01 03:53:10'),(52,'Domain\\Entities\\User',2,'refresh_token','779d48b86c751dc9859b0e079011019f8ca93fd9dfa37c2790f9a7a0bfc5b35d','[\"refresh\"]',NULL,'2025-09-08 03:53:10','2025-09-01 03:53:10','2025-09-01 03:53:10'),(53,'Domain\\Entities\\User',2,'auth_token','4961faca64a54eef919ce1bf019e2afe3caa7aa6069c276b94c0a8e555d2cc8f','[\"*\"]',NULL,'2025-09-01 04:01:34','2025-09-01 04:01:34','2025-09-01 04:01:34'),(54,'Domain\\Entities\\User',2,'refresh_token','1cb2562084d22c9a2ff5186a5c360d581a617e3381c5e0cc0e3ad7f47249c6e2','[\"refresh\"]',NULL,'2025-09-08 04:01:34','2025-09-01 04:01:34','2025-09-01 04:01:34'),(55,'Domain\\Entities\\User',2,'auth_token','7f30474635b7e08c4cec0dcc5e59b2934d642d7e33d54296439c020f1d748a97','[\"*\"]',NULL,'2025-09-01 04:02:21','2025-09-01 04:02:21','2025-09-01 04:02:21'),(56,'Domain\\Entities\\User',2,'refresh_token','1d91ced2d14985c8a16a25030ac02984fb339d572c8b7af106f713962992d314','[\"refresh\"]',NULL,'2025-09-08 04:02:21','2025-09-01 04:02:21','2025-09-01 04:02:21'),(57,'Domain\\Entities\\User',2,'auth_token','6dd3800695f0997baa27cfda5a0827d304026b0ed0056cb1154b34162851d0ec','[\"*\"]',NULL,'2025-09-01 04:03:07','2025-09-01 04:03:07','2025-09-01 04:03:07'),(58,'Domain\\Entities\\User',2,'refresh_token','deb03cf4a3455bdbe6274cbcad4b72329fb26b24ea95c6a0ae7a08087316f613','[\"refresh\"]',NULL,'2025-09-08 04:03:07','2025-09-01 04:03:07','2025-09-01 04:03:07'),(59,'Domain\\Entities\\User',2,'auth_token','5457a60b26bb61ac6e1d4ef1433b20854cdd2f2233e5b8758111d0fe17f97c1d','[\"*\"]',NULL,'2025-09-01 04:05:33','2025-09-01 04:05:33','2025-09-01 04:05:33'),(60,'Domain\\Entities\\User',2,'refresh_token','6d96173bba7f6999ededef2f0cb329b9be8e9813c388b8e84f71fdc956670b95','[\"refresh\"]',NULL,'2025-09-08 04:05:33','2025-09-01 04:05:33','2025-09-01 04:05:33'),(61,'Domain\\Entities\\User',2,'auth_token','815e6512435a9f46cd072f00c676cf3ade8ade4c7affb93c750cda846abf165d','[\"*\"]',NULL,'2025-09-01 04:12:16','2025-09-01 04:12:16','2025-09-01 04:12:16'),(62,'Domain\\Entities\\User',2,'refresh_token','93b3adac3d2e1f05181fca74884dd1519cf6b300ca8dc999673699fdd4fc71fa','[\"refresh\"]',NULL,'2025-09-08 04:12:16','2025-09-01 04:12:16','2025-09-01 04:12:16'),(63,'Domain\\Entities\\User',2,'auth_token','74a7175c727d44fcee14b3ce02927f78feed82607a25ccb7cd445c75b152cd79','[\"*\"]',NULL,'2025-09-01 04:13:58','2025-09-01 04:13:58','2025-09-01 04:13:58'),(64,'Domain\\Entities\\User',2,'refresh_token','3787a9001be874df4f7c0579eeb338f031d184121d438c8aac5d0c462e3f7243','[\"refresh\"]',NULL,'2025-09-08 04:13:58','2025-09-01 04:13:58','2025-09-01 04:13:58'),(65,'Domain\\Entities\\User',2,'auth_token','949ba3958c5b76ef4f73a4e6918ed18bf175ba8bd529a50bcebbb14bc27e0ed6','[\"*\"]',NULL,'2025-09-01 04:22:33','2025-09-01 04:22:33','2025-09-01 04:22:33'),(66,'Domain\\Entities\\User',2,'refresh_token','ec7ac19ebe082ceebf9f49c262684c8730252e786f1a37074ebcc236b99aac18','[\"refresh\"]',NULL,'2025-09-08 04:22:33','2025-09-01 04:22:33','2025-09-01 04:22:33'),(67,'Domain\\Entities\\User',2,'auth_token','05398ba1b918482578fc8c651b17ce4e881905b5da11196c6b233856d5ecd539','[\"*\"]',NULL,'2025-09-01 04:42:35','2025-09-01 04:42:35','2025-09-01 04:42:35'),(68,'Domain\\Entities\\User',2,'refresh_token','4efa7f21f6a5b9c54cc0c19ccecb6aea62b043241682a897a35376f208f0c8ab','[\"refresh\"]',NULL,'2025-09-08 04:42:35','2025-09-01 04:42:35','2025-09-01 04:42:35'),(69,'Domain\\Entities\\User',2,'auth_token','35102d6de0dab16d2246cca8b69fa45e0bd790a7a959c8a43b93717fa8347081','[\"*\"]',NULL,'2025-09-01 04:42:59','2025-09-01 04:42:59','2025-09-01 04:42:59'),(70,'Domain\\Entities\\User',2,'refresh_token','04e46f7b6b5f5a0d3e636166b138c99cd8be5f2054d7c0819071a0be4b0617ec','[\"refresh\"]',NULL,'2025-09-08 04:42:59','2025-09-01 04:42:59','2025-09-01 04:42:59'),(71,'Domain\\Entities\\User',2,'auth_token','0259e28fdd1803f4b38dffcff5ea2a0982910240592b83ff617904bfc3797ead','[\"*\"]',NULL,'2025-09-01 08:08:00','2025-09-01 08:08:00','2025-09-01 08:08:00'),(72,'Domain\\Entities\\User',2,'refresh_token','43ea1c991c14130ccfd50333e8a173fe4899341a1db856bd2ed43e40174cb1bf','[\"refresh\"]',NULL,'2025-09-08 08:08:00','2025-09-01 08:08:00','2025-09-01 08:08:00'),(73,'Domain\\Entities\\User',2,'auth_token','7f5a00ac77daf2a848ae189098b04a19bc5162629f93d5c74323d5cc80ac22d8','[\"*\"]',NULL,'2025-09-01 08:13:40','2025-09-01 08:13:40','2025-09-01 08:13:40'),(74,'Domain\\Entities\\User',2,'refresh_token','488c5c0b6e15436b934f11b7b87e3eb51615be5d3d88c03348136fa7d5f6fa9b','[\"refresh\"]',NULL,'2025-09-08 08:13:40','2025-09-01 08:13:40','2025-09-01 08:13:40'),(75,'Domain\\Entities\\User',2,'auth_token','72c7ec5f7289feb7f3357f8e0e890561110706e6129192bfbaf76105c7c05ebd','[\"*\"]',NULL,'2025-09-01 10:01:26','2025-09-01 10:01:26','2025-09-01 10:01:26'),(76,'Domain\\Entities\\User',2,'refresh_token','d7d9d6b0cf9f8bee5e77f905d19344343742ba70a107d2e8b2d4095dad28050f','[\"refresh\"]',NULL,'2025-09-08 10:01:26','2025-09-01 10:01:26','2025-09-01 10:01:26'),(77,'Domain\\Entities\\User',2,'auth_token','dd28ae6622cefadbd0a0031787558b71fd8ab0cd4eda8fd762e6ecdffffe7a15','[\"*\"]',NULL,'2025-09-01 10:46:59','2025-09-01 10:46:59','2025-09-01 10:46:59'),(78,'Domain\\Entities\\User',2,'refresh_token','4a8b1b1f0291d15bc5c2180beb5f8c0dc2c4ab34b1a4da4cc1c36715761a8fdf','[\"refresh\"]',NULL,'2025-09-08 10:46:59','2025-09-01 10:46:59','2025-09-01 10:46:59'),(79,'Domain\\Entities\\User',2,'auth_token','5fd01f15586c9ceddfec662e897eeb775687182c3fd3674cf40073c2abaf6a0a','[\"*\"]',NULL,'2025-09-01 13:16:32','2025-09-01 13:16:32','2025-09-01 13:16:32'),(80,'Domain\\Entities\\User',2,'refresh_token','83e3b99ea00620c8686e11c0b5aaf5b521a5759c80f7ff78f00f034506297190','[\"refresh\"]',NULL,'2025-09-08 13:16:32','2025-09-01 13:16:32','2025-09-01 13:16:32'),(81,'Domain\\Entities\\User',2,'auth_token','7a120f545dbe4206841c16e838f8cbffd4ed7f196f88c34b2b46361cb947f680','[\"*\"]',NULL,'2025-09-01 13:18:36','2025-09-01 13:18:36','2025-09-01 13:18:36'),(82,'Domain\\Entities\\User',2,'refresh_token','ed0a31aec035323b36d230368e63812feda9a23e7c09bd89893c5432bbcf9788','[\"refresh\"]',NULL,'2025-09-08 13:18:36','2025-09-01 13:18:36','2025-09-01 13:18:36');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statuses`
--

DROP TABLE IF EXISTS `statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statuses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `statuses_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statuses`
--

LOCK TABLES `statuses` WRITE;
/*!40000 ALTER TABLE `statuses` DISABLE KEYS */;
INSERT INTO `statuses` VALUES (1,'prestado','Libro actualmente prestado','2025-08-31 16:52:37','2025-08-31 16:52:37'),(2,'devuelto','Libro ya fue devuelto','2025-08-31 16:52:37','2025-08-31 16:52:37'),(3,'vencido','Libro con fecha de devolución vencida','2025-08-31 16:52:37','2025-08-31 16:52:37'),(4,'reservado','Libro reservado para próximo préstamo','2025-08-31 16:52:37','2025-08-31 16:52:37'),(5,'perdido','Libro reportado como perdido','2025-08-31 16:52:37','2025-08-31 16:52:37');
/*!40000 ALTER TABLE `statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `birthdate` date DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'John Doe','john@example.com',NULL,NULL,NULL,1,NULL,'$2y$12$q/whNlu9EaEglrET85ekbemeA.BeTURN0RUDTGCMkBjtkK1j4MfAe',NULL,'2025-08-30 04:38:53','2025-08-30 04:38:53'),(2,'daniel','danielp@example.com',NULL,NULL,NULL,1,NULL,'$2y$12$K5BHUXWdZzajI8icXyGDtelvXXDZswvd6nV7bbhBCcwoRcLgT2Z.C',NULL,'2025-08-30 08:05:32','2025-08-30 08:05:32'),(3,'Juan Pérez','juan.perez@email.com',NULL,NULL,NULL,1,NULL,'$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'2025-08-31 16:51:52','2025-08-31 16:51:52'),(4,'María García','maria.garcia@email.com',NULL,NULL,NULL,1,NULL,'$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'2025-08-31 16:51:52','2025-08-31 16:51:52'),(5,'Carlos López','carlos.lopez@email.com',NULL,NULL,NULL,1,NULL,'$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'2025-08-31 16:51:52','2025-08-31 16:51:52'),(6,'Ana Martínez','ana.martinez@email.com',NULL,NULL,NULL,1,NULL,'$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'2025-08-31 16:51:52','2025-08-31 16:51:52'),(7,'Pedro Rodríguez','pedro.rodriguez@email.com',NULL,NULL,NULL,1,NULL,'$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'2025-08-31 16:51:52','2025-08-31 16:51:52'),(8,'Laura Sánchez','laura.sanchez@email.com',NULL,NULL,NULL,1,NULL,'$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'2025-08-31 16:51:52','2025-08-31 16:51:52'),(9,'Miguel González','miguel.gonzalez@email.com',NULL,NULL,NULL,1,NULL,'$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'2025-08-31 16:51:52','2025-08-31 16:51:52'),(10,'Sofía Hernández','sofia.hernandez@email.com',NULL,NULL,NULL,1,NULL,'$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'2025-08-31 16:51:52','2025-08-31 16:51:52'),(11,'David Ramírez','david.ramirez@email.com',NULL,NULL,NULL,1,NULL,'$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'2025-08-31 16:51:52','2025-08-31 16:51:52'),(12,'Elena Torres','elena.torres@email.com',NULL,NULL,NULL,1,NULL,'$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'2025-08-31 16:51:52','2025-08-31 16:51:52');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'dbPruebaTecnica'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-01  4:02:15
