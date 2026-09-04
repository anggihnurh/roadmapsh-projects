# 🔍 GitHub Random Repository

This is a dynamic web-based application that fetches and displays random GitHub repositories based on a selected programming language using the GitHub Repository Search API.

This project is built based on the project ideas from [roadmap.sh/projects/github-random-repo](https://roadmap.sh/projects/github-random-repo).

## 🎯 Requirements

- **Language Selection**: Users can select a programming language from a dropdown menu.
- **Random Repository Fetching**: Fetches a random repository matching the selected language using the GitHub Search API.
- **Repository Details**: Displays key information including repository name, description, primary language, star count, fork count, and open issues count.
- **UI State Handling**: Effectively manages and displays:
  - **Empty State**: Initial view prompting the user to select a language.
  - **Loading State**: Visual loading indicator / skeleton while fetching data.
  - **Success State**: Displaying repository information with a "Refresh" / "Find Another" button to fetch another repository.
  - **Error State**: Informative error message with a retry option if fetching fails or rate limit is reached.
- **Refresh Action**: After a repository is displayed, users can click a button to fetch another random repository for the current language.

## ✨ Stretch Goals

- **Searchable Language Filter**: Search and filter through the list of available programming languages.
- **Rate Limit Indicator**: Display remaining GitHub API rate limit quota.
- **Direct Navigation & Share**: Quick button to open repository on GitHub and copy/share repository link.
- **Theme Toggle**: Support for light and dark modes with sleek animations.

## 🚀 Technologies Used

- **React 19**
- **Vite 8**
- **Tailwind CSS v4**
- **TypeScript**
- **TanStack Query (React Query)**
- **Axios**
- **shadcn/ui (Base UI)**
- **Lucide Icons**

## 💻 Getting Started

1. Install dependencies:
   ```bash
   bun install
   ```

2. Start the development server:
   ```bash
   bun run dev
   ```

3. Build the project:
   ```bash
   bun run build
   ```

---
- [Project branch (`github-random-repo`)](https://github.com/anggihnurh/roadmapsh-projects/tree/github-random-repo)
- [Back to main branch (`main`)](https://github.com/anggihnurh/roadmapsh-projects/tree/main)
