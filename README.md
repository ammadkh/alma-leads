# Alma Immigration Lead Management System

A Next.js application for managing immigration case assessment leads. The system includes a public form for prospects to submit their information and an admin interface for managing leads.

## Features

- Public lead submission form with validation
- Secure admin interface for lead management
- Lead status tracking (Pending/Reached Out)
- File upload support for resumes/CVs
- Modern, responsive UI with Tailwind CSS

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- NextAuth.js for authentication
- React Hook Form with Zod validation
- Tailwind CSS for styling

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd alma-leads
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:

```env
NEXTAUTH_SECRET=your-secret-key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
NEXTAUTH_URL=http://localhost:3000
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin interface routes
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Utility functions and validations
└── types/                # TypeScript type definitions
```

## Authentication

The admin interface is protected by username/password authentication. Default credentials:

- Username: admin
- Password: (set in .env.local)

## API Routes

- `POST /api/leads` - Submit a new lead
- `GET /api/leads` - List all leads (admin only)
- `PATCH /api/leads/[id]` - Update lead status (admin only)

## Future Improvements

1. Database Integration

   - Replace in-memory storage with a proper database
   - Add data persistence

2. File Storage

   - Implement cloud storage for resume/CV files
   - Add file type validation and virus scanning

3. Email Notifications

   - Send confirmation emails to prospects
   - Notify admins of new submissions

4. Enhanced Security

   - Implement rate limiting
   - Add CSRF protection
   - Enhanced password security

5. Analytics
   - Track conversion rates
   - Monitor form submission patterns

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
