# Google Photos Clone

Welcome to the Google Photos Clone! This project aims to replicate the core features and functionalities of Google Photos, allowing users to store, manage, and share their photos and videos in a user-friendly web application.

## Features

- **Photo Upload**: Users can upload photos and videos from their local devices to the application.

- **Photo Organization**: The application provides features to organize photos into albums or folders.

- **Sharing**: Users can share their photos and albums with others through email invitations or public links.

- **Favorites**: Users can mark photos as favorites for quick access.

- **Archiving**: Photos can be archived to hide them from the main view without deleting them.

- **Trash Bin**: Deleted photos are moved to the trash bin, allowing users to restore or permanently delete them.

- **Download**: Users can download their photos and videos from the application.

- **Security**: User data is protected with secure authentication and authorization mechanisms.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, React.js
  - Store Management: Redux
  - Styling: Bootstrap, Material UI
- **Backend**: Firebase
  - Database: Firebase Firestore
  - Authentication: Firebase Authentication
  - Cloud Storage: Firebase Cloud Storage

## Setup Instructions

1. Clone the repository:
    - HTTPS: `git clone https://github.com/faizanjan/Google-Photos-Clone.git`
    - SSH: `git clone git@github.com:faizanjan/Google-Photos-Clone.git`
2. Navigate to the project directory: `cd google-photos-clone`
3. Install dependencies: `npm install`
4. Configure Firebase:
    - Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com) if you haven't already.
    - Enable Firestore, Firebase Authentication, and Firebase Cloud Storage services for your project.
    - Obtain your Firebase project credentials.
5. Set up environment variables:

    - Create a `.env` file in the root directory of the project.
    - Open the `.env` file in a text editor.
    - Add the following lines to the `.env` file, replacing `<YOUR_FIREBASE_CREDENTIALS>` with your actual Firebase project credentials:

    ```.env
         VITE_FIREBASE_API_KEY = <YOUR_FIREBASE_CREDENTIALS>
         VITE_FIREBASE_AUTH_DOMAIN = <YOUR_FIREBASE_CREDENTIALS>
         VITE_FIREBASE_PROJECT_ID = <YOUR_FIREBASE_CREDENTIALS>
         VITE_FIREBASE_STORAGE_BUCKET = <YOUR_FIREBASE_CREDENTIALS>
         VITE_FIREBASE_MESSAGING_SENDER_ID = <YOUR_FIREBASE_CREDENTIALS>
         VITE_FIREBASE_APP_ID = <YOUR_FIREBASE_CREDENTIALS>
    ```

    - Save the `.env` file.

6. Start the development server: `npm start`
7. Access the application at `http://localhost:5173` in your browser.

## Dependencies

The following are the project's dependencies:

```json
{
  "@mui/material": "^5.13.5",
  "@reduxjs/toolkit": "^1.9.5",
  "bootstrap": "^5.3.0",
  "firebase": "^9.22.2",
  "react": "^18.2.0",
  "react-bootstrap": "^2.7.4",
  "react-dom": "^18.2.0",
  "react-redux": "^8.1.0",
  "react-router-dom": "^6.13.0",
  "redux": "^4.2.1"
}
```

## Contributing

Contributions to the Google Photos Clone are welcome! If you encounter any issues or have suggestions for improvements, please open an issue on the repository. If you'd like to contribute code, fork the repository, make your changes, and submit a pull request for review.

## Acknowledgments

- This project was inspired by the features and design of Google Photos.
- Special thanks to the developers and contributors of the libraries and frameworks used in this project (React, Redux, Bootstrap, Material-UI).
- Thanks to Firebase for providing the Firestore, Authentication, and Cloud Storage services.
