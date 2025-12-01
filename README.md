# Post Board App (Angular)

This project is a **simple Angular application** for managing posts. It connects to a JSON Server backend to store and retrieve posts data.

## ✨ Features

- **Dashboard**: Overview of all posts
- **CRUD** functionality
- **Pagination**

## 🛠️ Tech Stack

- [Angular](https://angular.io/) – Frontend framework
- [Angular Material](https://material.angular.dev/) – UI components & theming
- JSON Server – Mock backend / REST API
- TypeScript
- HTML / SCSS

## 📂 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/aljazw/ng-post-board.git
cd ng-post-board
```

### 2. Install dependencies

```bash
npm install
```

### 3. Launch Mock Backend

Run the following command to start a JSON Server for your mock database:

```bash
npx json-server --watch db.json --port 3000
```

### 4. Run the development server

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## 🤝 Contributing

This is a mock project, but contributions, suggestions, and improvements are welcome. Feel free to fork, pull, or experiment with it.

## 📄 License

_This project is licensed under the [MIT License](LICENSE)._
