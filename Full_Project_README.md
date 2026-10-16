<!-- How to run the frontend -->
Right-click merged inside rms-scan-frontend on the left.
Select Open in Integrated Terminal.
cd merged
Type this and press Enter: npm.cmd run dev

<!-- How to run the backend -->
Right-click EcoSort.Api in the left sidebar → Open in Integrated Terminal. Leave the frontend terminal running.
Check that the new terminal’s path ends with \backend\EcoSort.Api>.
Run: dotnet run


1. Install these programs

Node.js: version 22.x, at least 22.13.0. npm is included.

.NET 10 SDK: choose Windows x64 SDK.

Python 3.11.9: choose Windows installer (64-bit). Enable Add Python to PATH and the Python launcher.

Microsoft Visual C++ Redistributable x64.

VS Code.

Restart VS Code after installation.

2. Open the project

Extract the project ZIP.

In VS Code, select File > Open Folder.

Open the main project folder.

Check these paths are inside it:

backend/EcoSort.Api

rms-scan-frontend/merged

predict_for_api.py

waste_classification.keras

Keep the Python script and model directly in the main folder. Use a new local venv, not one copied from another laptop.

3. Install Python dependencies — first time only

Open Terminal > New Terminal in the main project folder.

Run each command:

py -3.11 -m venv venv
.\venv\Scripts\python.exe -m pip install --upgrade pip
.\venv\Scripts\python.exe -m pip install "tensorflow==2.15.0" "numpy==1.26.4" Pillow

Wait for installation to finish. These versions are selected for compatibility with the supplied Keras 2.15 model.

4. Start the backend

Open a new terminal in the main project folder:

cd backend\EcoSort.Api
dotnet restore
dotnet run --launch-profile http

Wait for Now listening on: http://localhost:5103.

Keep this terminal running. Backend dependencies and Swagger are installed automatically.

5. Start the frontend

Open another new terminal in the main project folder:

cd rms-scan-frontend\merged
npm.cmd ci
npm.cmd run dev -- --port 5173 --strictPort

Keep this terminal running too. React, Vite, Tailwind, and other frontend packages are installed automatically.

6. Use the app

Open http://localhost:5173/.

Upload a JPG, JPEG, or PNG image comfortably below 10 MB.

Click Submit / Analyze.

To test APIs, open Swagger.

You do not need to retrain the model or start Python separately.

7. Run again next time

Skip installation. Open two terminals, each starting in the main project folder.

Backend:

cd backend\EcoSort.Api
dotnet run --launch-profile http

Frontend:

cd rms-scan-frontend\merged
npm.cmd run dev -- --port 5173 --strictPort

Open http://localhost:5173/.

To stop, press Ctrl + C in both terminals.