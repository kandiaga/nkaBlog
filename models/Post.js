const db = require('../db');

class Post {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM  nka_posts');
        return rows;
    }

    static async create(post_title, post_content,post_excerpt,id_category,postImage,id_blog,id_tenant, userId, post_date,post_modified) {
        const [result] = await db.query('INSERT INTO nka_posts (post_title, post_content,post_excerpt,id_category,post_image,id_blog,id_tenant,id_user, post_date,post_modified) VALUES (?, ?,?,?,?,?,?,?, NOW(), NOW())',
						[post_title, post_content,post_excerpt,id_category,postImage,id_blog,id_tenant, userId, post_date,post_modified]);
        return result.insertId;
    }
}

module.exports = Post;
