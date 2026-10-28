# Help Desk Management System — 24MIS0345

## Agile versions
- **v1:** Create Ticket form; validates fields and saves ticket data in browser local storage.
- **v2:** View Tickets table with sample ticket records.
- **v3:** View tickets and close/resolve tickets.

## Run locally without Docker
Open each `index.html` file in a browser. For proper local server testing, run an HTTP server from the version folder, for example:
```powershell
cd v1
py -m http.server 8081
```
Repeat with a different port for each version.

## Build Docker images
Replace `YOUR_DOCKERHUB_USERNAME` with your DockerHub username:
```powershell
docker build -t YOUR_DOCKERHUB_USERNAME/help-desk-management:v1 .\v1
docker build -t YOUR_DOCKERHUB_USERNAME/help-desk-management:v2 .\v2
docker build -t YOUR_DOCKERHUB_USERNAME/help-desk-management:v3 .\v3
```
Push after `docker login`:
```powershell
docker push YOUR_DOCKERHUB_USERNAME/help-desk-management:v1
docker push YOUR_DOCKERHUB_USERNAME/help-desk-management:v2
docker push YOUR_DOCKERHUB_USERNAME/help-desk-management:v3
```

## Kubernetes
1. Replace `YOUR_DOCKERHUB_USERNAME` in each YAML manifest.
2. Apply each manifest:
```powershell
kubectl apply -f .\kubernetes\help-desk-v1.yaml
kubectl apply -f .\kubernetes\help-desk-v2.yaml
kubectl apply -f .\kubernetes\help-desk-v3.yaml
kubectl get deployments,services,pods
```
3. If your local Kubernetes NodePort is reachable, open:
- http://localhost:30084 — v1
- http://localhost:30085 — v2
- http://localhost:30086 — v3

## Git versioning
Use a separate branch per version:
```powershell
git init
git add .
git commit -m "Create Help Desk project scaffold"
git branch v1
git switch -c v2
git add .
git commit -m "Add view tickets feature"
git switch -c v3
git add .
git commit -m "Add close ticket feature"
```
For a clean Agile history, commit the v1 files first, then add v2 and v3 features in separate commits before pushing branches.

## Notes
- The three versions use browser local storage independently; data is not shared between versions.
- The included Jenkinsfile assumes a Jenkins agent with Docker CLI available and a Jenkins username/password credential ID `dockerhub-credentials`. If Jenkins runs on Windows, use a Windows agent with PowerShell enabled.
- This is a static demo for the case study, not a production ticketing system or shared multi-user backend.
