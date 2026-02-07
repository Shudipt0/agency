-- MySQL dump 10.13  Distrib 8.4.3, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: my_agency
-- ------------------------------------------------------
-- Server version	8.4.3

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
-- Table structure for table `Contacts`
--

DROP TABLE IF EXISTS `Contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Contacts` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `phone` int DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Contacts`
--

LOCK TABLES `Contacts` WRITE;
/*!40000 ALTER TABLE `Contacts` DISABLE KEYS */;
INSERT INTO `Contacts` VALUES (1,'2025-12-16 18:04:36','shudipto','shuvo@gmail.com',1755735959,'nice to meet you'),(2,'2025-12-16 18:05:00','shuvo','shudipto@gmail.com',1955735959,'nice to meet you');
/*!40000 ALTER TABLE `Contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Members`
--

DROP TABLE IF EXISTS `Members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Members` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(50) NOT NULL,
  `profession` varchar(100) DEFAULT NULL,
  `bio_data` text,
  `image` varchar(255) DEFAULT NULL,
  `image_public_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Members`
--

LOCK TABLES `Members` WRITE;
/*!40000 ALTER TABLE `Members` DISABLE KEYS */;
INSERT INTO `Members` VALUES (1,'2025-12-16 18:02:48','Shudipto Roy','Web Developer','Web Developer','https://res.cloudinary.com/dsktb64i8/image/upload/v1765908169/rt6hcaxtwjr002klqzt8.jpg','rt6hcaxtwjr002klqzt8'),(2,'2025-12-16 18:04:06','Sajid Sheikh','Video Editor','Video Editor','https://res.cloudinary.com/dsktb64i8/image/upload/v1765908246/cv9pzgdoaekgwgkcsnrc.jpg','cv9pzgdoaekgwgkcsnrc');
/*!40000 ALTER TABLE `Members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Project_creators`
--

DROP TABLE IF EXISTS `Project_creators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Project_creators` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int unsigned DEFAULT NULL,
  `creator_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Project_creators_relation_2` (`creator_id`),
  KEY `Project_creators_relation_1` (`project_id`),
  CONSTRAINT `Project_creators_relation_1` FOREIGN KEY (`project_id`) REFERENCES `Projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Project_creators_relation_2` FOREIGN KEY (`creator_id`) REFERENCES `Members` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Project_creators`
--

LOCK TABLES `Project_creators` WRITE;
/*!40000 ALTER TABLE `Project_creators` DISABLE KEYS */;
INSERT INTO `Project_creators` VALUES (1,1,1),(2,2,1),(5,2,2);
/*!40000 ALTER TABLE `Project_creators` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Projects`
--

DROP TABLE IF EXISTS `Projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Projects` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `category` varchar(100) DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `image_public_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Projects`
--

LOCK TABLES `Projects` WRITE;
/*!40000 ALTER TABLE `Projects` DISABLE KEYS */;
INSERT INTO `Projects` VALUES (1,'2025-12-16 17:49:26','Web app','E-Commerce Application','Delex is a Delivery Platforme for bussiness owner And indivudial who want to send packages from a point to an other ,Delex offer a tracking system too','https://res.cloudinary.com/dsktb64i8/image/upload/v1766317445/xwd1e5fw8smxqqutzkyd.webp','https://e-commerce-dokan.vercel.app/','xwd1e5fw8smxqqutzkyd'),(2,'2025-12-16 17:52:24','Web application','Agency Application','Delex is a Delivery Platforme for bussiness owner And indivudial who want to send packages from a point to an other ,Delex offer a tracking system too','https://res.cloudinary.com/dsktb64i8/image/upload/v1765907544/ystgbngoqwo85cj0cvmq.png','https://green-dev-theta.vercel.app','ystgbngoqwo85cj0cvmq');
/*!40000 ALTER TABLE `Projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Services`
--

DROP TABLE IF EXISTS `Services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Services` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `service_name` varchar(100) DEFAULT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `image_public_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Services`
--

LOCK TABLES `Services` WRITE;
/*!40000 ALTER TABLE `Services` DISABLE KEYS */;
INSERT INTO `Services` VALUES (1,'2025-12-16 17:56:36','Web/App Development-1','Fast. Secure. Scalable. Built to grow with your business.We develop high-performance websites and web applications using the latest technologies. Whether it\'s a sleek corporate site or a powerful eCommerce platform,','https://res.cloudinary.com/dsktb64i8/image/upload/v1765907796/kupn8f0vhhkfs3qun1on.webp',NULL),(2,'2025-12-16 17:57:25','UI/UX Design ,Web Design','Transforming ideas into intuitive, seamless experiences.Our UI/UX design team focuses on creating human-centered digital experiences that not only look stunning but function flawlessly. From wireframes to high-fidelity prototypes, we design','https://res.cloudinary.com/dsktb64i8/image/upload/v1766222024/mkbsg4wstpto6fj2qv5b.webp','mkbsg4wstpto6fj2qv5b'),(3,'2025-12-19 06:15:50','web development-2','web development-2 web development-2 web development-2','https://res.cloudinary.com/dsktb64i8/image/upload/v1766220999/em8ly7yri4h3ncse6jaa.webp','em8ly7yri4h3ncse6jaa'),(4,'2025-12-19 06:29:06','video edit','video edit video edit video edit video edit video edit','https://res.cloudinary.com/dsktb64i8/image/upload/v1766125743/kzcdpw7ibgldiwrxkikv.webp','kzcdpw7ibgldiwrxkikv'),(5,'2025-12-19 06:34:13','video edit','video edit video edit video edit video edit','https://res.cloudinary.com/dsktb64i8/image/upload/v1766126050/x3qecra7cp7vn6ynw1r4.webp','x3qecra7cp7vn6ynw1r4'),(6,'2025-12-19 06:51:25','web  development','web  development web  development web  development web  development','https://res.cloudinary.com/dsktb64i8/image/upload/v1766127083/ktdemgein488hsedpcgd.webp','ktdemgein488hsedpcgd');
/*!40000 ALTER TABLE `Services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Thoughts`
--

DROP TABLE IF EXISTS `Thoughts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Thoughts` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expert_name` varchar(50) DEFAULT NULL,
  `bio_data` varchar(255) DEFAULT NULL,
  `thought` text,
  `image` varchar(255) DEFAULT NULL,
  `image_public_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Thoughts`
--

LOCK TABLES `Thoughts` WRITE;
/*!40000 ALTER TABLE `Thoughts` DISABLE KEYS */;
INSERT INTO `Thoughts` VALUES (1,'2025-12-16 18:00:55','sumit saha','senior developer','all is well hsdgljb weibf wiefhun wiedh wiedh iehufbf iwuefbi iwhfi iwfeb iwbfeibwi iwbficbwi iwbfibvbw iwfbiewejfbwi wifbi  iwef  qoqbdfiwe iwehfiwbdibc rff.','https://res.cloudinary.com/dsktb64i8/image/upload/v1765908054/qlelzjm7zea0cpafynyt.jpg','qlelzjm7zea0cpafynyt'),(2,'2025-12-16 18:01:12','hasin hydar','senior developer','all is well hsdgljb weibf wiefhun wiedh wiedh iehufbf iwuefbi iwhfi iwfeb iwbfeibwi iwbficbwi iwbfibvbw iwfbiewejfbwi wifbi  iwef  qoqbdfiwe iwehfiwbdibc rff.','https://res.cloudinary.com/dsktb64i8/image/upload/v1765908072/zihofqwkypgqprxokgmu.jpg','zihofqwkypgqprxokgmu');
/*!40000 ALTER TABLE `Thoughts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-06 17:54:17
