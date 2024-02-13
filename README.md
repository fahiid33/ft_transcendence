# 42-TRANSCENDANCE

## Description

This project aims to create a comprehensive web application for gaming and social interaction, with a primary focus on Pong gameplay. The platform includes features for user authentication, account management, chat functionality, and real-time multiplayer Pong gameplay. It emphasizes security, user engagement, and seamless gameplay experience.

## Features

### Security Concerns
- All passwords stored in the database are encrypted for enhanced security.
- Implemented protections against SQL injections to safeguard the website's integrity.
- Utilized server-side validation for forms and user inputs to prevent malicious activities.

### User Account
- Users can log in using the OAuth system of 42 intranet for streamlined authentication.
- Ability for users to choose a unique display name.
- Comprehensive user profile with statistics, including victories, losses, ladder level, and achievements.
- Option for users to upload or generate avatars.
- Support for 2-factor authentication methods like Google Authenticator or SMS.
- Users can add friends, view their status, and access match history.

### Chat
- Creation of public/private/protected channels.
- Direct messaging capability between users.
- Ability to block other users, ensuring privacy and control over interactions.
- Channel ownership management with password setting and administrator privileges.
- Administrators can ban, kick or mute users for a specified duration but not channel owners.
- Integration with Pong gameplay, allowing users to initiate matches and view player profiles directly from the chat interface.

### Game
- Live multiplayer Pong gameplay directly on the website.
- Match-making system for automatic pairing of players.
- Customization options for gameplay, including power-ups and different maps.
- Responsive design for optimal user experience across devices.
- Consideration for network issues, ensuring smooth gameplay despite disconnects or lag.

## Technologies Used

- Backend: NestJS
- Frontend: React
- Database: PostgreSQL

## Installation

1. Clone the repository from GitHub.
3. Configure environment variables for database connection and OAuth authentication.
4. Run the application using `docker compose up --build`

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or support, please contact [fahdstitu123@gmail.com](fahdstitu123@gmail.com).
