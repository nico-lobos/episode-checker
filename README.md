# 🎬 Episode Checker

_Episode Checker_ is a web application that allows you to select two **Rick and Morty** characters and see:

- ✅ Episodes where only character #1 appears
- ✅ Episodes where only character #2 appears
- ✅ Episodes they both share

Ideal for fans who want to explore character connections and revisit shared episodes.

---

## 🧪 Technologies Used

| Tool                | Description                                       |
|---------------------|---------------------------------------------------|
| **Next.js**         | React framework with routing and SSR              |
| **TypeScript**      | Statically typed language for safer development   |
| **Node.js v20**     | JavaScript runtime environment                    |
| **Jest**            | Unit testing framework                            |
| **Testing Library** | UI-focused testing utilities                      |
| **MSW**             | API mocking for reliable tests                    |
| **Vercel**          | Hosting and CI/CD platform                        |
| **GitHub Actions**  | CI for automated testing and deployment           |

---

## 🚀 Available Scripts

```bash
# Start development server
npm run dev

# Run all tests
npm test
```

## 🌐 Links

🔗 Production: https://episode-checker.vercel.app/

💻 Local: http://localhost:3000

---

## 📁 Folder Structure
```bash
app/
├── components/          # UI components
│   ├── Character/       # Character-related components
│   ├── Episode/         # Episode-related components
│   └── shared/          # Shared UI components (Spinner)
├── constants/           # Global constants (pagination, endpoints)
├── hooks/               # Custom React hooks (useCharacters, useEpisodes)
├── mock/                # Mock data and MSW server config
├── types/               # Centralized TypeScript types
├── utils/               # Utility and helper functions
├── layout.tsx           # Main layout component
├── page.tsx             # Main page entry
```
---

## 📊 Test Coverage
```bash

The project includes test coverage reports powered by **Jest** and **Testing Library**.

### 🔍 Run coverage locally

To generate a full coverage report:

npm test --coverage
