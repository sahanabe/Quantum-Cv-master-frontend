# GitHub Actions Workflows

This directory contains GitHub Actions workflows for the QuantumCV Frontend project.

## Available Workflows

### 1. `ci-cd.yml` - Complete CI/CD Pipeline
A comprehensive workflow that includes:
- **Testing**: Runs tests on multiple Node.js versions
- **Linting**: Code quality checks
- **Security Audit**: Dependency vulnerability scanning
- **Building**: Production build creation
- **Deployment**: GitHub Pages and Vercel deployment
- **Notifications**: Success/failure notifications

### 2. `build-and-deploy.yml` - Simple Build and Deploy
A simplified workflow that:
- **Builds** the React application
- **Deploys** to GitHub Pages (when pushing to main branch)
- **Uploads** build artifacts

## How to Use

### Automatic Triggers
- **Push to main**: Triggers build and deployment
- **Pull Request to main**: Triggers build and testing only

### Manual Setup

1. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Navigate to Pages section
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch
   - Save

2. **Optional: Vercel Deployment**:
   - Create a Vercel account
   - Connect your GitHub repository
   - Add these secrets to your repository:
     - `VERCEL_TOKEN`
     - `VERCEL_ORG_ID`
     - `VERCEL_PROJECT_ID`

3. **View Workflows**:
   - Go to Actions tab in your repository
   - Select the workflow you want to run
   - Click "Run workflow"

## Workflow Features

### Build Process
- Uses Node.js 18
- Installs dependencies with `--legacy-peer-deps`
- Creates production build
- Uploads build artifacts

### Deployment
- **GitHub Pages**: Automatic deployment to `https://username.github.io/repository-name`
- **Vercel**: Optional deployment to Vercel platform

### Security
- Dependency vulnerability scanning
- Audit reports
- Security notifications

## Customization

You can modify the workflows by editing the YAML files:
- Change Node.js versions
- Add/remove deployment targets
- Modify build commands
- Add custom notifications

## Troubleshooting

### Common Issues
1. **Build fails**: Check Node.js version compatibility
2. **Deployment fails**: Verify GitHub Pages settings
3. **Dependencies fail**: Use `--legacy-peer-deps` flag

### Getting Help
- Check the Actions tab for detailed logs
- Review the workflow YAML syntax
- Consult GitHub Actions documentation 