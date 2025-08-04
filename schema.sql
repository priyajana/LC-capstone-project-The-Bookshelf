-- Database: thebookshelf

-- ========== Table: Users ==========
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- ========== Table: Reviews ==========
CREATE TABLE IF NOT EXISTS reviews (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    book_name VARCHAR(200) NOT NULL,
    book_id VARCHAR (200) NOT NULL,
    content TEXT,
    rating INT ,
    CONSTRAINT fk_user_review FOREIGN KEY (user_id)
        REFERENCES users(id) ON DELETE CASCADE
);

-- ========== Table: Rentals ==========
CREATE TABLE IF NOT EXISTS rentals (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    book_name VARCHAR (200) NOT NULL,
    book_id VARCHAR (200) NOT NULL,
    CONSTRAINT fk_user_rental FOREIGN KEY (user_id)
        REFERENCES users(id) ON DELETE CASCADE
);