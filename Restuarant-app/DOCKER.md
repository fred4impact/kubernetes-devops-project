# Docker Setup Guide

This guide explains how to run the Restaurant Discovery App using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose (optional, but recommended)

## Quick Start

### Production Build

1. **Build the Docker image:**
   ```bash
   docker build -t restaurant-app .
   ```

2. **Run the container:**
   ```bash
   docker run -p 3000:80 --env-file .env restaurant-app
   ```

   Or without .env file:
   ```bash
   docker run -p 3000:80 -e VITE_API_URL=https://690dc4e6bd0fefc30a0241c0.mockapi.io/api/v1 restaurant-app
   ```

3. **Access the app:**
   Open your browser and go to `http://localhost:3000`

### Using Docker Compose (Recommended)

1. **Create a `.env` file** (if not exists):
   ```env
   VITE_API_URL=https://690dc4e6bd0fefc30a0241c0.mockapi.io/api/v1
   ```

2. **Start the application:**
   ```bash
   docker-compose up -d
   ```

3. **View logs:**
   ```bash
   docker-compose logs -f
   ```

4. **Stop the application:**
   ```bash
   docker-compose down
   ```

5. **Rebuild and restart:**
   ```bash
   docker-compose up -d --build
   ```

## Development Mode

For development with hot-reload:

1. **Build and run:**
   ```bash
   docker build -f Dockerfile.dev -t restaurant-app-dev .
   docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules --env-file .env restaurant-app-dev
   ```

   Or with Docker Compose:
   ```bash
   docker-compose -f docker-compose.dev.yml up
   ```

## Environment Variables

The app uses the following environment variables:

- `VITE_API_URL` - API endpoint URL (default: MockAPI.io URL)

**Note:** Environment variables starting with `VITE_` are embedded at build time. To change them, you need to rebuild the Docker image.

## Docker Commands

### Build
```bash
docker build -t restaurant-app .
```

### Run
```bash
docker run -p 3000:80 restaurant-app
```

### Run with environment variables
```bash
docker run -p 3000:80 -e VITE_API_URL=your-api-url restaurant-app
```

### Run in detached mode
```bash
docker run -d -p 3000:80 --name restaurant-app restaurant-app
```

### View logs
```bash
docker logs restaurant-app
```

### Stop container
```bash
docker stop restaurant-app
```

### Remove container
```bash
docker rm restaurant-app
```

### Remove image
```bash
docker rmi restaurant-app
```

## Production Deployment

### Build for Production

1. **Build the image:**
   ```bash
   docker build -t restaurant-app:latest .
   ```

2. **Tag for registry (optional):**
   ```bash
   docker tag restaurant-app:latest your-registry/restaurant-app:latest
   ```

3. **Push to registry (optional):**
   ```bash
   docker push your-registry/restaurant-app:latest
   ```

### Deploy to Cloud

The Docker image can be deployed to:
- AWS ECS/Fargate
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform
- Heroku
- Any Docker-compatible platform

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, change the port mapping:
```bash
docker run -p 8080:80 restaurant-app
```

Then access at `http://localhost:8080`

### Environment Variables Not Working

Remember that Vite environment variables are embedded at **build time**. To change them:
1. Update `.env` file
2. Rebuild the Docker image
3. Restart the container

### Container Won't Start

Check logs:
```bash
docker logs restaurant-app
```

### Build Fails

1. Clear Docker cache:
   ```bash
   docker builder prune
   ```

2. Rebuild without cache:
   ```bash
   docker build --no-cache -t restaurant-app .
   ```

## File Structure

```
.
├── Dockerfile          # Production build
├── Dockerfile.dev      # Development build
├── docker-compose.yml  # Production compose
├── nginx.conf          # Nginx configuration
└── .dockerignore       # Files to exclude from build
```

## Notes

- The production build uses nginx to serve static files
- The development build uses Vite dev server with hot-reload
- Environment variables are embedded at build time for Vite
- The app is served on port 80 inside the container
- External port mapping can be customized (e.g., 3000:80)

