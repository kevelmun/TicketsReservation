CREATE DATABASE IF NOT EXISTS ticket_system;
USE ticket_system;

CREATE TABLE IF NOT EXISTS events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    date DATETIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    total_tickets INT NOT NULL,
    available_tickets INT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(150) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS reservations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    event_id BIGINT,
    tickets INT NOT NULL,
    reservation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);


INSERT INTO events (
  name,
  description,
  date,
  location,
  total_tickets,
  available_tickets
)
VALUES
  (
    'Concierto de Rock',
    'Un concierto de rock con bandas locales.',
    '2023-12-15 20:00:00',
    'Auditorio Nacional',
    500,
    500
  ),
  (
    'Feria del Libro',
    'Una feria con autores y editoriales de todo el pais.',
    '2023-11-20 10:00:00',
    'Centro de Convenciones',
    1000,
    1000
  ),
  (
    'Exposicion de Arte',
    'Exposicion de arte contemporaneo.',
    '2023-12-01 09:00:00',
    'Museo de Arte Moderno',
    300,
    300
  );
-- Las contrasenas usadas son : "password"
INSERT INTO users (username, email, password, is_admin)
VALUES
  (
    'finn',
    'finnelhumano@adventure.com',
    '$2a$10$MlnUiTo2q/uJQY.hNQVZNOrNV2q2Z5BHNEpQlATPY58Pf.wjGH4.S', 
    false
  ),
  (
    'jake',
    'jake@adventure.com',
    '$2a$10$MlnUiTo2q/uJQY.hNQVZNOrNV2q2Z5BHNEpQlATPY58Pf.wjGH4.S', 
    true
  );

INSERT INTO reservations (user_id, event_id, tickets)
VALUES
  (1, 1, 2),
  (2, 2, 5);
