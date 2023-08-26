-- Table for storing information about tenants (organizations or users)
CREATE TABLE  IF NOT EXISTS `nka_tenants` (
  `id_tenant` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  domain VARCHAR(255) UNIQUE NOT NULL
);


-- Table for storing blog post comments
CREATE TABLE IF NOT EXISTS `nka_post_comments` (
  `id_comment` INT PRIMARY KEY AUTO_INCREMENT,
  `id_post` INT NOT NULL,
  `id_user` INT NOT NULL,
  `comment_text` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--  FOREIGN KEY (`id_post`) REFERENCES nka_posts(id_post),
--   FOREIGN KEY (`id_user`) REFERENCES nka_users(`id_user`)  
);

ALTER TABLE `nka_post_comments`
  ADD FOREIGN KEY (`id_post`) REFERENCES nka_posts(id_post);
  ADD FOREIGN KEY (`id_user`) REFERENCES nka_users(`id_user`);


-- Table for storing blog information
CREATE TABLE IF NOT EXISTS `nka_blogs` (
  `id_blog` INT PRIMARY KEY AUTO_INCREMENT,
  `id_tenant` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT
  -- FOREIGN KEY (`id_tenant`) REFERENCES nka_tenants(`id_tenant`) 
);




CREATE TABLE IF NOT EXISTS `nka_categories` (
  `id_category` bigint(20) UNSIGNED NOT NULL,
   `id_blog` INT NOT NULL, 
   `id_tenant` INT NOT NULL,
  `category_author` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `category_description` longtext COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `category_title` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `id_parent` bigint(20) UNSIGNED NOT NULL DEFAULT '1'
  -- FOREIGN KEY (`id_tenant`) REFERENCES nka_tenants(`id_tenant`)  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

CREATE TABLE IF NOT EXISTS  `nka_posts` (
  `id_post` bigint(20) UNSIGNED NOT NULL,
  `id_blog` INT NOT NULL,
  `post_author` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `post_date` datetime NOT NULL,
  `post_modified` datetime NOT NULL,
  `post_content` longtext COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `post_title` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `post_excerpt` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `post_status` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'publish',
  `comment_status` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'open',
  `id_category` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `post_image` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `comment_count` bigint(20) NOT NULL DEFAULT '0'
  -- FOREIGN KEY (id_blog) REFERENCES nka_blogs(`id_blog`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;


CREATE TABLE IF NOT EXISTS `nka_users` (
  `id_user` bigint(20) UNSIGNED NOT NULL,
  `user_login` varchar(60) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `id_tenant` int(11) NOT NULL,
  `user_pass` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `user_nicename` varchar(50) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `user_email` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `user_url` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `user_registered` datetime NOT NULL,
  `user_activation_key` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `user_status` int(11) NOT NULL DEFAULT '0',
  `display_name` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user'
  -- FOREIGN KEY (`id_tenant`) REFERENCES nka_tenants(`id_tenant`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;






















