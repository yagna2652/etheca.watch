#!/bin/bash

# Generate project files for LLM context using files-to-prompt
# This script creates a markdown file with all source code files, excluding build artifacts and dependencies

echo "🚀 Generating project files for LLM context..."

# Check if virtual environment exists, create if not
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install files-to-prompt if not already installed
echo "📥 Installing files-to-prompt..."
pip install files-to-prompt > /dev/null 2>&1

# Generate the project files
echo "📝 Generating project_files.md..."
files-to-prompt . \
    --ignore "node_modules" \
    --ignore "out" \
    --ignore "*.log" \
    --ignore "*.lock" \
    --ignore "tsconfig.tsbuildinfo" \
    --ignore "venv" \
    --ignore ".next" \
    --ignore ".git" \
    --ignore "*.png" \
    --ignore "*.jpg" \
    --ignore "*.jpeg" \
    --ignore "*.gif" \
    --ignore "*.svg" \
    --ignore "*.ico" \
    --ignore "*.otf" \
    --ignore "*.ttf" \
    --ignore "*.woff" \
    --ignore "*.woff2" \
    --ignore "*.eot" \
    --ignore "*.pdf" \
    --ignore "*.zip" \
    --ignore "*.tar.gz" \
    --ignore "*.rar" \
    --ignore "*.mp4" \
    --ignore "*.mp3" \
    --ignore "*.wav" \
    --ignore "*.avi" \
    --ignore "*.mov" \
    --ignore "*.webm" \
    --ignore "*.webp" \
    --ignore "*.ico" \
    --ignore "*.bin" \
    --ignore "*.exe" \
    --ignore "*.dmg" \
    --ignore "*.pkg" \
    --ignore "*.deb" \
    --ignore "*.rpm" \
    --ignore "*.msi" \
    --ignore "*.app" \
    --ignore "*.dll" \
    --ignore "*.so" \
    --ignore "*.dylib" \
    --ignore "*.a" \
    --ignore "*.o" \
    --ignore "*.class" \
    --ignore "*.pyc" \
    --ignore "*.pyo" \
    --ignore "*.pyd" \
    --ignore "*.so" \
    --ignore "*.dylib" \
    --ignore "*.dll" \
    --ignore "*.exe" \
    --ignore "*.bin" \
    --ignore "*.dat" \
    --ignore "*.db" \
    --ignore "*.sqlite" \
    --ignore "*.sqlite3" \
    --ignore "*.mdb" \
    --ignore "*.accdb" \
    --ignore "*.xls" \
    --ignore "*.xlsx" \
    --ignore "*.csv" \
    --ignore "*.tsv" \
    --ignore "*.json" \
    --ignore "*.xml" \
    --ignore "*.yaml" \
    --ignore "*.yml" \
    --ignore "*.toml" \
    --ignore "*.ini" \
    --ignore "*.cfg" \
    --ignore "*.conf" \
    --ignore "*.config" \
    --ignore "*.env" \
    --ignore "*.env.local" \
    --ignore "*.env.development" \
    --ignore "*.env.production" \
    --ignore "*.env.test" \
    --ignore "*.env.staging" \
    --ignore "*.env.example" \
    --ignore "*.env.sample" \
    --ignore "*.env.template" \
    --ignore "*.env.backup" \
    --ignore "*.env.old" \
    --ignore "*.env.bak" \
    --ignore "*.env.save" \
    --ignore "*.env.orig" \
    --ignore "*.env.tmp" \
    --ignore "*.env.temp" \
    --ignore "*.env.swp" \
    --ignore "*.env.swo" \
    --ignore "*.env~" \
    --ignore "*.env.bak" \
    --ignore "*.env.old" \
    --ignore "*.env.save" \
    --ignore "*.env.orig" \
    --ignore "*.env.tmp" \
    --ignore "*.env.temp" \
    --ignore "*.env.swp" \
    --ignore "*.env.swo" \
    --ignore "*.env~" \
    --ignore-gitignore \
    --markdown \
    -o project_files.md

# Check if the file was created successfully
if [ -f "project_files.md" ]; then
    file_size=$(ls -lh project_files.md | awk '{print $5}')
    echo "✅ Successfully generated project_files.md (${file_size})"
    echo "📁 File location: $(pwd)/project_files.md"
else
    echo "❌ Failed to generate project_files.md"
    exit 1
fi

echo "🎉 Done! You can now use project_files.md with your LLM tools."
