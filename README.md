# Operational-Test
Operational Test Yahshua

## Backend Setup

To set up the backend locally, please follow these steps:

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv .venv
   ```

3. **Activate the virtual environment:**
   - **Windows (Command Prompt):** `\.venv\Scripts\activate`
   - **Windows (PowerShell):** `.\.venv\Scripts\Activate.ps1`
   - **macOS/Linux:** `source .venv/bin/activate`

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Install dependencies:**
   ```bash
   python manage.py migrate
   ```

6. **Run the development server:**
   ```bash
   python manage.py runserver
   ```
   use the port 8000

## Frontend Setup

To set up the frontend locally, please follow these steps:

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

## Available APIs

The backend is built with Django and provides the following REST API endpoints:

### Tasks API

All task endpoints are prefixed with `/api/`.

| HTTP Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/tasks/` | List all tasks |
| `POST` | `/api/tasks/` | Create a new task |
| `GET` | `/api/tasks/<id>/` | Retrieve a specific task by its numeric ID |
| `PATCH` | `/api/tasks/<id>/` | Update a specific task |
| `DELETE` | `/api/tasks/<id>/` | Delete a specific task |
