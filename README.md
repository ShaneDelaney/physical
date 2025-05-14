# PhysicalNotes - Handwritten Note to Digital Task Converter

PhysicalNotes is a modern web application that bridges the gap between physical handwritten notes and digital task management. The app allows users to capture photos of their handwritten notes and uses AI to extract content, detect action items, and organize them into digital tasks.

## Key Features

- **AI-Powered OCR & NLP**: Extract text, tasks, dates, and context from handwritten notes using computer vision and natural language processing.

- **Task Extraction**: Automatically identify action items and generate task suggestions with appropriate priorities, due dates, and tags.

- **Visual Note Inbox**: Display digitized notes in a scrollable, searchable interface for quick reference.

- **Task Management**: Organize, prioritize, and track tasks extracted from your notes with due dates, priority levels, and completion status.

- **Smart Cadence System**: Configure intelligent notification timing based on priority, user habits, and quiet hours.

- **Calendar Integration**: Sync tasks with your calendar systems (Google Calendar, Apple Calendar, etc.).

- **Household Mode**: Support for multiple users to share notes and tasks (coming soon).

## Tech Stack

- **Frontend**: Next.js with TypeScript, React, and TailwindCSS
- **UI Components**: Custom components with Headless UI
- **OCR Processing**: Tesseract.js for client-side text extraction
- **State Management**: React Hooks and Context API
- **Styling**: TailwindCSS with a mobile-first approach
- **Icons**: Heroicons

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/physical-notes.git
   cd physical-notes
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Capture Notes**: Use the Capture feature to take a photo of your handwritten notes.
2. **Review Extraction**: The AI will extract text and suggest possible tasks.
3. **Manage Tasks**: Accept task suggestions or create your own tasks manually.
4. **Track Progress**: Mark tasks as complete and maintain your productivity streak.

## Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js app directory
│   │   ├── capture/     # Note capture page
│   │   ├── notes/       # Notes listing page
│   │   ├── tasks/       # Tasks pages
│   │   └── profile/     # User profile page
│   ├── components/      # React components
│   │   ├── notes/       # Note-related components
│   │   ├── tasks/       # Task-related components
│   │   └── ui/          # Shared UI components
│   ├── lib/             # Utility functions
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Helper utilities
└── package.json         # Project dependencies
```

## Future Enhancements

- **Backend Integration**: Add a proper backend with authentication and database storage
- **Machine Learning Improvements**: Enhance OCR accuracy and task extraction
- **Collaborative Features**: Share notes and tasks with other users
- **Calendar Integration**: Sync tasks with external calendar services
- **Mobile App**: Native mobile applications for iOS and Android

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Heroicons](https://heroicons.com/)
- [Tesseract.js](https://tesseract.projectnaptha.com/)
