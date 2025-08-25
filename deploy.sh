#!/bin/bash

echo "🚀 SupplySight Dashboard Deployment Script"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if required tools are installed
check_requirements() {
    print_status "Checking requirements..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed"
        exit 1
    fi
    
    if ! command -v git &> /dev/null; then
        print_error "git is not installed"
        exit 1
    fi
    
    print_status "All requirements met!"
}

# Build the frontend
build_frontend() {
    print_status "Building frontend..."
    
    if npm run build; then
        print_status "Frontend built successfully!"
    else
        print_error "Frontend build failed"
        exit 1
    fi
}

# Deploy to Vercel
deploy_frontend() {
    print_status "Deploying frontend to Vercel..."
    
    if command -v vercel &> /dev/null; then
        if vercel --prod; then
            print_status "Frontend deployed to Vercel!"
        else
            print_error "Vercel deployment failed"
            exit 1
        fi
    else
        print_warning "Vercel CLI not found. Please install with: npm i -g vercel"
        print_warning "Or deploy manually at: https://vercel.com"
    fi
}

# Prepare backend for deployment
prepare_backend() {
    print_status "Preparing backend for deployment..."
    
    # Create backend directory if it doesn't exist
    if [ ! -d "backend" ]; then
        mkdir backend
    fi
    
    # Copy backend files
    cp server.prod.js backend/
    cp backend/package.json backend/
    
    print_status "Backend files prepared!"
    print_warning "Backend needs to be deployed separately to Railway/Render"
    print_warning "See DEPLOYMENT.md for detailed instructions"
}

# Main deployment flow
main() {
    echo ""
    print_status "Starting deployment process..."
    
    check_requirements
    build_frontend
    deploy_frontend
    prepare_backend
    
    echo ""
    print_status "Deployment completed!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Deploy backend to Railway/Render (see DEPLOYMENT.md)"
    echo "2. Update VITE_GRAPHQL_URL in Vercel environment variables"
    echo "3. Test your deployed application"
    echo ""
    echo "📚 Documentation: DEPLOYMENT.md"
    echo "🌐 Vercel Dashboard: https://vercel.com/dashboard"
    echo ""
}

# Run main function
main


